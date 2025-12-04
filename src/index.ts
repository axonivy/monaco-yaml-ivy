import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import { configureMonacoYaml } from 'monaco-yaml';
import YamlWorker from './yaml.worker?worker';

type Theme = 'light' | 'dark';

declare global {
  interface Window {
    codeEditor: monaco.editor.ICodeEditor;
    setTheme: (theme: Theme) => void;
  }
}

window.MonacoEnvironment = {
  getWorker(moduleId, label) {
    switch (label) {
      case 'editorWorkerService':
        return new EditorWorker();
      case 'yaml':
        return new YamlWorker();
      default:
        throw new Error(`Unknown label ${label}`);
    }
  }
};

// Add setTheme as a property at runtime (not in the type)
(window.MonacoEnvironment as any).setTheme = function (theme: Theme) {
  monaco.editor.defineTheme('monaco-yaml-theme', themeData(theme));
};

configureMonacoYaml(monaco, {
  enableSchemaRequest: true
});

function createYamlEditor(element: HTMLElement | null, uri: string, content: string, theme: Theme) {
  if (!element) {
    throw new Error('Element not found');
  }
  monaco.editor.defineTheme('monaco-yaml-theme', themeData(theme));
  monaco.editor.setTheme('monaco-yaml-theme');
  monaco.languages.html.registerHTMLLanguageService('xml', {}, { documentFormattingEdits: true });
  return monaco.editor.create(element, {
    automaticLayout: true,
    model: monaco.editor.createModel(content, undefined, monaco.Uri.parse(uri)),
    tabSize: 2,
    renderWhitespace: 'all',
    stickyScroll: { enabled: true, defaultModel: 'foldingProviderModel' }
  });
}

function themeData(theme: Theme): monaco.editor.IStandaloneThemeData {
  if (theme === 'dark') {
    return {
      base: 'vs-dark',
      colors: {
        'editor.background': '#2c2c2c'
      },
      inherit: true,
      rules: []
    };
  }
  return {
    base: 'vs',
    colors: {},
    inherit: true,
    rules: []
  };
}

let content = '';
let params = new URLSearchParams(window.location.search);
if (params.get('demo') === 'on') {
  content = `# yaml-language-server: $schema=https://json-schema.axonivy.com/ivy/11.3.1/ivy.json
SecuritySystems:
  azure:
`;
}
const theme = params.get('theme') === 'dark' ? 'dark' : 'light';
window.onload = function () {
  window.codeEditor = createYamlEditor(document.getElementById('editor'), 'a://b/ivy.yaml', content, theme);
  window.setTheme = (theme: Theme) => monaco.editor.defineTheme('monaco-yaml-theme', themeData(theme));
};
