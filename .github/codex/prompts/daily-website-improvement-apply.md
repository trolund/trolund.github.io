$website-modernization-audit

Implement exactly one small, high-leverage UI modernization improvement in this repository.

Rules:

- Modify source files only when the change is user-facing and defensible.
- Keep the diff tight. Prefer one focused improvement over a broad sweep.
- Do not edit or review prose content inside `/_posts`.
- You may touch `app/`, `components/`, `styles/`, `services/`, `lib/`, and related UI-supporting files.
- Use only stable web platform and framework features that are broadly stable in current Chrome, Safari, Firefox, and Edge.
- Do not introduce experimental APIs, unstable Next.js flags, or changes that would break static export.
- Avoid new dependencies unless the current stack cannot solve the problem cleanly.
- Do not create screenshots in this phase.
- Before finishing, run the smallest relevant validation you can for the touched area. Prefer `npm run build` if the change affects rendering.

Process:

- Use `repo_explorer` to map the relevant code path first.
- Use `frontend_reviewer` to sanity-check that the chosen change is worthwhile and low-risk.
- Implement the improvement directly in the working tree.
- Stop after the code change is complete.

If there is no strong UI improvement to make today, leave the working tree unchanged and say that explicitly in the final message.
