import mongoose from "mongoose";

/**
 * Db connection Configuration
 */

/**
 * Mongo connection with native driver
 */
const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017';
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// });

// client.connect()
// .then((client) => client.db("admin").command({ ping: 1 }))
// .then(() => console.log("Pinged your deployment, You successfully connected to mongodb at url => " + uri))
// .catch((e) => console.error("Error connecting to mongodb", e));

// module.exports = client;

/**
 * Mongo connection with mongoose
 */
const initConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(uri, {
            dbName: 'pft-db',
            user: process.env.DB_USER || 'root',
            pass: process.env.DB_PWD || 'password',
            autoIndex: true,
            autoCreate: true,
            sanitizeFilter: true,
        });
        console.info('You successfully connected to mongodb at url => ' + uri)
    } catch (e) {
        console.error('Error connecting to mongodb', e)
    }
}

initConnection();

export default mongoose;