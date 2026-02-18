import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/improve", async (req, res) => {
  const { content, action } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Content is required" });
  }

  const prompts = {
    improve: `Improve and rephrase the following note to make it clearer and more professional. Return only the improved text, nothing else:\n\n${content}`,
    grammar: `Fix all grammar and spelling mistakes in the following note. Return only the corrected text, nothing else:\n\n${content}`,
    expand: `Expand the following note with more details and context. Return only the expanded text, nothing else:\n\n${content}`,
    summarize: `Summarize the following note concisely. Return only the summary, nothing else:\n\n${content}`,
  };

  const prompt = prompts[action] || prompts.improve;

  try {
   const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ result: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "AI request failed" });
  }
});

export default router;