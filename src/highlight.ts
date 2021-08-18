import hljs from 'highlight.js';

export default function highlight(str: string, lang: string) {
  if (lang && hljs.getLanguage(lang)) {
    // return hljs.highlight(lang, str, true).value;
    return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
  }

  return '';
}
