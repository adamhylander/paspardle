const { MongoClient } = require("mongodb");


// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Paca:test123@paspardle.99fhdrk.mongodb.net/?"
const client = new MongoClient(url);

// The database to use
const dbName = "Paspardle";
                    
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection("NarmastVinner");
        documents = []
        documents.push({
            "VideoID": "Wnkj3PgjBaY",
            "Latitud": "59.37268",
            "Longitud": "18.000568",
            "Plats": "Friends Arena",
            "StartLatitud": "55.614956",
            "StartLongitud": "8.256381",
            "StartZoom": "5.5"
        });

        documents.push({
            "VideoID": "QcIyuwFkR38",
            "Latitud": "67.851066",
            "Longitud": "20.59523",
            "Plats": "Icehotel i Jukkasjärvi",
            "StartLatitud": "67.24069",
            "StartLongitud": "22.91667",
            "StartZoom": "6.5"
        });

        documents.push({
            "VideoID": "y6JC0K7Z5hA",
            "Latitud": "41.701",
            "Longitud": "-74.880",
            "Plats": "Woodstockfestivalen (1969)",
            "StartLatitud": "35.117500",
            "StartLongitud": "-89.971107",
            "StartZoom": "5"
        });
        
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

