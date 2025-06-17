require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@akibur.q5l27io.mongodb.net/?retryWrites=true&w=majority&appName=akibur`;

app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const formatNewArtifact = async (req, res, next) => {
  const newArtifact = req.body;
  newArtifact.likeCount = 0;

  next();
}

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("ping!!", port);

    // test queries
    app.get("/", (req, res) => {
      res.send("hey!!");
    });

    // artifacts related queries
    const artifactsCollection = client.db("heritra").collection("artifacts");

    // get artifacts api
    app.get("/artifacts", async (req, res) => {
      const limit = Number(req.query.limit) || 0;
      const sort_by = req.query.sort_by;

      const sort = {};
      if (sort_by === "likeCount") {
        sort.likeCount = -1;
      }

      const result = await artifactsCollection
        .find()
        .sort(sort)
        .limit(limit)
        .toArray();

      res.send(result);
    });

    // add single new artifact api
    app.post("/artifacts", formatNewArtifact, async (req, res) => {
      const newArtifact = req.body;
      const result = await artifactsCollection.insertOne(newArtifact);

      res.send(result);
    });
  } finally {
    // await client.close();
  }
}

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

run().catch(console.dir);
