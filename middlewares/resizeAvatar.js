const Jimp = require("jimp");
const path = require("path");

const resizeAvatar = async (req, _, next) => {
  const { path: tempStore, filename } = req.file;
  // const tempStoreWithName = path.join(`${tempStore}`, `${filename}`);
  try {
    const result = await Jimp.read(tempStore);
    await result.resize(250, 250).write(tempStore);
    next();
  } catch (error) {
    next(error("Avatar resize unsuccessful"));
  }
  // next();
};

module.exports = resizeAvatar;
