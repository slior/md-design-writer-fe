import React from 'react';
import './SaveButton.css';

interface SaveButtonProps {
  onClick: () => void;
  isSaving: boolean;
  disabled?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, isSaving, disabled = false }) => {
  return (
    <button 
      className={`save-button ${isSaving ? 'saving' : ''}`} 
      onClick={onClick}
      disabled={disabled || isSaving}
    >
      {isSaving ? (
        <>
          <span className="save-button-spinner"></span>
          Saving...
        </>
      ) : (
        'Save'
      )}
    </button>
  );
};

export default SaveButton;