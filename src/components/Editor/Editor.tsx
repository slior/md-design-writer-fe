import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import './Editor.css';

interface EditorProps {
  content: string;
  onChange: (value: string | undefined) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  return (
    <div className="editor-container">
      <MDEditor
        value={content}
        onChange={onChange}
        height={800}
        preview="edit"
        
      />
    </div>
  );
};

export default Editor;