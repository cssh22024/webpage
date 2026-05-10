import type { BlogPost } from '../content/posts';
import { renderPostBody } from '../lib/renderPostBody';

type ArticleViewProps = {
  post: BlogPost;
};

export function ArticleView({ post }: ArticleViewProps) {
  const html = renderPostBody(post);

  return (
    <article className="rounded-lg border border-slate-200 bg-white px-5 py-6 shadow-sm md:px-8 md:py-8">
      <header className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="rounded-md bg-cyan-50 px-2.5 py-1 font-medium text-cyan-700">
            {post.format}
          </span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-normal text-slate-950">
          {post.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          {post.description}
        </p>
      </header>
      <div
        className="prose-content mt-7"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
