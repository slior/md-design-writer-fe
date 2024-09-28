import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDocument } from '../services/api'
import { Document} from '../model/Document'
import Viewer  from '../components/Viewer/Viewer'


const ViewPage = () => {
    const { id } = useParams<{ id: string }>(); // Get the document ID from the URL
    const [document, setDocument] = useState<Document | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] =  useState<string | null>(null);
  
    useEffect(() => {
      const loadDocument = async () => {
        try
        {
            if (!id) return;

            setLoading(true);
            const fetchedDocument = await fetchDocument(id);
            setDocument(fetchedDocument);
            setLoading(false);
        }
        catch (err)
        {
          setError('Failed to load document. Please try again.');
          setLoading(false);
        }
      };
  
      loadDocument();
    }, [id]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div className="error">{error}</div>;
    }
  
    if (!document) {
      return <div>Document not found.</div>;
    }
  
    return (
      <div className="view-page">
        <h1>{document.title}</h1>
        <Viewer content={document.content} />
      </div>
    );
  };
  
  export default ViewPage;