$rendered-ui-capture

Review the UI change already applied in this workflow and produce the final report for it.

Context:

- This is a statically exported Next.js 16 personal site.
- The rendered site output is available in `out/` after the build step.
- The built site is served locally at `http://127.0.0.1:4173`.
- A prior workflow step may already have changed the working tree.
- You may inspect source code, `git diff`, and generated output.

Use the project subagents to keep the review disciplined:

- `repo_explorer` should map the relevant code paths and generated files first.
- `frontend_reviewer` should assess whether the implemented change is coherent, user-facing, and worth reporting.
- `ui_render_reviewer` should capture browser-rendered screenshots for the chosen UI area using Chrome DevTools MCP.

Rules:

- Do not edit application source files.
- The only files you may write are screenshot artifacts and lightweight manifests under `reports/daily-codex-site-review/`.
- Do not review or comment on the prose content of files in `/_posts`.
- First inspect `git diff --name-only` and `git diff --stat` to determine whether a meaningful UI change was implemented in the earlier phase.
- If there is no meaningful UI change in the working tree, return `action_required: false`, empty strings for `visual_target`, `artifact_dir`, and `ui_change_description`, and an empty `screenshots` array.
- If there is a meaningful UI change, report the strongest implemented UI change, not a hypothetical future idea.

Deliverable requirements:

- Pick the single most relevant implemented UI change for this run.
- Ground it in concrete evidence from the working tree diff and built output.
- Mention the most relevant changed files.
- Explain the user-facing payoff of the implemented change.
- Capture post-change visual evidence for the implemented UI:
  - use Chrome DevTools MCP against the locally served site
  - capture the relevant route, section, or component in light mode and dark mode
  - if the UI is responsive, capture multiple widths that show the behavior
  - save screenshots under `reports/daily-codex-site-review/visuals/`
- Keep the response compatible with the provided JSON schema.
