# 🤖 04-chats-vs-generateContent

This module demonstrates the difference between:

- `ai.models.generateContent()` → Single-turn stateless interactions
- `ai.chats.create()` → Multi-turn chat with memory/context

---

## 📌 Summary

| Feature               | generateContent                | chats.create                 |
|----------------------|---------------------------------|------------------------------|
| Use Case             | Summarize, translate, generate | Chatbot, agent, Q&A          |
| Context Memory       | ❌ Stateless                    | ✅ Remembers conversation     |
| Code Style           | Pass full prompt                | Send message incrementally   |

---

## 🧪 Examples

### ✅ Single Turn Prompt

- File: `examples/single-turn-prompt.txt`
- Output: `output-generateContent.txt`

### ✅ Multi-Turn Chat

- File: `examples/multi-turn-chat.txt`
- Output: `output-chat.txt`

---

## 🚀 How to Run

```bash
# Run single turn
node generateContent-demo.js examples/single-turn-prompt.txt

# Run multi-turn chat
node chat-demo.js multi-turn-chat.txt
