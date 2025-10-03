// Import the Pinecone library lazily to avoid throwing at module load time
let PineconeClient = null;
function getPineconeClient() {
  if (PineconeClient) return PineconeClient;
  const { Pinecone } = require('@pinecone-database/pinecone');
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    // Return null client; functions will throw with clear message when used
    return null;
  }
  PineconeClient = new Pinecone({ apiKey });
  return PineconeClient;
}

function getIndex() {
  const client = getPineconeClient();
  if (!client) return null;
  return client.Index('cohort-chat-gpt');
}

async function createMemory({ vector, metadata, messageId }) {
  const idx = getIndex();
  if (!idx) throw new Error('PINECONE_API_KEY is not set. createMemory cannot run.');
  await idx.upsert([
    {
      id: messageId,
      values: vector,
      metadata,
    },
  ]);
  console.log('✅ Pinecone upserted memory:', metadata);
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
  const idx = getIndex();
  if (!idx) throw new Error('PINECONE_API_KEY is not set. queryMemory cannot run.');
  const data = await idx.query({
    vector: queryVector,
    topK: limit,
    filter: metadata && Object.keys(metadata).length > 0 ? metadata : undefined,
    includeMetadata: true,
  });
  return data.matches;
}

async function deleteUserFromPinecone(userId) {
  const idx = getIndex();
  if (!idx) return console.warn('PINECONE_API_KEY not set; skipping deleteUserFromPinecone');
  try {
    await idx.deleteAll({ namespace: userId.toString() });
    console.log(`✅ Deleted Pinecone data for user: ${userId}`);
  } catch (err) {
    console.error('❌ Error deleting Pinecone data:', err);
  }
}

module.exports = {
  createMemory,
  queryMemory,
  deleteUserFromPinecone,
};