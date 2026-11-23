import { visit } from 'unist-util-visit';

/**
 * Size option at the end of an image/video title: "Caption {width=50%}" or "{width=480px}".
 * Returns the caption without the option, and the width (or null).
 */
const WIDTH = /\s*\{width=(\d{1,4}(?:%|px))\}\s*$/i;
export function splitWidth(title) {
  const t = String(title ?? '');
  const m = t.match(WIDTH);
  return m ? { caption: t.replace(WIDTH, ''), width: m[1] } : { caption: t, width: null };
}

const VIDEO = /\.(mp4|webm|mov)(#loop)?$/i;

/**
 * remark: `![alt](/videos/clip.mp4 "Caption")` → <figure><video controls …></figure>.
 * Add `#loop` (`/videos/clip.mp4#loop`) for a GIF-style clip: muted, looping, autoplaying, no controls.
 * Base.astro pauses loops and shows controls for visitors who prefer reduced motion.
 * Videos live in public/videos and are referenced from the site root.
 */
export function remarkVideo({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    visit(tree, 'image', (node, index, parent) => {
      if (!VIDEO.test(node.url) || !parent || index === undefined) return;
      const loop = node.url.toLowerCase().endsWith('#loop');
      const url = loop ? node.url.slice(0, -5) : node.url;
      const src = url.startsWith('/') ? prefix + url : url;
      const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
      const { caption: text, width } = splitWidth(node.title);
      const caption = text ? `<figcaption>${esc(text)}</figcaption>` : '';
      const style = width ? ` style="--fig-w: ${width}"` : '';
      parent.children[index] = {
        type: 'html',
        value: loop
          ? `<figure class="media"${style}><video src="${esc(src)}" data-loop autoplay muted loop playsinline preload="auto" aria-label="${esc(node.alt)}"></video>${caption}</figure>`
          : `<figure class="media"${style}><video src="${esc(src)}" controls playsinline preload="metadata" aria-label="${esc(node.alt)}"></video>${caption}</figure>`,
      };
    });
  };
}

/**
 * rehype: a paragraph containing only an image (with an optional title) → <figure> with <figcaption>.
 * Two or three images on one Markdown line (same paragraph) → one figure laid out as a row
 * (`figure.media.row`), captioned with their titles joined by " · ".
 * End a title with {width=50%} (or px) to cap the figure's width; see splitWidth.
 */
export function rehypeFigure() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === undefined) return;
      const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
      if (kids.length < 1 || kids.length > 3) return;
      if (!kids.every((k) => k.type === 'element' && k.tagName === 'img')) return;
      const titles = [];
      let width = null;
      for (const img of kids) {
        const split = splitWidth(img.properties?.title);
        if (split.caption) titles.push(split.caption);
        if (split.width) width = split.width;
        delete img.properties.title;
      }
      const className = kids.length > 1 ? ['media', 'row', `row-${kids.length}`] : ['media'];
      const properties = width ? { className, style: `--fig-w: ${width}` } : { className };
      const fig = { type: 'element', tagName: 'figure', properties, children: [...kids] };
      if (titles.length) {
        fig.children.push({ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: titles.join(' · ') }] });
      }
      parent.children[index] = fig;
    });
  };
}

/** rehype: drop HTML comments (<!-- notes -->) so authoring notes never reach the published page. */
export function rehypeStripComments() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (!parent || index === undefined) return;
      const isComment = node.type === 'comment' || (node.type === 'raw' && /^\s*<!--[\s\S]*?-->\s*$/.test(node.value));
      if (isComment) {
        parent.children.splice(index, 1);
        return index;
      }
    });
  };
}
