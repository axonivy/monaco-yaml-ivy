import { editor, Uri } from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { setDiagnosticsOptions } from 'monaco-yaml'
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

// The uri is used for the schema file match.
const modelUri = Uri.parse('a://b/ivy.yaml')

setDiagnosticsOptions({
  enableSchemaRequest: true,

  hover: true,
  completion: true,
  validate: true,
  format: true,
  schemas: [
    {
      // Id of the first schema
      uri: 'https://json-schema.axonivy.com/ivy/0.0.2/ivy.json',
      fileMatch: [String(modelUri)]
    },
    {
      uri: 'https://json-schema.axonivy.com/app/0.0.1/app.json',
      fileMatch: [String(Uri.parse('a://b/app.yaml'))]
    }
  ]
})

const value = `
# yaml-language-server: $schema=https://json-schema.axonivy.com/ivy/0.0.2/ivy.json
SecuritySystems:
  azure:
`

editor.create(document.getElementById('editor'), {
  automaticLayout: true,
  model: editor.createModel(value, 'yaml', modelUri)
})
