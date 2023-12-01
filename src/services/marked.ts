import { Marked } from "marked"
import { markedHighlight } from "marked-highlight"
import markedFootnote from "marked-footnote"
import markedKatex from "marked-katex-extension"
import hljs from "highlight.js"
import plaintext from "highlight.js/lib/languages/plaintext" 
import javascript from "highlight.js/lib/languages/javascript" 
import typescript from "highlight.js/lib/languages/typescript"
import dart from "highlight.js/lib/languages/dart"
import php from "highlight.js/lib/languages/php"
import python from "highlight.js/lib/languages/python"
import csharp from "highlight.js/lib/languages/csharp"
import kotlin from "highlight.js/lib/languages/kotlin"
import go from "highlight.js/lib/languages/go"
import rust from "highlight.js/lib/languages/rust"
import xml from "highlight.js/lib/languages/xml"
import css from "highlight.js/lib/languages/css"
import sql from "highlight.js/lib/languages/sql"
import json from "highlight.js/lib/languages/json"

hljs.registerLanguage("plaintext", plaintext) 
hljs.registerLanguage("javascript", javascript) 
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("dart", dart)
hljs.registerLanguage("php", php)
hljs.registerLanguage("python", python)
hljs.registerLanguage("csharp", csharp)
hljs.registerLanguage("kotlin", kotlin)
hljs.registerLanguage("go", go)
hljs.registerLanguage("rust", rust)
hljs.registerLanguage("xml", xml)
hljs.registerLanguage("css", css)
hljs.registerLanguage("sql", sql)
hljs.registerLanguage("json", json)

export async function convertMDtoHTML(md: string): Promise<string> {
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext"
        return hljs.highlight(code, { language }).value
      }
    }),
    markedFootnote(),
    markedKatex({ throwOnError: false})
  )

  return marked.parse(md)
}
