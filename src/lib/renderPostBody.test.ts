import { describe, expect, it } from 'vitest';
import { renderMarkdown, renderTex } from './renderPostBody';

describe('renderMarkdown', () => {
  it('renders headings, lists, inline code, and code blocks', () => {
    const html = renderMarkdown(`## Title

- Use \`vite\`
- Build

\`\`\`bash
npm run build
\`\`\``);

    expect(html).toContain('<h2>Title</h2>');
    expect(html).toContain('<li>Use <code>vite</code></li>');
    expect(html).toContain('<pre><code>npm run build</code></pre>');
  });
});

describe('renderTex', () => {
  it('renders basic TeX blocks', () => {
    const html = renderTex(String.raw`\section{Title}
\textbf{Important} note.

\begin{itemize}
\item \emph{One}
\end{itemize}`);

    expect(html).toContain('<h2>Title</h2>');
    expect(html).toContain('<strong>Important</strong>');
    expect(html).toContain('<li><em>One</em></li>');
  });
});
