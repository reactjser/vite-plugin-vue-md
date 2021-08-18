import MarkdownIt from 'markdown-it';
import cardWrapper from './card-wrapper';
import highlight from './highlight';

function wrapper(content: string) {
  content = cardWrapper(content);
  content = escape(content);

  return `
import { defineComponent, h } from 'vue';
const content = unescape(\`${content}\`);

export default defineComponent({
  name: 'MarkdownWrapper',
  setup() {
    return () => h('section', { innerHTML: content});
  },
});
`;
}

const parser = new MarkdownIt({
  html: true,
  highlight,
});

const fileRegex = /\.md$/;

// TODO: add options
export default function vitePluginMd(options: any) {
  return {
    name: 'transform-md-to-vue3',
    transform(src: string, id: string) {
      if (fileRegex.test(id)) {
        return {
          code: wrapper(parser.render(src)),
          map: null, // 如果可行将提供 source map
        };
      }
    },
  };
}
