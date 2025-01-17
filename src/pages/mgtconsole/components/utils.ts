/// <reference types='../../../../node_modules/monaco-editor/monaco' />

import { IDefinitions } from '../../../store/home/types'
import {
  getDirectory,
  readDirRecursive,
  resolveFiles,
} from '../../../utilities/utilities'

export const loadDefinitions = async (
  directoryEntry: DirectoryEntry,
  dir: string[],
) => {
  return new Promise<IDefinitions[]>(async (resolve) => {
    const declarations: IDefinitions[] = []

    await Promise.all(
      dir.map(async (di) => {
        const subDirectoryEntry = await getDirectory(
          directoryEntry,
          di.replace('/crxfs', ''),
        )
        const entries = await readDirRecursive(subDirectoryEntry)
        for (const entry of entries) {
          const fullpath = entry.fullPath.replace('/crxfs/', '')
          const file = await fetch(fullpath)
          const content = await file.text()
          if (
            fullpath.endsWith('/index.d.ts') &&
            fullpath !== 'react/index.d.ts'
          ) {
            const newPath = fullpath.replace('/index.d.ts', '.d.ts')
            const newContent = `export * from "./${newPath
              .substring(newPath.lastIndexOf('/') + 1)
              .replace('.d.ts', '')}/index";`
            declarations.push({ content: newContent, filePath: newPath })
          } else if (fullpath === 'react/index.d.ts') {
            const newPath = 'react.d.ts'
            // const newContent = `import * as React from "react/index"; export default React;`
            declarations.push({ content, filePath: newPath })
          }
          declarations.push({ content, filePath: fullpath })
        }
      }),
    )
    resolve(declarations)
  })
}

export const MGTPlaygroundMonacoConfigs = () => {
  const COMMON_CONFIG: monaco.editor.IEditorOptions = {
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    readOnly: false,
    fontSize: 16,
    suggestOnTriggerCharacters: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    // automaticLayout: true,
  }
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: 'React.createElement',
    jsxFragmentFactory: 'React.Fragment',
    reactNamespace: 'React',
    allowNonTsExtensions: true,
    allowJs: true,
    typeRoots: ['node_modules'],
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowSyntheticDefaultImports: true,
    target: monaco.languages.typescript.ScriptTarget.Latest,
    experimentalDecorators: true,
  })

  return COMMON_CONFIG
}

export const initCode = () => {
  const code = `
  import React, { useState } from "react"
  import { PeoplePicker, People, Login } from '@microsoft/mgt-react';
  import { LoginType, MsalProvider } from '@microsoft/mgt';
  import { Providers } from '@microsoft/mgt-element';

  () => {
    Providers.globalProvider = new MsalProvider({
      clientId: '20d34c96-396e-4bf0-a008-472ef10a5099',
      loginType: LoginType.Popup,
      scopes: ['calendars.read', 'user.read', 'openid', 'profile', 'people.read', 'user.readbasic.all']
    });

    const [people, setPeople] = useState([]);

    const Title = () => (
      <h3 className={'mgt-dark'} style={{ color: 'palevioletred' }}>
        Hello Microsoft Graph Toolkit!
      </h3>
    )

    const SelectedPeople = () => (
      <h4 style={{ color: 'palevioetred' }}>
        Selected people:
      </h4>
    )

    const handleSelectionChanged = (e) => {
      setPeople(e.target.selectedPeople);
    };

    return (
      <div>
        <Title />
        <Login
          className={'mgt-dark'}
        />
        <PeoplePicker
          className={'mgt-dark'}
          selectionChanged={handleSelectionChanged}
        />
        {
          people.length > 0 &&
          <div>
            <SelectedPeople />
            <People className={'mgt-dark'} people={people} />
          </div>
        }
      </div>
    )
  }
`
  return code.substring(code.indexOf('\n') + 1)
}

export const initResult = () => {
  const code = `
  {
    "console.log() will output here" : ""
  }
`
  return code.substring(code.indexOf('\n') + 1)
}

export const fixImports = (lines: string[], ecode: string[]) => {
  const prepnp: string[] = []
  lines.forEach((line) => {
    // remove imports
    if (
      line.toLowerCase().indexOf('require(') === -1 &&
      line.toLowerCase().indexOf('use strict') === -1 &&
      line.toLowerCase().indexOf('__esmodule') === -1
    ) {
      ecode.push(line)
    }
    if (line.toLowerCase().indexOf(' = require') > -1) {
      // fix imports
      const lineRe = line.match('var (.*) = require')
      let mod = -1
      mod = line.indexOf('msal') > -1 ? 0 : mod
      mod = line.indexOf('@microsoft/microsoft-graph-client') > -1 ? 1 : mod
      prepnp.push(`var ${lineRe![1]} = modules[${mod}];`)
    }
  })
  return prepnp
}

