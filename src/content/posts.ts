export type PostFormat = 'html' | 'md' | 'tex';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  format: PostFormat;
  body: string;
};

export const posts: BlogPost[] = [
  {
    slug: 'vite-react-minimum',
    title: 'Vite と React の最小構成\n',
    date: '2026-05-10',
    description:
      'GitHub Pages に置きやすい静的ブログを、Vite と React で小さく始めるためのメモ。',
    format: 'md',
    body: `## 方針

- まずは静的にビルドできる構成にする
- 記事本文は UI コンポーネントから分離する
- ルーティングは増やさず、記事選択だけを React の state で扱う

## ビルド

\`\`\`bash
npm run build
\`\`\`

GitHub Pages では \`dist\` の中身を公開すれば動作します。`,
  },
  {
    slug: 'html-note',
    title: 'HTML で直接書く記事',
    date: '2026-05-09',
    description:
      '装飾を細かく制御したい記事では、HTML をそのまま本文として扱えるようにする。',
    format: 'html',
    body: `<h2>HTML 入力の用途</h2>
<p>表や注釈など、Markdown よりも直接 HTML を書いた方が分かりやすい場合に使います。</p>
<ul>
  <li>既存メモからの移植が簡単</li>
  <li>必要なタグだけを使える</li>
  <li>React 側の UI とは分離できる</li>
</ul>
<pre><code>&lt;article&gt;本文&lt;/article&gt;</code></pre>`,
  },
  {
    slug: 'tex-note',
    title: 'TeX メモの取り込み',
    date: '2026-05-08',
    description:
      '簡単な TeX 記法を HTML に変換して、数式や研究メモの下書きを掲載できるようにする。',
    format: 'tex',
    body: String.raw`\section{TeX 形式のメモ}
TeX で残した下書きを、ブログの本文として表示します。

\subsection{対応している最小記法}
\begin{itemize}
\item \texttt{\section} と \texttt{\subsection}
\item \texttt{\textbf} と \texttt{\emph}
\item \texttt{itemize} による箇条書き
\end{itemize}

\begin{verbatim}
\section{Example}
\end{verbatim}`,
  },
];
