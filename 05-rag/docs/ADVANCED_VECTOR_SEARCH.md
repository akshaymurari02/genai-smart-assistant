# Advanced Vector Search: HNSW and IVFFlat in pgvector

This document dives deeper into how `pgvector` achieves high-performance searches using Approximate Nearest Neighbor (ANN) indexes and explains the two main types: HNSW and IVFFlat.

## Exact vs. Approximate Search

By default, when you run a similarity query in `pgvector` on a column without a special index, it performs an **Exact Nearest Neighbor (ENN)** search.

- **How it works:** It performs a "brute-force" scan, comparing your query vector to **every single vector** in the table to find the absolute closest matches.
- **Pros:** Guarantees 100% accuracy.
- **Cons:** Extremely slow. The time it takes grows linearly with the number of vectors (O(n) complexity). This is fine for a few thousand vectors but fails for millions.

To solve this, you create an **Approximate Nearest Neighbor (ANN)** index.

- **How it works:** It uses clever algorithms to build a data structure (the index) that allows it to very quickly find vectors that are *probably* the closest matches, without checking every single one.
- **Pros:** Extremely fast searches, even on billions of vectors (often O(log n) complexity).
- **Cons:** It's an "approximation," so it might not return the *absolute* closest neighbor in rare cases. However, the accuracy (recall) is typically very high (e.g., >99%).

---

## 1. HNSW (Hierarchical Navigable Small World)

HNSW is often the recommended starting point for ANN indexing due to its excellent balance of speed and accuracy.

### The Analogy: A Multi-Layered Map

Imagine you're trying to find a specific address in a large country.
- **Without a map (Exact Search):** You'd have to visit every single house.
- **With an HNSW map:** You get a multi-layered map.
    1.  **Layer 0 (Top Layer):** An interstate highway map. It has a few major cities connected by long highways. You start here to quickly get to the right state or region.
    2.  **Layer 1:** A state map. Once in the right state, you use this map to find the right city.
    3.  **Layer 2 (Bottom Layer):** A detailed city street map. You use this for the final navigation to the exact address.

### How HNSW Works

HNSW builds a graph structure with "nodes" (your vectors) and "edges" (connections between them).

1.  **Hierarchy:** It creates multiple layers of these graphs. The top layer is very sparse with long-range connections (the "highways"). Each layer below it becomes progressively denser with shorter-range connections.
2.  **Search Process:** A search starts at a random entry point in the top layer. It greedily navigates the graph, always moving toward the node that is closer to the query vector. Once it can't find a closer node in the current layer, it drops down to the next, denser layer and repeats the process until it reaches the bottom layer, where it performs a fine-grained search to find the nearest neighbors.

### In `pgvector`

```sql
-- Create an HNSW index
-- The CREATE INDEX command will build the index, which can take time.
CREATE INDEX ON items USING hnsw (embedding vector_l2_ops);

-- For Cosine Distance:
-- CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops);
```

- **`m`:** The max number of connections per node (default 16). Higher `m` means a more accurate but larger and slower-to-build index.
- **`ef_construction`:** The size of the candidate list when building the index (default 64). Higher `ef_construction` leads to a better quality index at the cost of build time.

---

## 2. IVFFlat (Inverted File with Flat Compression)

IVFFlat is another popular ANN algorithm that works differently from HNSW.

### The Analogy: A Library

Imagine organizing books in a library.
- **Without organization (Exact Search):** You'd have to look at every book's cover.
- **With an IVFFlat system:**
    1.  **Clustering (Training):** You first decide on the "genres" or sections (e.g., "Sci-Fi," "History," "Cooking"). You create a central point for each section. This is like choosing the main themes for your library.
    2.  **Adding Books:** When a new book comes in, you place it in the section it fits best.
    3.  **Searching:** To find a book about "space travel," you don't search the whole library. You go straight to the "Sci-Fi" section and search only the books there.

### How IVFFlat Works

1.  **Training (Clustering):** It first samples your data to partition the entire set of vectors into a number of "clusters" or "lists." It calculates a central vector (centroid) for each cluster.
2.  **Adding Vectors:** When a new vector is added to the index, it's assigned to the closest cluster.
3.  **Search Process:** When you provide a query vector, the index first finds the closest cluster centroids. It then performs an exhaustive, brute-force search *only* on the vectors within those few selected clusters, completely ignoring the rest of the database.

### In `pgvector`

```sql
-- Create an IVFFlat index
-- It requires a certain number of records in the table to train on.
CREATE INDEX ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);

-- For Cosine Distance:
-- CREATE INDEX ON items USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
```

- **`lists`:** The number of clusters to create. A good starting point is `number_of_rows / 1000` for up to 1M rows, and `sqrt(number_of_rows)` for over 1M rows.
- **`probes`:** At query time, this determines how many clusters to search. The default is 1. You can set it for a specific query for higher accuracy at the cost of speed: `SET ivfflat.probes = 10;`

## HNSW vs. IVFFlat: Which to Choose?

| Feature             | HNSW                                       | IVFFlat                                                              |
| ------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| **Build Time**      | Slower, as it builds a complex graph.      | Faster, as it's a simpler clustering process.                        |
| **Memory Usage**    | Generally higher.                          | Generally lower.                                                     |
| **Query Speed**     | Very fast.                                 | Fast, but highly dependent on the `probes` parameter.                |
| **Recall/Accuracy** | Excellent, often better out-of-the-box.    | Good, but requires tuning `lists` and `probes` to get the best recall. |
| **Updates**         | Adding new data is straightforward.        | Adding new data is straightforward. Re-training is needed if data distribution changes significantly. |
| **Recommendation**  | **Start with HNSW.** It generally provides the best balance of performance and accuracy with less tuning. | Use IVFFlat for very large datasets where build time or memory usage for HNSW is a concern. |
