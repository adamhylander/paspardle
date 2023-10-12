const axios = require('axios');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Paca:test123@paspardle.99fhdrk.mongodb.net/?";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function getPaspardleData() {
    try{
        await client.connect();

        var data = JSON.stringify({
            "collection": "Pasparet",
            "database": "Paspardle",
            "dataSource": "PaSpardle",
        });

        // Make the axios request
        const response = await axios.post(
            'https://eu-central-1.aws.data.mongodb-api.com/app/data-cuvot/endpoint/data/v1/action/find' ,
            data,
            {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': 'QZAYgzZpFlpg8dQp9dGpK3ZnSem4gUAVWkQVzL2a3YzXKiB61MZYoFO0zOcHAkgA',
            },
            }
        );
        const answer = response.data.documents;
        //console.log(answer);

        // Close the MongoDB connection
        await client.close();

        return answer;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch data from MongoDB');
    }
}

async function storeUserScore(points, time, rounds, username) {

    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db("Paspardle");
        const col = db.collection("Leaderboard");
        document = {
            "user" : username,
            "points": points,
            "time": time,
            "rounds": rounds
        }
        
        await col.insertOne(document);
        
        // Find one document
        // Print to the console
        } catch (err) {
        console.log(err.stack);
    }

    finally {
        await client.close();
    }
}

async function getNarmastVinnerData() {
    try{
        await client.connect();

        var data = JSON.stringify({
            "collection": "NarmastVinner",
            "database": "Paspardle",
            "dataSource": "PaSpardle",
        });

        // Make the axios request
        const response = await axios.post(
            'https://eu-central-1.aws.data.mongodb-api.com/app/data-cuvot/endpoint/data/v1/action/find',
            data,
            {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': 'QZAYgzZpFlpg8dQp9dGpK3ZnSem4gUAVWkQVzL2a3YzXKiB61MZYoFO0zOcHAkgA',
            },
            }
        );
        const answer = response.data.documents;
        //console.log(answer);

        // Close the MongoDB connection
        await client.close();

        return answer;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch data from MongoDB');
    }
}

async function getLeaderboardData() {
    try{
        await client.connect();

        var data = JSON.stringify({
            "collection": "Leaderboard",
            "database": "Paspardle",
            "dataSource": "PaSpardle",
        });

        // Make the axios request
        const response = await axios.post(
            'https://eu-central-1.aws.data.mongodb-api.com/app/data-cuvot/endpoint/data/v1/action/find',
            data,
            {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': 'QZAYgzZpFlpg8dQp9dGpK3ZnSem4gUAVWkQVzL2a3YzXKiB61MZYoFO0zOcHAkgA',
            },
            }
        );
        const answer = response.data.documents;
        //console.log(answer);

        // Close the MongoDB connection
        await client.close();

        return answer;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch data from MongoDB');
    }
}



module.exports = { getPaspardleData, storeUserScore, getNarmastVinnerData, getLeaderboardData };
