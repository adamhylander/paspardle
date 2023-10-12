const fs = require("fs");
const { MongoClient } = require("mongodb");


// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Paca:test123@paspardle.99fhdrk.mongodb.net/?"
const client = new MongoClient(url);

// The database to use
const dbName = "Paspardle";
                    
async function run() {
    try {
        const raw = fs.readFileSync("../pasparet.txt", "utf8");

        console.log('Text from file:', raw);
        const rows = raw.split("\r\n");
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection("Pasparet");
        documents = []
        for (let row of rows){
            console.log(row)
            const columns = row.split("|");
            console.log(columns);
            document = {
                "Stad": columns[0],
                "År": columns[1],
                "Q1": columns[2],
                "Q2": columns[3],
                "Q3": columns[4],
                "Q4": columns[5],
                "Q5": columns[6]
              }
            documents.push(document);
        }   
        
        // Construct a document 
        const p = await col.insertMany(documents);
        // Find one document
        // Print to the console
        } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}
run().catch(console.dir);

