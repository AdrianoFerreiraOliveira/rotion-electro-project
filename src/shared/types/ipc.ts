export interface Document {
    id: string
    title: string
    content?: string
}

/**
 * Requests
 */
export type SaveDocumentsRequest = Document
   


export interface FetchDocumentsRequest{
    id: string
}

export interface DeleteDocumentsRequest{
    id: string
}




/**
 * Response
 */

export interface FetchAllDocumentsResponse{
    data: Document[]
}

export interface FetchDocumentsResponse {
    data: Document
    
}

export interface CreateDocumentsResponse {
    data: Document
}