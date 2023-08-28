import { editor, languages, Uri } from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { createLanguageServiceDefaults, setDiagnosticsOptions } from 'monaco-yaml'
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

setDiagnosticsOptions({
  enableSchemaRequest: true,
  hover: true,
  completion: true,
  validate: true,
  format: true,
})


window.yamlEditor = {
  create: function(element, uri, content) {
    return editor.create(element, {
      automaticLayout: true,
      model: editor.createModel(content, undefined, Uri.parse(uri))
    })
  }
}
