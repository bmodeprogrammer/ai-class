# ISEP x Deloitte: Building Software with AI Agents

Starter workspace for the workshop. You will build a small analytics dashboard with Claude Code,
following a spec-driven workflow. Follow the guide `ISEP_Deloitte_practice_class.html` for the full session.

## What to install before the session

| Tool | Version | Why |
| --- | --- | --- |
| [VS Code](https://code.visualstudio.com/) | latest | Editor and integrated terminal |
| [Git](https://git-scm.com/downloads) | latest | Version control and team repository |
| [Node.js](https://nodejs.org/) (includes npm) | 24 LTS or newer | Runs the Next.js frontend and NestJS API |
| [Claude Code CLI](https://code.claude.com/docs/en/setup) | latest | The AI coding agent, run in the VS Code terminal |

You also need a **GitHub account**. Docker is **not** required. Full Visual Studio is not required.
The Claude Code VS Code extension is optional.

### Install Claude Code

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

macOS / Linux:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Review any installer script according to your organization's policy, then open a new terminal.

### Check everything is installed

```powershell
node --version
npm --version
git --version
claude --version
```

All four commands must print a version. Node must be 24 or newer.

### Install Matt Pocock's skills

Install the official Claude Code plugin:

```bash
claude plugin install mattpocock-skills@claude-plugins-official
```

The plugin updates itself. After connecting Claude Code to the workshop API below, run
`/setup-matt-pocock-skills` once from the repository root to configure the skills for this repo.
See the [official skills repository](https://github.com/mattpocock/skills) for details.

## Connect Claude Code to the workshop API

Deloitte provides an API key for the workshop. You do not need a personal API key, billing setup or Claude subscription.

From the repository root:

```powershell
New-Item -ItemType Directory -Force .claude | Out-Null
Copy-Item settings.json .claude\settings.local.json
code .claude\settings.local.json
```

(macOS / Linux: `mkdir -p .claude && cp settings.json .claude/settings.local.json`)

In `.claude/settings.local.json`, replace `Key` in `ANTHROPIC_FOUNDRY_API_KEY` with the key you received, then save.
Start `claude` from the repository root, run `/status` to confirm it is connected, then run
`/setup-matt-pocock-skills` once.

> **Never put the key in `settings.json`.** That file is committed and this repository is public.
> The key belongs only in `.claude/settings.local.json`, which is excluded from Git.
> Do not share the key. Report a leak to the Deloitte facilitators immediately.

## Repository layout

- `apps/web`: frontend (Next.js), created during the workshop.
- `apps/api`: backend (NestJS), created during the workshop.
- `docs`: the agreed specification.
- `data`: the original CSV files for your chosen assignment. Kept out of Git.
- `CLAUDE.md`: instructions that Claude Code reads automatically.
# ai-class
