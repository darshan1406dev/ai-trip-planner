// src/lib/gemini.js
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("❌ VITE_GEMINI_API_KEY is not set in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const chat = model.startChat({
  history: [],
  generationConfig: {
    responseMimeType: "application/json",
  },
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ],
});

// ✅ This function can be imported and called from anywhere
export async function generateTravelPlan(prompt) {
  try {
    console.log("🚀 Sending prompt to Gemini...");

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Raw Gemini Response:\n", text);

    try {
      const jsonResponse = JSON.parse(text);
      console.log("✅ Parsed JSON:\n", JSON.stringify(jsonResponse, null, 2));

      return jsonResponse;
    } catch (jsonError) {
      console.error("❌ Failed to parse JSON:", jsonError);
      return null;
    }
  } catch (err) {
    console.error("❌ Error generating content:", err);
    return null;
  }
}
