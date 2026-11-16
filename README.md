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

Deloitte provides the workshop API URL and key. You do not need a personal API key, billing setup or Claude subscription.

From the repository root:

```powershell
New-Item -ItemType Directory -Force .claude | Out-Null
code .claude\settings.local.json
```



In `.claude/settings.local.json`, set both `ANTHROPIC_FOUNDRY_BASE_URL` and
`ANTHROPIC_FOUNDRY_API_KEY` under `env`, using the URL and key provided by Deloitte. If you need
to create the file, use this structure and replace the empty values:

```json
{
  "env": {
    "ANTHROPIC_FOUNDRY_BASE_URL": "",
    "ANTHROPIC_FOUNDRY_API_KEY": "",
    "ANTHROPIC_MODEL": "claude-sonnet-5-5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-5-5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-5-5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-5-5",
    "DISABLE_NON_ESSENTIAL_MODEL_CALLS": "1",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_USE_FOUNDRY": "1"
  }
}
```

If the file already has an `env` object, add or update those entries there. Never put the URL or key
in `.claude/settings.json`.

Start `claude` from the repository root, run `/status` to confirm it is connected, then run
`/setup-matt-pocock-skills` once.

> **Keep the URL and key only in `.claude/settings.local.json`**, which is excluded from Git.
> The Claude hook in `.claude/settings.json` blocks Claude Code commits if staged files contain
> non-placeholder values for either variable. It does not guard commits made outside Claude Code.
> Do not share the key. Report a leak to the Deloitte facilitators immediately.

## Repository layout

- `apps/frontend`: frontend (Next.js), created during the workshop.
- `apps/backend`: backend (NestJS), created during the workshop.
- `docs`: the agreed specification.
- `data`: the original CSV files for your chosen assignment. Kept out of Git.
- `CLAUDE.md`: instructions that Claude Code reads automatically.
# ai-class
