import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const ingredients = req.body;

    const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page \n${JSON.stringify(ingredients, null, 2)}`;

    try {
        const response = await genai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        res.json({ recipe: response.text });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate recipe" });
    }
}
