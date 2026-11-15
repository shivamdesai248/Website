// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkAlert } from 'remark-github-blockquote-alert';
import { unified } from '@astrojs/markdown-remark';
import { site } from './site.config.ts';
import { remarkVideo, rehypeFigure, rehypeStripComments } from './src/lib/markdown-plugins.mjs';

export default defineConfig({
  site: site.url,
  base: site.base,
  trailingSlash: 'ignore',
  integrations: [
    expressiveCode({
      themes: ['github-dark-default', 'github-light'],
      themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
      useDarkModeMediaQuery: false,
      styleOverrides: {
        borderRadius: '12px',
        borderColor: 'var(--line)',
        codeFontFamily: "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace",
        uiFontFamily: "'Inter Tight Variable', system-ui, sans-serif",
        frames: { shadowColor: 'transparent' },
      },
    }),
    mdx(),
    react(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkAlert, [remarkVideo, { base: site.base }]],
      rehypePlugins: [rehypeKatex, rehypeFigure, rehypeStripComments],
    }),
  },
  vite: { plugins: [tailwindcss()] },
});
