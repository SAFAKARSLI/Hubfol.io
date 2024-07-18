import { MongoClient, ServerApiVersion  } from "mongodb";
const uri = "mongodb+srv://stephencrsnn:5uTt6Ca6FDKzJpGS@hubfolio.7js3mpi.mongodb.net/?appName=Hubfolio";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true, 
    }
  });