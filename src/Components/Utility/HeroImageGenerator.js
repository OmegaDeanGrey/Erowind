import axios from "axios";

export async function generateHeroImage({ race, heroClass }) {
  const prompt = `Fantasy portrait of a ${race} ${heroClass}, detailed digital art, heroic pose, RPG style.`;
  console.log("Prompt being sent:", prompt);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "gpt-image-1", // DALL·E 3
        prompt,
        size: "512x512",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );
    console.log("API KEY:", process.env.REACT_APP_OPENAI_API_KEY);
    return response.data.data[0].url;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
}
