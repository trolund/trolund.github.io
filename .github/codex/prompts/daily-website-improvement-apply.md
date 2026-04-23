$website-modernization-audit

Implement exactly one small, high-leverage improvement in this repository, scoped to a single component or page-level module.

Rules:

- Make only one focused improvement.
- Prefer a single-file change; at most two related files when necessary.
- Keep the diff tight and reviewable.
- Do not edit or review prose content inside `/_posts`.
- You may touch `app/`, `components/`, `styles/`, `services/`, `lib/`, and related UI-supporting files.
- Use only stable web platform and framework features that are broadly stable in current Chrome, Safari, Firefox, and Edge.
- Do not introduce experimental APIs, unstable Next.js flags, or changes that would break static export.
- Avoid new dependencies unless the current stack cannot solve the problem cleanly.
- Before finishing, run the smallest relevant validation you can for the touched area. Prefer `npm run build` if the change affects rendering.

Process:

- Use `repo_explorer` to map a suitable target first.
- Use `frontend_reviewer` to confirm the change is worthwhile and low risk.
- Implement the improvement directly in the working tree.
- Stop after that single focused change.

Final output requirements (important for PR description):

- Include `What changed` with exact files and behavior updates.
- Include `Why` with the concrete user/developer payoff.
- Include `Validation` with commands run and outcomes.

If there is no strong improvement to make today, leave the working tree unchanged and say that explicitly in the final message.
