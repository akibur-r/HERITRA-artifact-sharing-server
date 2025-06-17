require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
};

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("ping!!", port);

    // test queries
    app.get("/", (req, res) => {
      res.send("hey!!");
    });

    // collections
    const artifactsCollection = client.db("heritra").collection("artifacts");
    const usersCollection = client.db("heritra").collection("users");

    //users relted queries -------------------------

    // check if user liked a particular artifact api -- get
    app.get("/users/likes", async (req, res) => {
      const artifact_id = req.query.artifact_id;
      const user_email = req.query.user_email;

      const userDetails = await usersCollection.findOne({ email: user_email });

      const isLiked = userDetails.likes?.some(
        (id) => id.toString() === artifact_id
      );

      // console.log(artifact_id);

      res.send(isLiked);
    });

    // get all liked artifacts api
    app.get("/users/likes/:user_email", async (req, res) => {
      const user_email = req.params.user_email;

      const userDetails = await usersCollection.findOne({ email: user_email });

      const likedArtifacts = await Promise.all(
        userDetails.likes?.map(async (liked_artifact_id) => {
          return await artifactsCollection.findOne({
            _id: new ObjectId(liked_artifact_id),
          });
        }) || []
      );

      res.send(likedArtifacts);
    });

    // add new user api
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const { email } = newUser;

      const exists = await usersCollection.findOne({ email: email });
      // console.log(exists);

      if (exists) {
        res.send("user exists already");
      } else {
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
      }
    });

    app.put("/users/likes", async (req, res) => {
      const artifact_id = req.query.artifact_id;
      const user_email = req.query.user_email;

      // update user like add or remove
      const userDetails = await usersCollection.findOne({ email: user_email });

      const alreadyLiked = userDetails.likes?.includes(artifact_id);

      const userUpdateFilter = { email: user_email };
      const userUpdateOptions = { upsert: false };
      let userUpdateQuery = { $addToSet: { likes: artifact_id } };

      if (alreadyLiked) {
        userUpdateQuery = { $pull: { likes: artifact_id } };
      }

      const result = await usersCollection.updateOne(
        userUpdateFilter,
        userUpdateQuery,
        userUpdateOptions
      );

      result.likeAdded = !alreadyLiked;

      // artifact count add or remove
      const artifactDetails = await artifactsCollection.findOne({
        _id: new ObjectId(artifact_id),
      });
      const newLikeCount = artifactDetails.likeCount + (alreadyLiked ? -1 : 1);

      const artifactUpdateFilter = { _id: new ObjectId(artifact_id) };
      const artifactUpdateQuery = { $set: { likeCount: newLikeCount } };
      const artifactUpdateOptions = { upsert: false };

      const countUpd = await artifactsCollection.updateOne(
        artifactUpdateFilter,
        artifactUpdateQuery,
        artifactUpdateOptions
      );
      console.log(countUpd);

      res.send(result);
      // res.send(alreadyLiked)
    });

    // artifacts related queries ---------------------
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

    app.get("/artifacts/findOne/:id", async (req, res) => {
      const id = req.params.id;
      const targetId = new ObjectId(id);
      const result = await artifactsCollection.findOne({ _id: targetId });

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
