# Launchpad

A small task board for the n8n coding agent demo. Add tasks. Mark tasks as done. Filter or delete tasks. The app saves tasks in browser storage.

The app uses JavaScript, CSS, and Vite. It has no backend, database, API keys, or sign-in flow.

## Run the app

Use Node.js 22.12 or later and pnpm 12.4.2.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. Vite serves the app on all network interfaces. File changes reload the app.

## Coding agent settings

| Setting | Value |
| --- | --- |
| Repository URL | `https://github.com/bjorger/n8n-coding-agent-demo.git` |
| Branch | `main` |
| Setup command | `pnpm install --frozen-lockfile` |
| Run command | `pnpm dev` |
| Check command | `pnpm check` |
| Port | `3000` |

The sandbox must have pnpm. The coding demo can install pnpm before it runs the setup command. The app uses the host allowance that the coding demo sets for its signed preview URL.

Select **Prepare repository**. Wait for setup to finish. Select **Run app**. Select **Open app** to test the app.

## Try these requests

- "Change the heading to 'Ship your next idea' and use a blue accent."
- "Add a dark mode toggle. Keep the choice after a page reload."
- "Let me edit a task title."
- "Add a search field above the task list."
- "Add a button that removes all completed tasks."
- "Run the checks and show the diff."
- "Undo the changes to the stylesheet."

Use the Files and Changes tabs to inspect the result. Commit and push changes only when you want to keep them.

## Files

- `index.html` defines the page and task template.
- `src/main.js` handles tasks, filters, and browser storage.
- `src/styles.css` defines the page style.
- `vite.config.js` sets the preview port.

## Check the app

```bash
pnpm check
```

This command checks JavaScript syntax and builds the app. This repository is a demo. It has no test suite.
