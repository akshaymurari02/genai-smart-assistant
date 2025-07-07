# Test Plan: Prompting & Structured Output

## ✅ Cases to Try

- [ ] Long article summarization → check if output format is stable
- [ ] Keyword extraction from blog and product reviews
- [ ] Return data in Markdown table from messy input
- [ ] Use sentiment + intent classification
- [ ] Use [TEXT] placeholder in all prompts

## ⚠️ Edge Cases

- [ ] Ambiguous input with mixed languages
- [ ] Missing fields in output
- [ ] LLM hallucination of structure

## 🔍 Things to Observe

- Does Gemini always return clean JSON?
- When does it break the format?
- Should you use validation in backend?
