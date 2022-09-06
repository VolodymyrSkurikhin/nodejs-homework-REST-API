const Jimp = require("jimp");
const path = require("path");

const resizeAvatar = async (req, _, next) => {
  const { path: tempStore, filename } = req.file;
  const tempStoreWithName = path.join(`${tempStore}`, `${filename}`);
  try {
    const result = await Jimp.read(tempStoreWithName);
    await result.resize(250, 250).write(tempStoreWithName);
  } catch (error) {
    next(error("Avatar resize unsuccessful"));
  }
};

module.exports = resizeAvatar;
