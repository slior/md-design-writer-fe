import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Viewer.css';
import plantUmlEncoder from 'plantuml-encoder';

interface ViewerProps {
  content: string;
}

const PLANTUML_SERVER_URL = 'http://www.plantuml.com/plantuml/img/';
const PLANTUML_LANGUAGE = 'plantuml';

const processCodeBlock = (code: string, language: string | undefined) => 
{
  if (language === PLANTUML_LANGUAGE && code)
  {
    const encoded = plantUmlEncoder.encode(code);
    const url = `${PLANTUML_SERVER_URL}${encoded}`;
    return url;
  }
  return null;
};

const Viewer: React.FC<ViewerProps> = ({ content }) => {
  return (
    <div className="viewer-container">
      <div className="markdown-body">
        <ReactMarkdown
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              // const inline = language == ''; //assumption: if no language is specified, it is inline code
              const code = String(children).replace(/\n$/, '');

              const processedImage = processCodeBlock(code, language);
              if (processedImage) {
                return <img src={processedImage} alt="Processed code block" />;
              }

              // return !inline ? (
              //   <pre>
              //     <code className={className} {...props}>
              //       {code}
              //     </code>
              //   </pre>
              // ) : (
              return  <code className={className} {...props}>
                  {children}
                </code>
              // );
            },
          }}
        >{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Viewer;