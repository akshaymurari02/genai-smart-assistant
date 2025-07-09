# RAG Fundamentals API

A Node.js Express API demonstrating Retrieval-Augmented Generation (RAG) using Google Gemini and Pinecone.

## Project Structure

```
.
├── config/
│   └── index.js         # Configuration and environment setup
├── models/
│   └── sampleData.js    # Sample documents data
├── services/
│   ├── embeddingService.js  # Embedding generation logic
│   ├── pineconeService.js   # Pinecone operations
│   └── generationService.js # Text generation with Gemini
├── routes/
│   └── ragRoutes.js     # RAG-specific routes
├── controllers/
│   └── ragController.js # Route handlers
└── index.js             # Main application file
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
PORT=3000
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=your_index_name
GOOGLE_API_KEY=your_google_api_key
```

Note: Make sure your Pinecone index is created with 512 dimensions.

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

1. Health Check
```bash
curl http://localhost:3000/health
```

2. Populate Sample Data
```bash
curl -X POST http://localhost:3000/rag/populate
```

3. Query RAG System
```bash
curl -X POST http://localhost:3000/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is RAG and how does it enhance LLM responses?"}'
```

## Architecture

1. **Embedding Generation**: Uses Google Gemini's embedding model to convert text into vector representations.

2. **Vector Storage**: Uses Pinecone to store and retrieve document embeddings efficiently.

3. **Text Generation**: Uses Google Gemini to generate responses based on retrieved context.

4. **RAG Flow**:
   - Generate embeddings for user query
   - Find similar documents in Pinecone
   - Use retrieved documents as context for Gemini
   - Generate and return response with sources

## Error Handling

The API includes comprehensive error handling:
- Input validation
- API errors (Gemini, Pinecone)
- Invalid embedding formats
- Server errors

## Development

To add new features:
1. Create new service in `/services` if needed
2. Add routes in `/routes`
3. Implement controllers in `/controllers`
4. Update configuration in `/config` if required 