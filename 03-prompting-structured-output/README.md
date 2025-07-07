# 03 - Prompting & Structured Output

This module focuses on:
- Writing effective prompts to get clean, structured outputs from LLMs
- Reusing prompt templates for consistent behavior
- Returning formats like:
  - ✅ JSON
  - ✅ Bullet lists
  - ✅ Markdown tables

## 📦 What's Inside

| Folder/File          | Purpose                                  |
|----------------------|------------------------------------------|
| `prompts/`           | Prompt templates (with `[TEXT]` placeholder) |
| `examples/`          | Input texts and expected output examples |
| `structured-runner.js` | Node.js runner to load prompt + input and send to Gemini |
| `test-plan.md`       | Experiments to try (successes + failures) |

## ✅ How to Use

```bash
node structured-runner.js prompts/summarize-in-json.txt examples/input-article.txt
