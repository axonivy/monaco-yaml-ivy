import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { configureMonacoYaml } from 'monaco-yaml'
import YamlWorker from './yaml.worker.js?worker'

window.MonacoEnvironment = {
  getWorker(moduleId, label) {
    switch (label) {
      case 'editorWorkerService':
        return new EditorWorker()
      case 'yaml':
        return new YamlWorker()
      default:
        throw new Error(`Unknown label ${label}`)
    }
  },
  setTheme: function(theme) {
    monaco.editor.defineTheme('monaco-yaml-theme', themeData(theme))
  }
}

configureMonacoYaml(monaco, {
  enableSchemaRequest: true
})

window.yamlEditor = {
  create: function(element, uri, content) {
    monaco.editor.defineTheme('monaco-yaml-theme', themeData('dark'))
    monaco.editor.setTheme('monaco-yaml-theme')
    monaco.languages.html.registerHTMLLanguageService('xml', {}, { documentFormattingEdits: true })
    return monaco.editor.create(element, {
      automaticLayout: true,
      model: monaco.editor.createModel(content, undefined, monaco.Uri.parse(uri)),
      tabSize: 2, 
      renderWhitespace: 'all'
    });
  },
  uri: function(uriRaw) {
    return monaco.Uri.parse(uriRaw);
  }
}

function themeData(theme) {
  if (theme == 'dark') {
    return {
      base: 'vs-dark',
      colors: {
        'editor.background': '#293241'
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