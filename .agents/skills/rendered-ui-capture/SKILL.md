---
name: rendered-ui-capture
description: Capture browser-rendered UI evidence for a local or preview website using Chrome DevTools MCP. Trigger when a task needs screenshots of the actual rendered UI, especially for light mode, dark mode, and responsive sizes, plus a short explanation of the proposed UI change. Do not trigger for source-only reviews or blog post prose editing.
---

# Rendered UI Capture

Use this skill when the task needs real rendered screenshots instead of code-only commentary.

## Required tooling

- Use Chrome DevTools MCP, not static HTML inspection.
- Work against a running local server when available.
- If the app is not running, stop and report the missing prerequisite rather than inventing screenshots.

## Capture rules

- Focus on the route, section, or component that best illustrates the recommendation.
- Prefer an element screenshot. If that is not reliable, use a tightly scoped viewport screenshot.
- Capture both light and dark mode.
- If the UI is responsive, capture at least:
  - mobile around `390px` wide
  - tablet around `768px` wide
  - desktop around `1280px` wide
- If the target is not meaningfully responsive, capture only the sizes that matter and say why.

## Output rules

- Save screenshots under `reports/daily-codex-site-review/visuals/`.
- Use filenames that include route or component hint, theme, and width.
- Return concise notes describing:
  - what is shown
  - why this area matters
  - what should change relative to the current rendering

## Boundaries

- Do not edit application code.
- Do not review or rewrite prose content inside `/_posts`.
- Do not claim a visual change was implemented unless it actually was.
