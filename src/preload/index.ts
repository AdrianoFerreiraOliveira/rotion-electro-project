import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI, ElectronAPI } from '@electron-toolkit/preload'
import { IPC } from '@shared/constants/ipc'
import { CreateDocumentsResponse, DeleteDocumentsRequest, FetchAllDocumentsResponse, FetchDocumentsRequest, FetchDocumentsResponse, SaveDocumentsRequest } from '@shared/types/ipc'

declare global{
  export interface Window{
    electron: ElectronAPI
    api: typeof api
  }
}

const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse>{
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL,)
  },

  fetchDocument(req:FetchDocumentsResponse): Promise<FetchDocumentsResponse>{
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req)
  },

  createDocument(): Promise<CreateDocumentsResponse>{
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  },

  saveDocument(req:SaveDocumentsRequest): Promise<void>{
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req)
  },

  deleteDocument(req:DeleteDocumentsRequest): Promise<void>{
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req)
  },

}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
