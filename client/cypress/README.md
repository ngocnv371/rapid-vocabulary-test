# Cypress E2E Tests

This directory contains end-to-end tests for the Rapid Vocabulary Test application.

## Running Tests

### Interactive Mode (Cypress UI)
```bash
npm run cypress:open
```

### Headless Mode (CI/CD)
```bash
npm run test:e2e
```

### Headless with Browser Visible
```bash
npm run test:e2e:headed
```

## Test Structure

- `cypress/e2e/` - E2E test files
  - `navigation.cy.ts` - Tests for page navigation
  - `login.cy.ts` - Authentication flow tests
  - `quiz.cy.ts` - Quiz functionality tests
  - `profile.cy.ts` - User profile tests
  - `leaderboard.cy.ts` - Leaderboard tests
  - `shop.cy.ts` - Shop and credits tests

- `cypress/support/` - Support files and custom commands
  - `e2e.ts` - E2E support file
  - `commands.ts` - Custom Cypress commands
  - `component.ts` - Component testing support

- `cypress/fixtures/` - Test data files

## Custom Commands

### cy.login(email, password)
Logs in a user with the provided credentials.

```typescript
cy.login('user@example.com', 'password123');
```

### cy.shouldBeOnPage(path)
Verifies the current URL includes the specified path.

```typescript
cy.shouldBeOnPage('/quiz');
```

## Writing Tests

When writing new tests:

1. Use descriptive test names
2. Add data-testid attributes to components for easier selection
3. Keep tests independent and isolated
4. Use custom commands for common operations
5. Mock external API calls when appropriate

## Best Practices

- Run `npm run dev` in a separate terminal before running Cypress tests
- The app should be available at `http://localhost:3000`
- Use fixtures for test data
- Keep tests focused and atomic
- Use beforeEach for common setup

## Configuration

Cypress configuration is in `cypress.config.ts`. Key settings:

- Base URL: `http://localhost:3000`
- Viewport: 375x667 (mobile size)
- Video recording: Disabled (enable for CI/CD)
- Screenshots on failure: Enabled
