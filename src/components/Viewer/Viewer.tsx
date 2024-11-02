import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Viewer.css';
import plantUmlEncoder from 'plantuml-encoder';
import { encodeForUrl } from './utils';

interface ViewerProps {
  content: string;
}

const PLANTUML_SERVER_URL = 'http://www.plantuml.com/plantuml/img/';
const PLANTUML_LANGUAGE = 'plantuml';
const KROKI = 'kroki'
const KROKI_BLOCKDIAG = 'blockdiag'


const Viewer: React.FC<ViewerProps> = ({ content }) => {
  
  return (
    <div className="viewer-container">
      <div className="markdown-body">
        <ReactMarkdown
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(.+)/.exec(className || '');
              const language = match ? match[1] : '';
              // const inline = language == ''; //assumption: if no language is specified, it is inline code
              const code = String(children).replace(/\n$/, '');

              const processedImage = processCodeBlock(code, language);
              if (processedImage) {
                return processedImage
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


const processCodeBlock =  (code: string, language: string | undefined) => 
  {
    if (!code) return null;
    console.debug(`language = ${language}`)
    if (language === PLANTUML_LANGUAGE)
    {
      return  renderPlantUML(code);
    }
    else if (language?.startsWith(KROKI))
    {
      const regex = /^kroki-([a-zA-Z0-9]+)$/;
      const match = language.match(regex);
      console.debug(`diagram type = ${match?[1]: null}`)
      const diagType : string | null = match ? match[1] : null;
      console.debug(`diagram type = ${diagType}\ncode = ${code}`)
      return renderKroki(code, diagType);
    }
    return null;
  };


    
function renderKroki(code : string, type : string | null)
{
  if (!type) return null;

  if (type === KROKI_BLOCKDIAG)
  {
    code = `blockdiag {${code}}`
  }

  var urlPath = type + '/svg/' + encodeForUrl(code)
  var url = 'https://kroki.io/' + urlPath
  return <img src={url} alt="kroki diagram" />
}

/**
 * Given PlantUML code for a diagram, return a URL to a rendering of the code as a diagram
 * @param code The PlantUML code
 * @returns The new image element
 */
// function renderPlantUML(code: string) : string
function renderPlantUML(code: string) 
{
  const encoded = plantUmlEncoder.encode(code);
  const url = `${PLANTUML_SERVER_URL}${encoded}`;
  return <img src={url} alt="Processed code block" />;
}

