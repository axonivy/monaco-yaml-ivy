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
  enableSchemaRequest: true,
  schemas: [ 
    {
      // If YAML file is opened matching this glob
      fileMatch: ['**/ivy.yaml'],
      // Then this schema will be downloaded from the internet and used.
      //uri: 'https://json-schema.ivyteam.ch/ivy/11.3.9/ivy.json'
      //uri: 'http://127.0.0.1:8080/system/json-schema/ivy/11.3.9/ivy.json'
      uri: 'http://localhost:5173/ivy/11.3.9/ivy.json'
    },
    // {
    //   // If YAML file is opened matching this glob
    //   fileMatch: ['**/app.yaml'],
    //   // Then this schema will be downloaded from the internet and used.
    //   //uri: 'https://json-schema.ivyteam.ch/ivy/11.3.9/ivy.json'
    //   //uri: 'http://127.0.0.1:8080/system/json-schema/ivy/11.3.9/ivy.json'
    //   uri: '/app/11.3.0/app.json'
    // }
  ]  
})

window.yamlEditor = {
  create: function(element, uri, content, theme) {
    monaco.editor.defineTheme('monaco-yaml-theme', themeData(theme))
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