// Import the Pinecone library
const { Pinecone } =  require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECODE_API_KEY });

const cohortChatgptIndex = pc.Index('cohort-chatgpt')


async function createMemory({vector, metadata, messageId}){
    await cohortChatgptIndex.upsert([{
        id:messageId,
        values:vector,
        metadata
    }])
}


async function queryMemory({ queryVector, limit=5, metadata}){
    const data = await cohortChatgptIndex.query({
        vector: queryVector,
        topK: limit,
        filter: metadata ? { metadata} : undefined,
        includeMetadata: true
    })

    return data.matches
}


module.exports = {
    createMemory,
    queryMemory
}