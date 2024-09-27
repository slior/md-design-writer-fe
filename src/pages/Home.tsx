import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor/Editor';
import Viewer from '../components/Viewer/Viewer';
import DocumentList from '../components/DocumentList/DocumentList';
import SaveButton from '../components/SaveButton/SaveButton';
import { fetchDocument, updateDocument, createDocument } from '../services/api';
import { Document } from '../model/Document';
import './Home.css';

// interface Document {
//   id: string;
//   title: string;
//   content: string;
// }
const DEFAULT_AUTHOR = 'Anonymous';


const Home: React.FC = () => {
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectDocument = async (id: string) => {
    try {
      setIsLoading(true);
      const document = await fetchDocument(id);
      setCurrentDocument(document);
      setError(null);
    } catch (err) {
      setError('Failed to load the document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (newContent: string | undefined) => {
    if (currentDocument && newContent !== undefined) {
      setCurrentDocument({ ...currentDocument, content: newContent });
    }
  };

  const handleSave = async () => {
    if (!currentDocument) return;

    try {
      setIsSaving(true);
      if (currentDocument.id) {
        await updateDocument(currentDocument.id, { ...currentDocument });
      } else {
        const newDocument = await createDocument({
          title: 'New Document',
          content: currentDocument.content,
          author: DEFAULT_AUTHOR,
        });
        setCurrentDocument(newDocument);
      }
      setError(null);
    } catch (err) {
      setError('Failed to save the document. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewDocument = () => {
    setCurrentDocument({ id: '', title: 'New Document', content: '# New Document', author: DEFAULT_AUTHOR });
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>System Canvas</h1>
      </header>
      <main className="home-main">
        <aside className="home-sidebar">
          <DocumentList onSelectDocument={handleSelectDocument} />
          <button onClick={handleNewDocument} className="new-document-button">New Document</button>
        </aside>
        <section className="home-editor">
          {currentDocument ? (
            <>
              <Editor content={currentDocument.content} onChange={handleContentChange} />
              <SaveButton onClick={handleSave} isSaving={isSaving} disabled={!currentDocument.content} />
            </>
          ) : (
            <p>Select a document or create a new one to start editing.</p>
          )}
        </section>
        <section className="home-viewer">
          {currentDocument && <Viewer content={currentDocument.content} />}
        </section>
      </main>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Home;