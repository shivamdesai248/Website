import { visit } from 'unist-util-visit';

const VIDEO = /\.(mp4|webm|mov)$/i;

/**
 * remark: `![alt](/videos/clip.mp4 "Caption")` → <figure><video controls …></figure>.
 * Videos live in public/videos and are referenced from the site root.
 */
export function remarkVideo({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    visit(tree, 'image', (node, index, parent) => {
      if (!VIDEO.test(node.url) || !parent || index === undefined) return;
      const src = node.url.startsWith('/') ? prefix + node.url : node.url;
      const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
      const caption = node.title ? `<figcaption>${esc(node.title)}</figcaption>` : '';
      parent.children[index] = {
        type: 'html',
        value: `<figure class="media"><video src="${esc(src)}" controls playsinline preload="metadata" aria-label="${esc(node.alt)}"></video>${caption}</figure>`,
      };
    });
  };
}

/** rehype: a paragraph containing only an image with a title → <figure> with <figcaption>. */
export function rehypeFigure() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === undefined) return;
      const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
      if (kids.length !== 1 || kids[0].type !== 'element' || kids[0].tagName !== 'img') return;
      const img = kids[0];
      const title = img.properties?.title;
      const fig = { type: 'element', tagName: 'figure', properties: { className: ['media'] }, children: [img] };
      if (title) {
        delete img.properties.title;
        fig.children.push({ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: String(title) }] });
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
