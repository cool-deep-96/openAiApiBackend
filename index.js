import  express  from "express";
import { config }  from "dotenv";
import OpenAI from 'openai';
config();
const app = express();
app.use(express.json())

const myAi = new OpenAI(
    {
        apiKey: process.env.OPEN_AI_KEY
    }
) 


app.post("/ask", async (req, res) => {
    const prompt = req.body.prompt;
    try {
      if (!prompt) {
        throw new Error("No prompt was provided");
      }
      const response = await myAi.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt}],
        max_tokens: 100
        });
        
      return res.status(200).json({
        success: true,
        message: response.choices[0].message.content
      });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
  });



const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})