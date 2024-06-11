const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const folderPath = "101/Silver"; // Update this to your folder path
const uploadApiUrl = "https://api.swageazy.com/helper/upload/image"; // Update this to your API endpoint

// Function to upload a single image
const uploadImage = async (imagePath) => {
  try {
    let data = new FormData();
    data.append("image", fs.createReadStream(imagePath));

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.swageazy.com/helper/upload/image",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(folderPath, JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
};

// Function to upload all images in a folder
const uploadAllImages = async (folderPath) => {
  const imageFiles = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

  const uploadedImageUrls = [];

  for (const imageFile of imageFiles) {
    const imagePath = path.join(folderPath, imageFile);

    // console.log(folderPath, imagePath);

    const imageUrl = await uploadImage(imagePath);
    if (imageUrl) {
      uploadedImageUrls.push(imageUrl);
      console.log(`Uploaded ${imageFile}: ${imageUrl}`);
    }
  }

  return uploadedImageUrls;
};

// Run the script
(async () => {
  const uploadedImageUrls = await uploadAllImages(folderPath);
  fs;
  console.log("All uploaded image URLs:", uploadedImageUrls);
})();
