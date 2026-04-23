---
name: website-modernization-audit
description: Audit this repository's website implementation for one high-leverage modernization or UX improvement that is compatible with static export and stable across current Chrome, Safari, Firefox, and Edge. Trigger for recurring site review, modern web best-practice checks, browser-safe feature adoption, and website improvement suggestions. Do not trigger for blog post content editing.
---

# Website Modernization Audit

Use this skill when the task is to review the site and propose a focused improvement.

## Scope

- Review the implementation and built site output, not only source code.
- Focus on `app/`, `components/`, `styles/`, `services/`, `lib/`, and generated `out/` files when present.
- Evaluate homepage, about page, projects page, blog index, shared layout, navigation, footer, typography, motion, metadata, accessibility, and performance-sensitive UI code.
- You may review blog templates and blog index behavior, but do not review or rewrite the prose content of files under `/_posts`.

## Priorities

- Prefer one improvement with the highest user-facing or maintainability impact.
- Favor modern, stable platform and framework features that fit this repo's static-export setup.
- Prefer changes that preserve the site's current visual language unless a stronger UX issue is evident.
- Keep suggestions grounded in the real codebase with specific file references.

## Browser and platform rules

- Recommend only features that are stable in current stable Chrome, Safari, Firefox, and Edge.
- If browser support is uncertain or requires a significant fallback story, skip the idea.
- Do not recommend experimental browser APIs, unstable framework flags, or platform features that would break static export.

## Output style

- Return one clear recommendation, not a brainstorm list.
- Explain why it matters now.
- Name the most relevant files or routes.
- If no worthwhile improvement stands out, say so explicitly instead of forcing a weak suggestion.
