import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDocument, fetchDocumentUnauthorized } from '../services/DocumentAPI'
import { Document} from '../model/Document'
import Viewer  from '../components/Viewer/Viewer'

function dbg(s : string) 
{
  console.log(s || '');
}

const ViewPage = () => {
    const { id } = useParams<{ id: string }>(); // Get the document ID from the URL
    const [document, setDocument] = useState<Document | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] =  useState<string | null>(null);
  
    useEffect(() => {
      const loadDocument = async () => 
      {
        try
        {
            if (!id) return;

            setLoading(true);
            const fetchedDocument = await fetchDocumentUnauthorized(id);
            dbg(`fetched doc: ${JSON.stringify(fetchDocument)}`)
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
        <Viewer content={document.content} />
      </div>
    );
  };
  
  export default ViewPage;