// find all import lines from code
export const getImportModules = (content: string) => {
  const importTexts: string[] = []
  const imports = content.match(
    /(import|from).*(@microsoft|msal|react|@pnp).*/g,
  )
  if (imports) {
    imports.forEach((iText) => {
      const match = iText.match(/(["'])(.*?[^\\])\1/g)
      if (match) {
        importTexts.push(match[0].replace(/"/g, '').replace(/'/g, ''))
      }
    })
  }
  return Array.from(new Set(importTexts))
}

export const locations = (substringx: any, stringx: string) => {
  const indexes = Array.from(
    stringx.matchAll(new RegExp(substringx, 'gi')),
  ).map((a) => a.index)
  return indexes
}

export const getExportRows = (content: string, path: string) => {
  const libs = content.match(
    /("(\.|@|msal|react)|'(\.|@|msal|rreact)).*\/.*("|')/g,
  )
  if (libs) {
    const exportTexts: string[] = []
    libs.forEach((eText) => {
      const libo = eText.match(/(["'])(.*?[^\\])\1/g)
      if (libo) {
        const lib = libo[0].replace(/"/g, '').replace(/'/g, '')
        const splitIndex = locations('/', path)
        if (lib.startsWith('./')) {
          const jee = splitIndex[splitIndex.length - 1]
          const lib1 = path.substring(0, jee! + 1) + lib.substring(2)
          exportTexts.push(lib1)
        } else if (lib.startsWith('../../')) {
          const jee = splitIndex[splitIndex.length - 3]
          if (jee) {
            const lib2 = path.substring(0, jee + 1) + lib.substring(6)
            exportTexts.push(lib2)
          }
        } else if (lib.startsWith('../')) {
          const jee = splitIndex[splitIndex.length - 2]
          if (jee) {
            const lib3 = path.substring(0, jee + 1) + lib.substring(3)
            exportTexts.push(lib3)
          }
        } else {
          exportTexts.push(lib)
        }
      }
    })
    return exportTexts
  } else {
    return []
  }
}

export const getDefinitionsInUse = (
  codeWithOutComments: string,
  definitions: IDefinitions[],
) => {
  const initModules = getImportModules(codeWithOutComments)
  const defs = resolveFiles(initModules, definitions)
  const currentLibs: IDefinitions[] = []

  const parseLibs = (filelist: IDefinitions[]) => {
    filelist.forEach((file) => {
      const libs = resolveFiles(
        getExportRows(file.content, file.filePath),
        definitions,
      )
      if (libs && libs.length > 0) {
        const newLibs = libs.filter(
          (d) => !currentLibs.find((g) => d.filePath === g.filePath),
        )
        newLibs.forEach((lib) => currentLibs.push(lib))
        parseLibs(newLibs)
      }
    })
    const initLibs = filelist.filter(
      (file) => !currentLibs.find((lib) => file.filePath === lib.filePath),
    )
    if (initLibs && initLibs.length > 0) {
      initLibs.forEach((lib) => currentLibs.push(lib))
    }
  }
  parseLibs(defs)
  return currentLibs
}

export const parseModules = (
  preview_code: string,
) => {
  const requires = preview_code.match(/(var ).*( = require).*/g)
  const reqs: string[] = []
  if (requires) {
    requires.forEach((iText) => {
      preview_code = preview_code.replace(iText, '')
      reqs.push(iText)
    })
  }
  reqs
    .sort((a, b) => b.length - a.length)
    .forEach((req) => {
      const match = req.match('var (.*) = require')
      if (match!.input!.indexOf('require("@microsoft/mgt-react') > -1) {
        preview_code = preview_code.replaceAll(
          match![1] + '.default',
          'preview_mgt_react.'.toUpperCase(),
        )
        preview_code = preview_code.replaceAll(
          match![1],
          'preview_mgt_react'.toUpperCase(),
        )
      } else if (
        match!.input!.indexOf('require(”@microsoft/mgt-element') > -1
      ) {
        preview_code = preview_code.replaceAll(
          match![1] + '.default.',
          'preview_mgt_element.'.toUpperCase(),
        )
        preview_code = preview_code.replaceAll(
          match![1],
          'preview_mgt_element'.toUpperCase(),
        )
      } else if (match!.input!.indexOf('require("@microsoft/mgt') > -1) {
        preview_code = preview_code.replaceAll(
          match![1] + '.default.',
          'preview_mgt.'.toUpperCase(),
        )
        preview_code = preview_code.replaceAll(
          match![1],
          'preview_mgt'.toUpperCase(),
        )
      } else if (match!.input!.indexOf('require("react"') > -1) {
        preview_code = preview_code.replaceAll(
          match![1] + '.default.',
          'preview_react.'.toUpperCase(),
        )
        preview_code = preview_code.replaceAll(
          match![1],
          'preview_react'.toUpperCase(),
        )
      } else if (match!.input!.indexOf('require("msal"') > -1) {
        preview_code = preview_code.replaceAll(
          match![1] + '.default.',
          'preview_msal.'.toUpperCase(),
        )
        preview_code = preview_code.replaceAll(
          match![1],
          'preview_msal'.toUpperCase(),
        )
      }
    })

  preview_code = preview_code.replaceAll('"use strict";', '')
  preview_code = preview_code.replaceAll(
    'Object.defineProperty(exports, "__esModule", { value: true });',
    '',
  )
  return preview_code
}

export const parseClassComponent = (preview_code: string) => {
  if (preview_code.indexOf('/** @class */') > -1) {
    const prepnp: string[] = []
    const koko = preview_code.split('\n')
    let takerest = false
    koko.forEach((line) => {
      if (line.indexOf('/** @class */') > -1 || takerest) {
        if (line.indexOf('/** @class */') > -1) {
          takerest = true
          prepnp.push(line.replace('var ', ''))
        } else {
          prepnp.push(line)
        }
      }
    })
    preview_code = prepnp.join('\n')
  }
  return preview_code
}
