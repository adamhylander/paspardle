const fs = require("fs");
const { MongoClient } = require("mongodb");


// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Paca:test123@paspardle.99fhdrk.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

// The database to use
const dbName = "test";
                    
async function run() {
    try {
        const raw = fs.readFileSync("../stader.txt", "utf8");

        console.log('Text from file:', raw);
        const rows = raw.split("\r\n");
        console.log(rows)
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "people"
        const col = db.collection("Stader");
        documents = []
        rows.forEach(row => documents.push({"Stad" : row}))
        // Construct a document 
        console.log(documents)                                                                                                                                                            
        const p = await col.insertMany(documents);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);
        } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}
run().catch(console.dir);

