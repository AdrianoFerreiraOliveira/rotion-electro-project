import {ipcMain} from 'electron'
import {randomUUID} from 'node:crypto'
import { IPC } from '@shared/constants/ipc'
import { CreateDocumentsResponse, DeleteDocumentsRequest, Document, FetchAllDocumentsResponse, FetchDocumentsRequest, FetchDocumentsResponse, SaveDocumentsRequest } from '@shared/types/ipc'
import { store } from './store'

ipcMain.handle
(IPC.DOCUMENTS.FETCH_ALL, 
  async ():Promise<FetchAllDocumentsResponse> =>{
       return {
         data:Object.values(store.get('documents')),  
       
      }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.FETCH, 
  async (_,{id}: FetchDocumentsRequest): Promise<FetchDocumentsResponse> =>{
    const document = store.get(`documents.${id}`) as Document

  return {
    data: document, 
  
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.CREATE, 
  async ():Promise<CreateDocumentsResponse> =>{
    const id = randomUUID()
    const document: Document = {
      id,
      title: "Untitled",      
    }

    store.set(`documents.${id}`,document)
  return {
    data: document, 
  
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.SAVE, 
  async (_,{id, title, content}: SaveDocumentsRequest): Promise<void> =>{
    store.set(`documents.${id}`,{
      id,
      title,
      content,
    })

  },
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE, 
  async (_,{id}: DeleteDocumentsRequest): Promise<void> =>{
    // @ts-ignore (https://gitub.com/sindrresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`)
  },
)