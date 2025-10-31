# Contributing to JWT Email Verifier

Thank you for your interest in contributing to `jwt-email-verifier`! We appreciate your time and effort to help make this library better. 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Documentation Guidelines](#documentation-guidelines)

---

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

---

## 🤝 How Can I Contribute?

### Reporting Bugs 🐛

Before submitting a bug report:
1. **Check existing issues** to avoid duplicates
2. **Use the latest version** of the library
3. **Collect information** about your environment

When filing a bug report, include:
- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Code samples** or error messages
- **Environment details** (Node.js version, OS, etc.)

### Suggesting Features 💡

We welcome feature suggestions! Please:
1. **Check the roadmap** in README.md to see if it's already planned
2. **Open an issue** with the `enhancement` label
3. **Explain the use case** and why it would benefit users
4. **Provide examples** of how the feature would work

### Good First Issues 🌟

Look for issues labeled `good first issue` - these are great for newcomers and typically include:
- Clear requirements
- Smaller scope
- Helpful context and guidance

---

## 🛠️ Development Setup

### Prerequisites

- **Node.js** >= 14.0.0
- **npm** or **yarn**
- **Git**

### Setup Steps

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/JWT-Email-Verifier.git
   cd JWT-Email-Verifier
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/mmsalmanfaris/JWT-Email-Verifier.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Create a `.env` file** for local testing:
   ```bash
    JWT_SECRET=your_super_secret_key_min_32_characters
    JWT_EXPIRATION=10m

    BASE_URL=http://localhost:3000

    SMTP_HOST=mail.example.com
    SMTP_PORT=465
    SMTP_SECURE=true
    SMTP_USER=noreply@example.com
    SMTP_PASS=your_email_password
   ```

6. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Running the Development Server

```bash
# Run the test server
npm run server

# Run usage examples
npm run usage
```

---

## 📝 Coding Standards

### Code Style

- **ES6+ syntax** - Use modern JavaScript features
- **ESM imports** - Use `import/export` instead of `require`
- **Async/await** - Prefer over callbacks or raw promises
- **Descriptive names** - Use clear, self-documenting variable/function names
- **No console.log** - Use proper error handling instead (except in dev scripts)

### File Structure

```
src/
├── config.js          # Configuration management
├── index.js           # Main exports
├── mailer.js          # Email sending logic
├── token.js           # JWT token operations
├── templates/         # Email templates
│   ├── verification.html
│   └── verification.txt
└── utils/             # Utility functions
    └── validator.js
```

### Best Practices

1. **Error Handling**
   ```javascript
   // ✅ Good - Throw descriptive errors
   if (!email) {
       throw new Error('Email is required for verification');
   }
   
   // ❌ Bad - Generic errors
   throw new Error('Invalid input');
   ```

2. **Function Design**
   ```javascript
   // ✅ Good - Single responsibility, clear purpose
   export function generateToken(email) {
       // Only generates token
   }
   
   // ❌ Bad - Does too many things
   export function handleEmail(email) {
       // Validates, generates token, sends email, logs...
   }
   ```

3. **Configuration**
   ```javascript
   // ✅ Good - Use config module
   import config from './config.js';
   const secret = config.jwtSecret;
   
   // ❌ Bad - Direct env access everywhere
   const secret = process.env.JWT_SECRET;
   ```

4. **Avoid Side Effects**
   ```javascript
   // ✅ Good - Pure function
   export function formatEmail(email) {
       return email.toLowerCase().trim();
   }
   
   // ❌ Bad - Modifies global state
   let globalEmail;
   export function formatEmail(email) {
       globalEmail = email.toLowerCase();
   }
   ```

---

## 💬 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates
- `ci`: CI/CD configuration changes

### Examples

```bash
# Feature
feat(mailer): add support for custom email templates

# Bug fix
fix(token): resolve JWT expiration validation issue

# Documentation
docs(readme): update installation instructions

# Refactoring
refactor(config): simplify environment variable parsing

```

---

## 🔄 Pull Request Process

### Before Submitting

1. **Update your fork**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests** (when available):
   ```bash
   npm test
   ```

3. **Check code style**:
   ```bash
   npm run lint  # (when configured)
   ```

4. **Update documentation** if needed

### Submitting the PR

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub with:
   - **Clear title** following commit conventions
   - **Description** explaining what and why
   - **Related issues** (e.g., "Closes #123")
   - **Screenshots** if UI-related
   - **Breaking changes** clearly marked

3. **PR Template** (use this format):
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   How was this tested?
   
   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   - [ ] Tests added/updated (if applicable)
   ```

### Review Process

- Maintainers will review your PR within **3-5 business days**
- Address feedback by pushing new commits to your branch
- Once approved, maintainers will merge your PR
- Your contribution will be credited in release notes! 🎉

---

## 🧪 Testing Requirements

### Current State

Tests are not yet implemented but will be added soon using Jest or Vitest.

### Future Testing Guidelines

When tests are available:

1. **Unit Tests** - Test individual functions in isolation
2. **Integration Tests** - Test email sending and token verification flow
3. **Coverage** - Aim for >80% code coverage
4. **Mock External Services** - Don't send real emails in tests


---

## 📚 Documentation Guidelines

### Code Comments

- **Inline comments** for complex logic:
  ```javascript
  // Parse boolean with fallback since env vars are strings
  const secure = parseBoolean(process.env.SMTP_SECURE, port === 465);
  ```

### README Updates

When adding features:
1. Update the **Features** section
2. Add **Usage examples**
3. Update **API Reference**
4. Add to **Roadmap** if partially complete


## 🏆 Recognition

Contributors will be:
- Listed in the **Contributors** section (to be added)
- Mentioned in **release notes**
- Credited in the **package.json** contributors field

---

## ❓ Questions?

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: Contact maintainers for sensitive issues

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to JWT Email Verifier! 🚀**