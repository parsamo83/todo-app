# Habits

A private habit and todo tracker. Schedule tasks by weekday, check them off each day, and
see your progress by week, month and year. One HTML file, **zero dependencies**, no accounts,
no build step. Your data stays in your browser.

Built with vanilla HTML, CSS and JavaScript.

<!-- Add a screenshot here: ![Habits screenshot](docs/screenshot.png) -->

## Features

- **Weekday scheduling.** Each task runs on the days you choose, with an optional time
  window (e.g. 07:00–09:00).
- **Smart ordering.** Today's list sorts itself: due now, upcoming, anytime, then window passed.
- **Four views.** Today, Week (task × day grid with a recap), Month (calendar shaded by
  completion) and Year (day-per-square heatmap, monthly completion, best streaks).
- **Fair completion rates.** Only scheduled days count, so a Mon/Wed/Fri task isn't
  penalised for Tuesdays. Extra check-ins on unscheduled days are credited but never push a
  rate above 100%.
- **Light and dark themes.**
- **Keyboard-driven.** `1`–`9` check off items, `T` `W` `M` `Y` switch views, `N` adds a task.
- **Backups.** Export and import your data as JSON.
- **Accessible controls.** Check buttons expose `aria-pressed` and descriptive labels.

## Quick start

You need nothing but a browser. Pick one:

**Option 1: open the file.** Double-click `index.html`.

**Option 2: local server (recommended).**

```bash
npm start
# or: node server.js
```

Then open <http://localhost:4321>. On Windows you can double-click `Start Habits.cmd`
instead. Set a different port with the `PORT` environment variable.

Why a server for a static page? Browsers treat `file://` pages as one shared, easily wiped
storage area, whereas a stable `http://localhost` origin keeps `localStorage` far more
reliably. The server is optional and the app works without it.

## How it works

- **No framework.** `index.html` holds the markup, styles and logic. State is one plain
  object, and each view is rendered from it as an HTML string. User-entered text is escaped
  before it reaches `innerHTML`.
- **Persistence.** State is saved to `localStorage` under a single key (the `KEY` constant at
  the top of the script). Defaults are merged on load, so older saved data keeps working as
  fields are added.
- **Theming.** Colours are CSS custom properties in `:root`, with light and dark sets.
- **Server.** `server.js` is a ~30-line static file server using only Node's built-in
  modules. It binds to `127.0.0.1` only, resolves every request path and refuses anything
  outside the project folder, and never serves dotfiles such as `.git`.

## Data and backups

Everything lives in your browser's local storage for this site, so **clearing browsing data
erases it**. Archiving a task keeps its history; deleting one removes it for good.

Tasks → *Export backup* writes a `.json` file you can keep anywhere, and *Import backup*
restores it. Worth doing every month or two.

## Project structure

```
index.html        the whole app (markup, styles, logic)
server.js         optional zero-dependency static server
Start Habits.cmd  Windows launcher
package.json      npm start script and metadata
```

## License

[MIT](LICENSE)
