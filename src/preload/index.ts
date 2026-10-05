import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Renderer-ə açılan yeganə səth. Nə əlavə etsən, burada açıq şəkildə yazılmalıdır.
const api = {
  ping: (): Promise<string> => ipcRenderer.invoke('ping')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (contextIsolation söndürülübsə)
  window.electron = electronAPI
  // @ts-ignore
  window.api = api
}

export type Api = typeof api
