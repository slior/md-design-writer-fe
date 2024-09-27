import axios from 'axios';
import { Document } from '../model/Document';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

// // Define the Document interface
// interface Document {
//   id: string;
//   title: string;
//   // Add other properties as needed
// }

// Function to fetch all documents
export const fetchDocuments = async (): Promise<Document[]> => {
  try {
    const response = await axios.get<Document[]>(`${API_BASE_URL}/documents`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

// Function to fetch a single document by ID
export const fetchDocument = async (id: string): Promise<Document> => {
  try {
    const response = await axios.get<Document>(`${API_BASE_URL}/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching document with id ${id}:`, error);
    throw error;
  }
};

// Function to create a new document
export const createDocument = async (document: Omit<Document, 'id'>): Promise<Document> => {
  try {
    const response = await axios.post<Document>(`${API_BASE_URL}/documents`, document);
    return response.data;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

// Function to update an existing document
export const updateDocument = async (id: string, document: Partial<Document>): Promise<Document> => {
  try {
    const response = await axios.put<Document>(`${API_BASE_URL}/documents/${id}`, document);
    return response.data;
  } catch (error) {
    console.error(`Error updating document with id ${id}:`, error);
    throw error;
  }
};