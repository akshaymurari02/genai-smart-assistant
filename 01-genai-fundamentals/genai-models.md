# 🤖 Generative AI (GenAI) Models & Concepts

This document summarizes the most important concepts and models used in Generative AI.

---

## 🧠 What is Generative AI?

**Generative AI (GenAI)** refers to machine learning models that generate content — such as:

- 📝 Text (emails, articles, summaries)
- 💬 Conversations (chatbots)
- 🎨 Images (from text prompts)
- 🎵 Audio/music
- 🎥 Video

These models learn patterns from large datasets and generate outputs that mimic human-like understanding.

---

## 📦 Popular GenAI Models

### 🔹 OpenAI

| Model       | Description                          |
|-------------|--------------------------------------|
| GPT-3.5     | Fast and affordable LLM for chat and text |
| GPT-4       | More powerful, deeper reasoning, vision (Pro users) |
| GPT-4o      | Multimodal (text, image, audio), faster and cheaper than GPT-4 |
| DALL·E      | Text-to-image generation |
| Whisper     | Audio to text (speech-to-text) |

### 🔹 Anthropic

| Model     | Description                                  |
|-----------|----------------------------------------------|
| Claude 2  | Chat-oriented model with long context window |
| Claude 3  | Strong GPT-4 competitor, great for Q&A, summarization |

### 🔹 Google DeepMind

| Model      | Description                          |
|------------|--------------------------------------|
| Gemini 1.5 | Multimodal model (text, image, code), very large context window |

### 🔹 Meta

| Model     | Description                                      |
|-----------|--------------------------------------------------|
| LLaMA 2   | Open-source model family for text generation     |
| LLaMA 3   | Latest generation, more accurate and efficient   |

### 🔹 Mistral AI

| Model       | Description                            |
|-------------|----------------------------------------|
| Mistral 7B  | Lightweight open-source LLM (7B params) |
| Mixtral     | Mixture-of-experts model, fast and high-quality |

---

## 🔍 Key GenAI Concepts

| Term              | Meaning |
|-------------------|--------|
| **Prompt**        | Instruction given to the model |
| **Completion**    | The response/output generated |
| **Temperature**   | Controls randomness in responses (0 = deterministic) |
| **Max Tokens**    | Limits the length of the output |
| **Context Window**| Number of tokens model can remember in one request |
| **Embedding**     | Vector representation of text (used for similarity search) |
| **RAG**           | Retrieval-Augmented Generation (LLM + knowledge base) |

---

## 🔧 How GenAI Is Used in Apps

- **Prompt → Response**: Core pattern using OpenAI API or similar
- **Streaming Responses**: Show output token-by-token (like typing)
- **Function Calling / Tool Use**: LLM triggers external tools (advanced)
- **Embeddings + Vector DBs**: Power search/chat with your own data
- **Agent Systems**: Combine reasoning, memory, and actions (e.g., LangChain)

---

## 📚 Good APIs to Start With

| Provider  | API Docs |
|-----------|----------|
| OpenAI    | [platform.openai.com/docs](https://platform.openai.com/docs) |
| Anthropic| [docs.anthropic.com](https://docs.anthropic.com/) |
| Google Gemini | [ai.google.dev](https://ai.google.dev/) |
| Hugging Face | [huggingface.co](https://huggingface.co/docs) |

---

## ✅ Suggested First Experiments

- [ ] Use OpenAI’s ChatCompletion API to make a chatbot
- [ ] Try different prompts and temperatures
- [ ] Generate image from text using DALL·E
- [ ] Use embeddings to build simple similarity search

---

explore tools lovable, google ai studio