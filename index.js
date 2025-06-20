require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@akibur.q5l27io.mongodb.net/?retryWrites=true&w=majority&appName=akibur`;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://heritra-by-akib.web.app",
      "https://heritra-by-akib.firebaseapp.com/",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const admin = require("firebase-admin");

const serviceKey = Buffer.from(
  process.env.FIREBASE_SERVICE_KEY,
  "base64"
).toString("utf8");
// console.log(serviceKey);
const serviceAccount = JSON.parse(serviceKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const formatNewArtifact = async (req, res, next) => {
  const newArtifact = req.body;
  newArtifact.likeCount = 0;
  newArtifact.uploadTime = new Date();

  next();
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const authEmail = req.headers?.user_email;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const authToken = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(authToken);
    req.decoded = decoded;

    if (req.decoded.email !== authEmail) {
      return res.status(403).send({ message: "Fuck you" });
    }

    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized access" });
  }
};

async function run() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    // console.log("ping!!", port);

    // test queries
    app.get("/", (req, res) => {
      res.send("hey!!");
    });

    // collections
    const artifactsCollection = client.db("heritra").collection("artifacts");
    const usersCollection = client.db("heritra").collection("users");

    //users relted queries -------------------------

    // [secured] get single user info api
    app.get("/users", verifyToken, async (req, res) => {
      const user_email = req.headers?.user_email;

      const result = await usersCollection.findOne({ email: user_email });
      // artifactsCollection.countDocuments()

      res.send(result);
    });

    // [secured] check if user liked a particular artifact api -- get
    app.get(
      "/users/likes",
      verifyToken,
      // verifyUserForEmailInQuery,
      async (req, res) => {
        const artifact_id = req.query.artifact_id;
        const user_email = req.query.user_email;

        const userDetails = await usersCollection.findOne({
          email: user_email,
        });

        const isLiked = userDetails.likes?.some(
          (id) => id.toString() === artifact_id
        );

        // console.log(artifact_id);

        res.send(isLiked);
      }
    );

    // [secured] get all liked artifacts api
    app.get(
      "/users/likes/:user_email",
      verifyToken,
      // verifyUserForEmailInParams,
      async (req, res) => {
        const user_email = req.params.user_email;

        const userDetails = await usersCollection.findOne({
          email: user_email,
        });

        const likedArtifacts = await Promise.all(
          userDetails.likes?.map(async (liked_artifact_id) => {
            return await artifactsCollection.findOne({
              _id: new ObjectId(liked_artifact_id),
            });
          }) || []
        );

        res.send(likedArtifacts);
      }
    );

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

    // [secured] add or remove like
    app.put(
      "/users/likes",
      verifyToken,
      // verifyUserForEmailInQuery,
      async (req, res) => {
        const artifact_id = req.query.artifact_id;
        const user_email = req.query.user_email;

        // update user like add or remove
        const userDetails = await usersCollection.findOne({
          email: user_email,
        });

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
        const newLikeCount =
          artifactDetails.likeCount + (alreadyLiked ? -1 : 1);

        const artifactUpdateFilter = { _id: new ObjectId(artifact_id) };
        const artifactUpdateQuery = { $set: { likeCount: newLikeCount } };
        const artifactUpdateOptions = { upsert: false };

        const countUpd = await artifactsCollection.updateOne(
          artifactUpdateFilter,
          artifactUpdateQuery,
          artifactUpdateOptions
        );
        // console.log(countUpd);

        res.send(result);
        // res.send(alreadyLiked)
      }
    );

    // artifacts related queries ---------------------
    // get artifacts api
    app.get("/artifacts", async (req, res) => {
      const limit = Number(req.query.limit) || 0;
      const sort_by = req.query.sort_by;
      const searchByNameQuery = req.query.name;
      const user_email = req.query.user_email;

      const sort = {};
      const query = {};
      if (sort_by === "likeCount") {
        sort.likeCount = -1;
      }

      if (user_email) {
        query.userEmail = user_email;
      }
      if (searchByNameQuery) {
        queryRegex = new RegExp(searchByNameQuery, "i");
        query.name = { $regex: queryRegex };
      }

      sort.uploadTime = -1;
      const result = await artifactsCollection
        .find(query)
        .sort(sort)
        .limit(limit)
        .toArray();

      res.send(result);
    });

    // [secured] get a single artifact
    app.get("/artifacts/findOne/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const targetId = new ObjectId(id);
      const result = await artifactsCollection.findOne({ _id: targetId });

      res.send(result);
    });

    // [secured] add single new artifact api
    app.post("/artifacts", verifyToken, formatNewArtifact, async (req, res) => {
      const newArtifact = req.body;
      const result = await artifactsCollection.insertOne(newArtifact);

      res.send(result);
    });

    // [secured] update artifact
    app.put("/artifacts/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: false };
      const updatedArtifact = req.body;
      const updatedDoc = {
        $set: updatedArtifact,
      };

      const result = await artifactsCollection.updateOne(
        filter,
        updatedDoc,
        options
      );

      res.send(result);
    });

    // [secured] delete single artifact
    app.delete("/artifacts/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const allUsers = await usersCollection.find().toArray();
      // delete it from all users
      const userUpdateQuery = { $pull: { likes: id } };
      const userUpdateOptions = { upsert: false };

      allUsers.map(async (user) => {
        const user_email = user.email;

        const userLikesThis = user.likes?.includes(id);
        if (userLikesThis) {
          const userUpdateFilter = { email: user_email };
          await usersCollection.updateOne(
            userUpdateFilter,
            userUpdateQuery,
            userUpdateOptions
          );
        }
      });

      const result = await artifactsCollection.deleteOne({
        _id: new ObjectId(id),
      });

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
