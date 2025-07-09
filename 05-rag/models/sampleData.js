const sampleDocuments = [
    {
        id: "doc1",
        text: "RAG (Retrieval-Augmented Generation) is a technique that combines information retrieval with text generation. It enhances LLM responses by providing relevant context from a knowledge base.",
        metadata: {
            source: "RAG Documentation",
            category: "fundamentals",
        },
    },
    {
        id: "doc2",
        text: "Pinecone is a vector database that enables efficient similarity search. It's commonly used in RAG applications to store and retrieve document embeddings.",
        metadata: {
            source: "Pinecone Documentation",
            category: "tools",
        },
    },
    {
        id: "doc3",
        text: "Google Gemini is a large language model that can perform various tasks including text generation, embedding creation, and understanding complex contexts.",
        metadata: {
            source: "Gemini Documentation",
            category: "tools",
        },
    },
    {
        id: "doc4",
        text: "Vector embeddings are numerical representations of text that capture semantic meaning. They allow us to measure similarity between different pieces of text.",
        metadata: {
            source: "ML Concepts",
            category: "fundamentals",
        },
    },
    {
        id: "doc5",
        text: "Best practices for RAG include: 1) Choose relevant context, 2) Properly chunk documents, 3) Use appropriate embedding models, 4) Design clear prompts.",
        metadata: {
            source: "RAG Best Practices",
            category: "guidelines",
        },
    },
];

module.exports = sampleDocuments; 