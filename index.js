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
  }

}

configureMonacoYaml(monaco, {
  enableSchemaRequest: true
})


window.yamlEditor = {
  create: function(element, uri, content) {
    monaco.editor.defineTheme('axon-input', themeData('dark'))
    monaco.editor.setTheme('axon-input')
    monaco.languages.html.registerHTMLLanguageService('xml', {}, { documentFormattingEdits: true })
    return monaco.editor.create(element, {
      automaticLayout: true,
      model: monaco.editor.createModel(content, undefined, monaco.Uri.parse(uri))
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
        'editor.foreground': '#FFFFFF',
        'editorCursor.foreground': '#FFFFFF',
        'editor.background': '#1b1b1b'
      },
      inherit: true,
      rules: []
    };
  }
  return {
    base: 'vs',
    colors: {
      'editor.foreground': '#202020',
      'editorCursor.foreground': '#202020',
      'editor.background': '#ffffff'
    },
    inherit: true,
    rules: []
  };
}