import mongoose from "mongoose";

//1-create a schema
//2-create a model based off that schema

const noteSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:true,
    },
    content: {
      type:String,
      required:true,
    }
  },
  {timestamps: true} // createdAt, updateAt
);


const Note = mongoose.model("Note", noteSchema); //create a "Note" Model based off the "noteSchema"

export default Note;

// import mongoose from "mongoose";

// const noteSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// const Note = mongoose.model("Note", noteSchema);
// export default Note;