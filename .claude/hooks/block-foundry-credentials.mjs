import { execFileSync } from "node:child_process";

const fail = (message) => {
  process.stderr.write(`${message}\n`);
  process.exit(2);
};

let hookInput;
try {
  hookInput = JSON.parse(await new Promise((resolve, reject) => {
    let input = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => { input += chunk; });
    process.stdin.on("end", () => resolve(input));
    process.stdin.on("error", reject);
  }));
} catch (error) {
  fail(`Could not read Claude hook input: ${error.message}`);
}

const command = hookInput.tool_input?.command;
if (typeof command !== "string" || !/\bgit(?:\.exe)?\b[^;&|\n]*\bcommit\b/i.test(command)) {
  process.exit(0);
}

const cwd = hookInput.cwd || process.cwd();
let stagedPaths;
try {
  stagedPaths = execFileSync(
    "git",
    ["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"],
    { cwd, encoding: "utf8" },
  ).split("\0").filter(Boolean);
} catch (error) {
  fail(`Could not inspect staged files before commit: ${error.message}`);
}

const assignment = /\b(ANTHROPIC_FOUNDRY_BASE_URL|ANTHROPIC_FOUNDRY_API_KEY)\b["']?\s*[:=]\s*["']?([^\s"'`,;}\\\]]*)/gi;
const isPlaceholder = (value) =>
  !value ||
  /^(?:key|placeholder|your(?:[_-].*)?|replace[_-]?me|change[_-]?me|<[^>]+>|\$\{[^}]+\})$/i.test(value);

for (const path of stagedPaths) {
  let contents;
  try {
    contents = execFileSync("git", ["show", `:${path}`], { cwd, encoding: "utf8" });
  } catch (error) {
    fail(`Could not inspect staged file "${path}": ${error.message}`);
  }

  for (const match of contents.matchAll(assignment)) {
    if (!isPlaceholder(match[2])) {
      fail(
        `Commit blocked: staged file "${path}" sets ${match[1]} to a non-placeholder value. ` +
          "Keep the URL and key in .claude/settings.local.json.",
      );
    }
  }
}
