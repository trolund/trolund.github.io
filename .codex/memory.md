# Project Memory

## Project Snapshot

- Personal portfolio and blog for `troelslund.dk`.
- Built with Next.js 16 App Router, React 19, TypeScript, and static export enabled via `output: 'export'`.
- Content-heavy site: blog posts and project content live in Markdown under `/_posts` and `/_content`.
- UI lives primarily in `app/`, `components/`, `styles/`, and a few helpers under `services/`, `lib/`, and `constants/`.

## Working Defaults

- Preserve the current architecture and naming. Favor small diffs over broad refactors.
- Keep the site compatible with static export. Avoid features that require a live server runtime unless the task explicitly calls for that change.
- Reuse existing design and motion patterns before introducing new primitives.
- Avoid new dependencies unless the current stack cannot solve the problem cleanly.

## Commands

- `npm run dev` for local development.
- `npm run build` to verify the static export build.
- `npm run lint` for eslint checks.
- `npm run test` for Jest tests.
- `npm run start` serves the exported `out/` directory.

## Important Paths

- `app/`: route entry points and page metadata.
- `components/`: reusable UI and visual effects.
- `_posts/`: markdown blog content with front matter.
- `_content/`: markdown-backed page content.
- `services/`: rendering, color, image-loader, and utility helpers.
- `styles/`: global styles and markdown styling.
- `lib/__tests__/`: existing Jest test area.

## Known Constraints

- `next.config.js` enables `reactCompiler` and a custom image loader in `services/image-loader-service.ts`.
- Build output is static, so changes should remain export-safe.
- Environment usage should stay limited and never expose secret values.

## Done Means

- The requested behavior is implemented with a reviewable diff.
- Relevant validation is run for the affected area.
- Content edits preserve front matter shape, tone, and routing.
