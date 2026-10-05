import { useState } from 'react'

function App(): React.JSX.Element {
  const [cavab, setCavab] = useState<string>('')

  const yoxla = async (): Promise<void> => {
    setCavab(await window.api.ping())
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-slate-950 text-slate-100">
      <h1 className="text-3xl font-semibold tracking-tight">Hey 👋</h1>
      <p className="text-slate-400">Electron + React + TypeScript + Tailwind</p>

      <button
        onClick={yoxla}
        className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-white transition hover:bg-sky-400 active:scale-95"
      >
        Main prosesi yoxla
      </button>

      {cavab && <code className="text-sm text-emerald-400">{cavab}</code>}
    </div>
  )
}

export default App
