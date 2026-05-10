import type { BlogPost } from '../content/posts';

type ArticleListProps = {
  posts: BlogPost[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
};

export function ArticleList({ posts, selectedSlug, onSelect }: ArticleListProps) {
  return (
    <nav aria-label="記事一覧" className="space-y-3">
      {posts.map((post) => {
        const isSelected = post.slug === selectedSlug;

        return (
          <button
            key={post.slug}
            type="button"
            onClick={() => onSelect(post.slug)}
            className={`block w-full rounded-lg border p-4 text-left transition ${
              isSelected
                ? 'border-cyan-600 bg-white shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <span className="text-xs font-medium uppercase tracking-normal text-slate-500">
              {post.format}
            </span>
            <span className="mt-2 block text-sm font-semibold text-slate-950">
              {post.title}
            </span>
            <span className="mt-2 block text-xs text-slate-500">{post.date}</span>
          </button>
        );
      })}
    </nav>
  );
}
