#!/usr/bin/env node
/*
 * Temporary browser smoke test (not part of npm run verify).
 *
 * Launches headless Chrome with --remote-debugging-port, connects over the raw
 * CDP WebSocket (Node 22 has a built-in WebSocket client), navigates a list of
 * routes on the local dev server and reports:
 *   - console errors / uncaught exceptions
 *   - failed network requests
 *   - blank-page check
 *   - per-route assertions (sidebar present, h1 heading matches)
 *
 * Usage: node scripts/browser-check.mjs [base-url]
 */

import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import http from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const BASE = process.argv[2] ?? 'http://localhost:5199'

const CHROME_PATHS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  process.env.LOCALAPPDATA
    ? process.env.LOCALAPPDATA.replace(/\\/g, '/') + '/Google/Chrome/Application/chrome.exe'
    : null,
].filter(Boolean)

function findChrome() {
  for (const path of CHROME_PATHS) {
    if (existsSync(path)) return path
  }
  return null
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (err) {
            reject(err)
          }
        })
      })
      .on('error', reject)
  })
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitUntil(fn, timeoutMs, label) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const result = await fn()
      if (result) return result
    } catch {}
    await sleep(200)
  }
  throw new Error('timeout waiting for ' + label)
}

// Minimal CDP client over the browser-level WebSocket.
class CdpBrowser {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl)
    this.nextId = 1
    this.pending = new Map()
    this.events = []
    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        if (msg.error) reject(new Error('CDP ' + (msg.method ?? '') + ' → ' + msg.error.message + (msg.error.data ? ' :: ' + msg.error.data : '')))
        else resolve(msg.result)
      } else if (msg.method) {
        this.events.push(msg)
      }
    })
  }

  static async connect(wsUrl) {
    const browser = new CdpBrowser(wsUrl)
    await waitUntil(() => browser.ws.readyState === 1, 10000, 'websocket open')
    return browser
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++
    const payload = { id, method, params }
    if (sessionId) payload.sessionId = sessionId
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify(payload))
    })
  }
}

// Route list: [path, expected h1 text]
const ROUTES = [
  ['/', 'Components'],
  ['/colors', 'Colors'],
  ['/typography', 'Typography'],
  ['/components/dialog', 'Dialog'],
  ['/components/button', 'Button'],
  ['/components/box', 'Box'],
  ['/components/metric-card', 'Metric Card'],
  ['/components/table', 'Table'],
  ['/components/dropdown-menu', 'Dropdown Menu'],
  ['/components/code-block', 'Code Block'],
  ['/components/does-not-exist', 'Components'], // unknown → redirects to overview
]

const SNAPSHOT_EXPR = `(() => {
  const h1 = document.querySelector('main h1')
  const root = document.getElementById('root')
  const nav = document.querySelector('aside nav')
  return JSON.stringify({
    readyState: document.readyState,
    h1: h1 ? h1.textContent.trim() : null,
    bodyChars: root ? root.textContent.trim().length : 0,
    hasNav: !!nav,
    navLinks: nav ? nav.querySelectorAll('a').length : 0,
    overlay: !!document.querySelector('vite-error-overlay'),
    snippet: root ? root.textContent.trim().slice(0, 200) : '',
  })
})()`

async function main() {
  const chrome = findChrome()
  if (!chrome) {
    console.error('Chrome executable not found')
    process.exit(1)
  }

  const userDir = mkdtempSync(join(tmpdir(), 'coco-cdp-'))
  const proc = spawn(
    chrome,
    [
      '--headless=new',
      '--remote-debugging-port=9223',
      '--user-data-dir=' + userDir,
      '--no-first-run',
      '--no-default-browser-check',
      'about:blank',
    ],
    { stdio: 'ignore' }
  )

  let failures = 0

  try {
    const targets = await waitUntil(
      () => getJson('http://127.0.0.1:9223/json/list'),
      15000,
      'debugger endpoint'
    )
    const page = targets.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
    if (!page) throw new Error('no page target')

    const browser = await CdpBrowser.connect(page.webSocketDebuggerUrl)

    const consoleErrors = []
    const consoleMessages = []
    const failedRequests = []

    // Page-level socket: events arrive WITHOUT a sessionId, so no session filter
    // here — filtering by sessionId silently dropped every console error.
    const drainEvents = () => {
      const events = browser.events
      browser.events = []
      for (const msg of events) {
        if (msg.method === 'Runtime.consoleAPICalled') {
          const text = msg.params.args
            .map((a) => a.value ?? a.description ?? '')
            .join(' ')
          consoleMessages.push('[' + msg.params.type + '] ' + text)
          if (msg.params.type === 'error') consoleErrors.push(text)
        } else if (msg.method === 'Runtime.exceptionThrown') {
          const d = msg.params.exceptionDetails
          consoleErrors.push(d.exception?.description ?? d.text)
        } else if (msg.method === 'Network.loadingFailed') {
          failedRequests.push(msg.params.errorText + ' ' + (msg.params.blockedReason ?? ''))
        }
      }
    }

    // Cross-process hop (about:blank → app origin) recreates the execution context,
    // so do a throwaway navigation FIRST, then enable the domains we listen to.
    await browser.send('Page.navigate', { url: BASE + '/' })
    await sleep(2000)
    await browser.send('Runtime.enable')
    await browser.send('Network.enable')
    await browser.send('Page.enable')

    for (const [route, expectedH1] of ROUTES) {
      consoleErrors.length = 0
      consoleMessages.length = 0
      failedRequests.length = 0

      await browser.send('Page.navigate', { url: BASE + route })

      // Poll until the route renders (or time out) — a fixed sleep turned every
      // slow transform into a false "blank page".
      const started = Date.now()
      let state
      for (;;) {
        await sleep(400)
        drainEvents()
        const evalResult = await browser.send('Runtime.evaluate', {
          expression: SNAPSHOT_EXPR,
          returnByValue: true,
        })
        state = JSON.parse(evalResult.result.value)
        if (state.h1 || Date.now() - started > 10000) break
      }
      const problems = []
      if (state.h1 !== expectedH1) problems.push('h1 expected "' + expectedH1 + '", got "' + state.h1 + '", readyState=' + state.readyState + (state.overlay ? ', vite-error-overlay' : ''))
      if (state.h1 === null && state.snippet) problems.push('dom snippet: ' + state.snippet)
      if (state.h1 === null && consoleMessages.length) problems.push('console: ' + consoleMessages.slice(0, 5).join(' | '))
      if (state.bodyChars < 100) problems.push('page looks blank (' + state.bodyChars + ' chars)')
      if (!state.hasNav) problems.push('sidebar nav missing')
      if (consoleErrors.length) problems.push('console errors: ' + consoleErrors.slice(0, 3).join(' | '))
      if (failedRequests.length) problems.push('failed requests: ' + failedRequests.slice(0, 3).join(' | '))

      if (problems.length) {
        failures++
        console.log('FAIL ' + route)
        for (const p of problems) console.log('     - ' + p)
      } else {
        console.log('PASS ' + route + '  (h1="' + state.h1 + '", nav links=' + state.navLinks + ')')
      }
    }

  } finally {
    proc.kill()
    try {
      rmSync(userDir, { recursive: true, force: true })
    } catch {}
  }

  console.log(failures === 0 ? '\nAll routes passed.' : '\n' + failures + ' route(s) failed.')
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
