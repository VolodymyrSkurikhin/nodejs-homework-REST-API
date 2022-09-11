const Jimp = require("jimp");

const resizeAvatar = async (req, _, next) => {
  const { path: tempStore } = req.file;
  try {
    const result = await Jimp.read(tempStore);
    await result.resize(250, 250).write(tempStore);
    next();
  } catch (error) {
    next(error("Avatar resize unsuccessful"));
  }
};

module.exports = resizeAvatar;
