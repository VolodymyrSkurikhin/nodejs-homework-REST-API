const fs = require("fs/promises");
const { User } = require("../../models/users");
const path = require("path");
const { RequestError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempStore, filename } = req.file;
    // const tempURL = path.join("tempStore", filename);
    const { _id } = req.user;
    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;
    const finalStore = path.join(avatarsDir, avatarName);
    const avatarURL = path.join("avatars", avatarName);
    await fs.rename(tempStore, finalStore);
    const result = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );
    res.json({ avatarURL: result.avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw RequestError(500, "Avatar was not changed");
  }
};

module.exports = updateAvatar;
