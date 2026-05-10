import type { BlogPost } from '../content/posts';

export function renderPostBody(post: BlogPost): string {
  if (post.format === 'html') {
    return post.body;
  }

  if (post.format === 'tex') {
    return renderTex(post.body);
  }

  return renderMarkdown(post.body);
}

export function renderMarkdown(source: string): string {
  const lines = source.trim().split(/\r?\n/);
  const html: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let codeLines: string[] = [];
  let inCode = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    html.push(`<ul>${listItems.map((item) => `<li>${item}</li>`).join('')}</ul>`);
    listItems = [];
  };

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (line.trim() === '') {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = /^(#{2,3})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      const tag = heading[1].length === 2 ? 'h2' : 'h3';
      html.push(`<${tag}>${renderInlineMarkdown(heading[2])}</${tag}>`);
      continue;
    }

    const listItem = /^-\s+(.+)$/.exec(line);
    if (listItem) {
      flushParagraph();
      listItems.push(renderInlineMarkdown(listItem[1]));
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();

  return html.join('');
}

export function renderTex(source: string): string {
  const verbatimBlocks: string[] = [];
  const withPlaceholders = source.replace(
    /\\begin\{verbatim\}([\s\S]*?)\\end\{verbatim\}/g,
    (_match, code: string) => {
      const index = verbatimBlocks.push(code.trim()) - 1;
      return `\n@@VERBATIM_${index}@@\n`;
    },
  );

  const lines = withPlaceholders.trim().split(/\r?\n/);
  const html: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let inList = false;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p>${renderInlineTex(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    html.push(`<ul>${listItems.map((item) => `<li>${item}</li>`).join('')}</ul>`);
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      flushParagraph();
      continue;
    }

    if (trimmed === String.raw`\begin{itemize}`) {
      flushParagraph();
      inList = true;
      continue;
    }

    if (trimmed === String.raw`\end{itemize}`) {
      flushList();
      inList = false;
      continue;
    }

    const verbatim = /^@@VERBATIM_(\d+)@@$/.exec(trimmed);
    if (verbatim) {
      flushParagraph();
      html.push(
        `<pre><code>${escapeHtml(verbatimBlocks[Number(verbatim[1])] ?? '')}</code></pre>`,
      );
      continue;
    }

    const section = /^\\section\{(.+)\}$/.exec(trimmed);
    if (section) {
      flushParagraph();
      flushList();
      html.push(`<h2>${renderInlineTex(section[1])}</h2>`);
      continue;
    }

    const subsection = /^\\subsection\{(.+)\}$/.exec(trimmed);
    if (subsection) {
      flushParagraph();
      flushList();
      html.push(`<h3>${renderInlineTex(subsection[1])}</h3>`);
      continue;
    }

    const listItem = /^\\item\s+(.+)$/.exec(trimmed);
    if (listItem && inList) {
      listItems.push(renderInlineTex(listItem[1]));
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return html.join('');
}

function renderInlineMarkdown(source: string): string {
  return escapeHtml(source).replace(/`([^`]+)`/g, '<code>$1</code>');
}

function renderInlineTex(source: string): string {
  return escapeHtml(source)
    .replace(/\\textbf\{([^{}]+)\}/g, '<strong>$1</strong>')
    .replace(/\\emph\{([^{}]+)\}/g, '<em>$1</em>')
    .replace(/\\texttt\{([^{}]+)\}/g, '<code>$1</code>');
}

function escapeHtml(source: string): string {
  return source
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
