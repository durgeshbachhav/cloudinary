const User = require('../models/userModel');
const { uploadCloudinary } = require('../services/cloudinary');

const CreateUser = async (req, res) => {
  const { name, username, image } = req.body;
  try {
    let imageData = {};
    if (image) {
      const results = await uploadCloudinary(image, 'demo');
      imageData = results;
    }
    const user = await User.create({
      name,
      username,
      image: imageData,
    });
    return res.status(201).json({ user });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ error: "A server error occurred with this request" });
  }
};

module.exports = {
  CreateUser,
};
