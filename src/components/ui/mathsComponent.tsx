// components/MathsComponent.tsx
import { useEffect } from 'react';

interface ExtendedWindow extends Window {
  MathJax?: {
    tex: {
      inlineMath: Array<Array<string>>;
    };
    options: {
      skipHtmlTags: string[];
      ignoreHtmlClass: string;
      processHtmlClass: string;
    };
  };
}

const MathsComponent: React.FC<{ children: string }> = ({ children }) => {
  useEffect(() => {
    const extendedWindow = window as ExtendedWindow;

    if (typeof window !== 'undefined' && !extendedWindow.MathJax) {
      extendedWindow.MathJax = {
        tex: {
          inlineMath: [['$', '$']],
        },
        options: {
          skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
          ignoreHtmlClass: 'tex2jax_ignore',
          processHtmlClass: 'tex2jax_process',
        },
      };
      const script = document.createElement('script');
      script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
      script.async = true;
      document.body.appendChild(script);

      const mathJaxScript = document.createElement('script');
      mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      mathJaxScript.async = true;
      document.body.appendChild(mathJaxScript);
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: children }} />;
};

export default MathsComponent;
