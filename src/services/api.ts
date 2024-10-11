import axios from 'axios';
import { Document } from '../model/Document';
import { extractTitleFromContent } from './utils';

const dbg = (s : string) => {
  console.log(s || '')
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
dbg(`Base URL is: ${API_BASE_URL}`)


export const fetchDocuments = async (): Promise<Document[]> => {
  try {
    const response = await axios.get<Document[]>(`${API_BASE_URL}/documents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const fetchDocument = async (id: string): Promise<Document> => {
  try {
    const response = await axios.get<Document>(`${API_BASE_URL}/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching document with id ${id}:`, error);
    throw error;
  }
};

export const createDocument = async (document: Omit<Document, 'id'>): Promise<Document> =>
{
  try
  {
    document.title = extractTitleFromContent(document)
    const response = await axios.post<Document>(`${API_BASE_URL}/documents`, document);
    return response.data;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const updateDocument = async (id: string, document: Partial<Document>): Promise<Document> =>
{
  try
  {
    document.title = extractTitleFromContent(document)
    const response = await axios.put<Document>(`${API_BASE_URL}/documents/${id}`, document);
    return response.data;
  }
  catch (error)
  {
    console.error(`Error updating document with id ${id}:`, error);
    throw error;
  }
};

