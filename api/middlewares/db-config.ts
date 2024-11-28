import { MongoClient, ServerApiVersion } from "mongodb";

/**
 * Db connection Configuration
 */
const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

client.connect()
.then((client) => client.db("admin").command({ ping: 1 }))
.then(() => console.log("Pinged your deployment, You successfully connected to mongodb at url => " + uri))
.catch((e) => console.error("Error connecting to mongodb", e));

module.exports = client;