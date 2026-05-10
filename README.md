# Tech Note Blog

個人で調べた技術をまとめるための、Vite + React 製のシンプルなブログです。

## セットアップ

```bash
npm install
npm run dev
```

## 検証

```bash
npm run test
npm run lint
npm run build
```

## 記事の追加

記事は `src/content/posts.ts` に追加します。`format` は `html`、`md`、`tex` に対応しています。

## GitHub Pages

`npm run build` で生成される `dist` を GitHub Pages の公開対象にしてください。Vite の `base` は相対パスにしているため、ユーザーサイトとプロジェクトサイトのどちらでも配置しやすい構成です。
