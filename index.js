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
    monaco.languages.html.registerHTMLLanguageService('xml', {}, { documentFormattingEdits: true })
    return monaco.editor.create(element, {
      automaticLayout: true,
      model: monaco.editor.createModel(content, undefined, monaco.Uri.parse(uri))
    });
  }
}
