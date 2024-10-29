
import { Document } from '../model/Document';
import { extractTitleFromContent } from './utils';
import { HttpClient } from './AuthenticatingHttpClient';
import { AuthService } from './authService';


const dbg = (s : string) => {
  console.log(s || '')
}

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
dbg(`Base URL is: ${API_BASE_URL}`)


export const fetchDocuments = async (): Promise<Document[]> => {
  try {

    const response : Document[] = await HttpClient.get<Document[]>(`/documents`);
    return response;

    
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const fetchDocument = async (id: string): Promise<Document> => {
  try
  {
    dbg(`Going to fetch document with id ${id}`)
    return HttpClient.get<Document>(`/documents/${id}`)
  }
  catch (error)
  {
    console.error(`Error fetching document with id ${id}:`, error);
    throw error;
  }
};

export const createDocument = async (document: Omit<Document, 'id'>): Promise<Document> =>
{
  try
  {
    document.title = extractTitleFromContent(document)
    return HttpClient.post<Document>(`/documents`,setAuthorIDTo(document))
  }
  catch (error)
  {
    console.error('Error creating document:', error);
    throw error;
  }
};



export const updateDocument = async (id: string, document: Partial<Document>): Promise<Document> =>
{
  try
  {
    document.title = extractTitleFromContent(document)
    return HttpClient.put<Document>(`/documents/${id}`,setAuthorIDTo(document))
  }
  catch (error)
  {
    console.error(`Error updating document with id ${id}:`, error);
    throw error;
  }
};

function setAuthorIDTo(doc : Partial<Document>)
{
  if (doc)
  {
    const loggedInUserEmail = AuthService.getUser()
    if (loggedInUserEmail)
      doc.author = loggedInUserEmail
    else
      throw new Error ("No logged in user")
    
    return doc;
  }
  else throw new Error("Invalid document") 
}