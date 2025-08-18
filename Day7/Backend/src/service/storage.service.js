var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

function uploadFile(file){
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("No file buffer provided"));
    }

    // Convert Buffer to Base64 correctly
    const base64File = file.buffer.toString("base64");

    imagekit.upload(
      {
        file: base64File,
        fileName: file.originalname || `upload_${Date.now()}`,
      },
      (error, result) => {
        if (error) {
          console.error("❌ ImageKit Upload Error:", error);
          reject(error);
        } else {
          console.log("✅ ImageKit Upload Success:", result);
          resolve(result);
        }
      }
    );
  });
}

module.exports = uploadFile;
