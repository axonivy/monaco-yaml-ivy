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
      // Associate with our model
      fileMatch: [String(modelUri)],
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            // Reference the second schema
            $ref: 'http://myserver/bar-schema.json'
          }
        }
      }
    },
    {
      // Id of the first schema
      
      uri: 'https://json-schema.axonivy.com/app/0.0.1/app.json',
      // schema: {
      //   type: 'object',
      //   properties: {
      //     q1: {
      //       enum: ['x1', 'x2']
      //     }
      //   }
      // }
    }
  ]
})

const value = '# yaml-language-server: $schema=https://json-schema.axonivy.com/app/0.0.1/app.json\nData:\np1: \np2: \n'

editor.create(document.getElementById('editor'), {
  automaticLayout: true,
  model: editor.createModel(value, 'yaml', modelUri)
})
