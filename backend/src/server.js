import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/ratelimiter.js";
dotenv.config();
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js"
import path from "path"

const app = express();
const PORT = process.env.PORT || 5001;

console.log(process.env.MONGO_URI);

const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}



// middleware FIRST - thius middleware will parse JSON bodies: req.body
app.use(express.json()); // allows to get access to req, res, http requests 
app.use(ratelimiter)
// console.log("UPSTASH URL:", process.env.UPSTASH_REDIS_REST_URL);

//our simple custom midddleware
// app.use((req,res,next) => {
//   console.log(`Req method is  ${req.method} & Req URL is ${req.url}`)
//   next(); //it will call the next function, the one which api is calling, but first the above console log will run
// })

// routes AFTER middleware
app.use("/api/notes", notesRoutes);

app.use("/api/ai", aiRoutes);
 
app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

// connect DB BEFORE listening (recommended)
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server started on :", PORT, "URL: http://localhost:" + PORT);
  });
});


//mongodb+srv://hansikasrivastava1234_db_user:Co5nNvqwH93Nx3bt@cluster0.zv5eadj.mongodb.net/?appName=Cluster0


// app.get("/api/notes", (req, res) => {
//   //send the notes
//   res.status(200).send("you got 5 notes");
// });

//what is an endpoint ?
// An endpoint is a combination of a URL  + HTTP method that lets the client interact with a specific resource


// app.post("/api/notes", (req, res) => {
//   res.status(201).json({message: "post created successfully"})
// })

// app.post("/api/notes/", (req, res) => {
//   res.status(200).json({message: "Note created successfully"})
// });

// app.put("/api/notes/:id", (req, res) => {
//   res.status(200).json({message: "Note updated successfully"})
// });

// app.deleted("/api/notes/:id", (req, res) => {
//   res.status(200).json({message: "Note deleted successfully"})
// })




