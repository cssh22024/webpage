import { useMemo, useState } from 'react';
import { ArticleList } from './components/ArticleList';
import { ArticleView } from './components/ArticleView';
import { posts } from './content/posts';

export function App() {
  const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug ?? '');
  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === selectedSlug) ?? posts[0],
    [selectedSlug],
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 md:grid-cols-[280px_1fr] md:px-8">
        <aside className="md:sticky md:top-8 md:h-fit">
          <div className="mb-7">
            <p className="text-sm font-semibold text-cyan-700">Tech Notes</p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
              調べた技術を残すブログ
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              HTML、Markdown、TeX で書いたメモを同じ UI で読める最小構成のブログです。
            </p>
          </div>
          <ArticleList
            posts={posts}
            selectedSlug={selectedPost.slug}
            onSelect={setSelectedSlug}
          />
        </aside>
        <ArticleView post={selectedPost} />
      </div>
    </main>
  );
}
