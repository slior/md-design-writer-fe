import React, { useState, useEffect } from 'react';
import { fetchDocuments } from '../../services/DocumentAPI';
import './DocumentList.css';
import { Document } from '../../model/Document';


interface DocumentListProps {
  onSelectDocument: (id: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ onSelectDocument }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setIsLoading(true);
        const fetchedDocuments = await fetchDocuments();
        setDocuments(fetchedDocuments);
        setError(null);
      } catch (err) {
        setError('Failed to load documents. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  if (isLoading) {
    return <div className="document-list-loading">Loading documents...</div>;
  }

  if (error) {
    return <div className="document-list-error">{error}</div>;
  }

  return (
    <div className="document-list-container">
      <h2>Your Documents</h2>
      {documents.length === 0 ? (
        <p>No documents found. Create a new one!</p>
      ) : (
        <ul className="document-list">
          {documents.map((doc) => (
            <li key={doc.id} className="document-list-item">
              <button onClick={() => onSelectDocument(doc.id)}>{doc.title}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;