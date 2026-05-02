# TechAegisAI Website — Mandatory Skill Routing

This project builds a 3D / interactive website. **Skills are not optional suggestions — they are mandatory routing rules.** Follow the decision tree below for every non-trivial task.

---

## HARD RULES (never skip)

1. **Before any creative or implementation work** → invoke `brainstorming` skill first to explore intent, requirements, and design. No coding before brainstorming output is produced for the task.
2. **Before writing implementation code** for any feature or bugfix → invoke `test-driven-development`. Tests fail first, then code makes them pass.
3. **Before debugging any unexpected behavior** → invoke `systematic-debugging`. Do not guess-fix. Root cause must be identified before a fix is proposed.
4. **Before marking any task complete** → invoke `verification-before-completion`. Running code, passing tests, visual check if UI. Self-reported "done" without verification is forbidden.
5. **Before completing any branch/feature** → invoke `requesting-code-review` (and `receiving-code-review` when reviewing feedback).
6. **For isolated feature work** → invoke `using-git-worktrees` to avoid clobbering the workspace.
7. **For 2+ independent subtasks** → invoke `dispatching-parallel-agents` / `subagent-driven-development` instead of serial execution.

---

## SKILL ROUTING TABLE (by task type)

| Task | Mandatory skills (in order) |
|------|-----------------------------|
| New feature / component | `brainstorming` → `writing-plans` → `test-driven-development` → `executing-plans` → `verification-before-completion` → `requesting-code-review` |
| Bug / unexpected behavior | `systematic-debugging` → `test-driven-development` → `verification-before-completion` |
| UI / visual design | `frontend-design` + `web-design-guidelines` + (`theme-factory` or `brand-guidelines`) |
| React/Next.js code | `vercel-react-best-practices` + `vercel-composition-patterns` |
| Page/route transitions, animations | `vercel-react-view-transitions` |
| Complex interactive artifact / React+Tailwind+shadcn | `web-artifacts-builder` |
| 3D / generative / algorithmic visuals | `algorithmic-art` + `canvas-design` |
| Programmatic video, motion, animation timing | `remotion-best-practices` |
| Deploying to production | `deploy-to-vercel` (+ `vercel-cli-with-tokens` if token auth) |
| Testing the running web app | `webapp-testing` |
| Building an MCP server | `mcp-builder` |
| Using Claude/Anthropic API | `claude-api` |
| Any PDF / DOCX / XLSX / PPTX operation | `pdf` / `docx` / `xlsx` / `pptx` |
| Writing a new Claude skill | `skill-creator` + `writing-skills` |
| Release / changelog work | `finishing-a-development-branch` |

**If two skills conflict, process skills (brainstorming, TDD, debugging) take priority over domain skills (frontend-design, etc). Both still run.**

---

## VALIDATION GATES (hard stops)

Every task passes through these gates before being reported complete. Skipping a gate = the task is not done.

**Gate 1 — Intent verified**
- Output of `brainstorming` exists for this task.
- Requirements are written down, not assumed.

**Gate 2 — Plan verified**
- `writing-plans` output exists for non-trivial work (>30 min or multi-file).
- Plan lists files to change, tests to add, and acceptance criteria.

**Gate 3 — Tests first**
- For any behavior change: failing test exists *before* implementation.
- `test-driven-development` cycle observed (red → green → refactor).

**Gate 4 — Implementation verified**
- Code compiles / typechecks.
- New and existing tests pass.
- For UI: `webapp-testing` run against the dev server — golden path + at least one edge case verified in a real browser. If UI cannot be verified visually, say so explicitly.

**Gate 5 — Review**
- `requesting-code-review` invoked with the plan, diff, and test results.
- Review feedback addressed via `receiving-code-review`.

**Gate 6 — Completion**
- `verification-before-completion` signs off.
- Only then: mark task done, commit, or report success.

---

## ANTI-PATTERNS (auto-reject)

- "I'll just quickly..." → stop. Run `brainstorming` first.
- "The fix is obvious..." → stop. Run `systematic-debugging` first.
- "Tests will come later..." → stop. Run `test-driven-development` now.
- "It should work..." → stop. Run `verification-before-completion`.
- Claiming a UI feature works without opening it in a browser.
- Marking a task complete with failing tests, type errors, or unverified behavior.
- Installing new dependencies or refactoring beyond what the current task requires.

---

## STACK (this project)

- **Framework**: Next.js (App Router) + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **3D / interactive**: Three.js + React Three Fiber + drei; GSAP / Framer Motion for 2D motion
- **Transitions**: React View Transitions API (see `vercel-react-view-transitions`)
- **Deploy**: Vercel
- **Testing**: Playwright via `webapp-testing`

Adjust only after `brainstorming` output agrees.

---

## HOW TO INVOKE A SKILL

Skills live in `~/.claude/skills/`. Claude Code auto-loads them. Invoke by name when the routing table says so — e.g., "using the `brainstorming` skill, let's explore requirements for the hero section." Do not paraphrase skill instructions; follow them.

If a required skill is missing at runtime, halt and report — do not proceed without it.

---

## SEE ALSO — project conventions and history

Before designing or restyling anything, read these:

- [docs/CONVENTIONS.md](./docs/CONVENTIONS.md) — brand-red color tokens, Instrument Serif typography, liquid-glass utilities, `useBookingDialog` API, `LazyVideo` rule, component organization, and the production-critical don't-touch list. **All new code must follow these.** Drift them and the visual coherence the redesign won starts leaking.
- [docs/sessions/2026-05-02-liquid-glass-redesign.md](./docs/sessions/2026-05-02-liquid-glass-redesign.md) — full architecture decisions and history of the liquid-glass redesign (PRs #9 + #10).

If your task touches color, typography, the booking flow, the marquee, or any v2 component under `components/marketing/v2/`, the conventions doc takes precedence over imitating older v1 components.

## SUB-AGENTS

Project-local agents live in `.claude/agents/`:

- **brand-guardian** — read-only auditor. Run before merging any PR that touches marketing components, booking flow, layout chrome, or design tokens. It diffs the branch against `main`, flags cyan/violet leakage, wrong logo refs, hero email redirects, raw below-fold videos, and CalEmbed regressions, and produces a structured report (no edits, no commits). Invoke via `Agent({ subagent_type: "brand-guardian", prompt: "review PR #N" })` or pass a branch name / commit range.
