# GitHub Activity CLI

A simple CLI tool built with Node.js and TypeScript to fetch and display recent public activity of any GitHub user.

## 🚀 Features

- ✅ Fetch recent public events of a GitHub user
- ✅ Filter by event type (e.g., `PushEvent`, `IssuesEvent`, etc.)
- ✅ Pretty formatted and colorized output
- ✅ Output to file (e.g., `activity.txt`)
- ✅ Interactive mode when no arguments are provided

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/YounesWagih/github-activity-cli.git
cd github-activity-cli
```

2. Install dependencies:

```bash
npm install
```

3. Run using tsx (or compile first):

```bash
npx tsx src/index.ts <username> [options]
```

> Or compile it:
```bash
npx tsc
node dist/index.js <username> [options]
```

---

## 🧑‍💻 Usage

### CLI Mode

```bash
npx tsx src/index.ts <username> [--type <eventType>] [--output <filename>]
```

### Examples

```bash
# Basic usage
npx tsx src/index.ts YounisWagih

# Filter by event type
npx tsx src/index.ts YounisWagih --type PushEvent

# Output to file
npx tsx src/index.ts YounisWagih --output activity.txt

# Combine options
npx tsx src/index.ts YounisWagih --type WatchEvent --output watch.txt
```

### Interactive Mode

If you run the command with no arguments:

```bash
npx tsx src/index.ts
```

You will be prompted to enter:
- GitHub username
- Optional event type
- Whether to output to file

---

## 📁 Project Structure

```
src/
├── fetchGitHubData.ts     // Fetches data from GitHub API
├── formatOutput.ts        // Formats the output nicely
├── index.ts               // Entry point
├── parseArgs.ts           // Handles CLI and interactive input
├── writeToFile.ts         // Handles saving output to file
```

---

## 🔧 Built With

- Node.js
- TypeScript
- GitHub REST API v3
- Native Node modules only (no HTTP libraries)

---

## 💡 Ideas for Extension

- Cache responses locally
- Add GitHub token support to avoid rate limiting
- Format output as JSON or Markdown

---

###### Challenge from [roadmap.sh](https://roadmap.sh/projects/github-user-activity)