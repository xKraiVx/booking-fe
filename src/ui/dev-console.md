# Developer Console

Browser-based CLI for development with database and authentication utilities.

## Quick Start

**Development mode only** - Look for this in your browser console:

```text
🛠️  Developer Console Loaded
Type 'devConsole.help()' to see available commands
```

## Commands

### Help

```js
devConsole.help(); // Show all commands
```

### Database

```js
devConsole.db.list(); // List available seeders
devConsole.db.seed(); // Run all seeders
devConsole.db.seed("user-seeder"); // Run specific seeder
```

### Authentication

```js
devConsole.auth.getState(); // View current auth state
devConsole.auth.spoilToken(); // Invalidate token (test error handling)
```

### Quick Login (password: `123123123aA`)

```js
devConsole.auth.login.asAdmin();
devConsole.auth.login.asManager();
devConsole.auth.login.asReviewer();
```

**Note:** Run `devConsole.db.seed()` first to create test users.

## Security

- Only available in development mode
- Zero production footprint (tree-shaken)
- Dynamic imports ensure no production code leak

---

Happy debugging! 🛠️
