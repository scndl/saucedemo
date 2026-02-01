## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Page Object Model](#page-object-model)
- [Code Quality](#code-quality)
- [Coding Standards](#coding-standards)

## Features

- **TypeScript** - Full type safety with strict mode enabled
- **Page Object Model** - Maintainable and scalable test architecture for Saucedemo
- **Fixture-based Architecture** - Reusable test components with dependency injection
- **Multi-browser Support** - Chrome, Firefox, and WebKit configurations
- **Authentication Handling** - Pre-configured storage state for authenticated Saucedemo tests
- **Code Quality** - ESLint + Prettier + Husky pre-commit hooks
- **Parallel Execution** - Fast test runs with configurable workers
- **Comprehensive Reporting** - HTML reports with traces, screenshots, and videos

## Prerequisites

- **Node.js** v20.x or later
- **npm** v10.x or later

## Installation

1. **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd playwright-scaffold
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Install Playwright browsers:**

    ```bash
    npx playwright install
    ```

## Project Structure

```
root/
├── config/                    # Application configuration
│   ├── app.ts                 # Saucedemo-specific config
│   └── util/                  # Utility configurations
│       └── util.ts
│
├── enums/                     # Constants and enumerations
│   ├── app/                   # Saucedemo enums
│   │   ├── app.ts
│   │   └── saucedemo.ts       # Saucedemo user roles & credentials
│   └── util/                  # Shared enums
│       └── roles.ts
│
├── env/                       # Environment configuration
│   ├── .env.example           # Template for environment variables
│   └── .env.saucedemo         # Saucedemo configuration
│
├── fixtures/                  # Playwright test fixtures
│   └── pom/                   # Page Object fixtures
│       ├── page-object-fixture.ts  # Saucedemo page objects
│       └── test-options.ts         # Merged test fixtures (use this)
│
├── helpers/                   # Helper functions
│   ├── app/                   # Saucedemo helpers
│   │   └── createStorageState.ts
│   └── util/                  # Utility functions
│       └── util.ts
│
├── pages/                     # Page Object Model classes
│   └── app/                   # Saucedemo pages
│       └── saucedemo/         # Saucedemo page objects
│           ├── login.page.ts
│           ├── products.page.ts
│           ├── cart.page.ts
│           ├── checkout.page.ts
│           └── product-detail.page.ts
│
├── test-data/                 # Test data files
│   └── app/                   # Saucedemo test data
│       ├── invalidCredentials.json
│       └── saucedemo-checkout.json
│
├── tests/                     # Test specifications
│   ├── seed.spec.ts           # Setup tests
│   └── app/                   # Saucedemo tests
│       ├── auth.setup.ts      # Authentication setup
│       └── functional/        # Functional tests
│           └── saucedemo/
│               └── complete-checkout.spec.ts
│
├── .gitignore
├── .prettierrc                # Prettier configuration
├── eslint.config.mts          # ESLint configuration (flat config)
├── package.json
├── playwright.config.ts       # Playwright configuration
├── README.md
└── tsconfig.json              # TypeScript configuration
```

## Configuration

### Playwright Configuration

The `playwright.config.ts` file contains all test runner settings:

| Setting            | Local                   | CI                |
| ------------------ | ----------------------- | ----------------- |
| Parallel execution | Enabled                 | Enabled           |
| Workers            | Auto                    | 1                 |
| Retries            | 0                       | 2                 |
| Reporter           | HTML (opens on failure) | Blob + HTML       |
| Traces             | On first retry          | On first retry    |
| Screenshots        | On failure              | On failure        |
| Videos             | Retain on failure       | Retain on failure |

### Browser Projects

| Project    | Description             | Dependencies |
| ---------- | ----------------------- | ------------ |
| `setup`    | Authentication setup    | None         |
| `saucedemo-chromium` | Saucedemo on Chrome | `setup`      |
| `saucedemo-firefox`  | Saucedemo on Firefox | `setup`      |
| `saucedemo-webkit`   | Saucedemo on Safari  | `setup`      |

### Timeouts

| Timeout            | Value      |
| ------------------ | ---------- |
| Test timeout       | 60 seconds |
| Action timeout     | 10 seconds |
| Navigation timeout | 30 seconds |
| Expect timeout     | 10 seconds |

## Running Tests

### Basic Commands

```bash
# Run all Saucedemo tests
npm test

# Run tests on specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run in headed mode (see browser)
npm run test:headed

# Run in debug mode (Playwright Inspector)
npm run test:debug

# Run with UI mode (interactive)
npm run test:ui
```

### Test Tags

Tests are tagged for selective execution:

```bash
# Run smoke tests
npm run test:smoke

# Run functional tests only
npm run test:functional

# Run e2e tests only
npm run test:e2e
```

### CI Mode

Optimized for CI environments with single worker and blob reports:

```bash
npm run test:ci
```

### View Reports

```bash
npm run report
```

## Code Quality

### Linting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Formatting

```bash
npm run format
```

### Pre-commit Hooks

Husky automatically runs on staged files before each commit:

- ESLint with auto-fix
- Prettier formatting

