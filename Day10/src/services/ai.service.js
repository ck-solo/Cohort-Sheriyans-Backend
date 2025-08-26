const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});
 
async function generateImage(base64ImageFile){

  const contents = [
    {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
});
 return (response.text);

}

module.exports = generateImage