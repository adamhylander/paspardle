const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Paca:test123@paspardle.99fhdrk.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

var axios = require('axios');
var data = JSON.stringify({
    "collection": "Pasparet",
    "database": "Paspardle",
    "dataSource": "PaSpardle",
});
            
var config = {
    method: 'post',
    url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-cuvot/endpoint/data/v1/action/find',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'QZAYgzZpFlpg8dQp9dGpK3ZnSem4gUAVWkQVzL2a3YzXKiB61MZYoFO0zOcHAkgA',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
      answer = JSON.stringify(response.data);
      answer = JSON.parse(answer)
      console.log(answer.documents[0])
      ///for (const row of tmp){
        //console.log(row)
      //}
      //console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });


