const { Schema, model } = require("mongoose");
const userSchema = new Schema({
   email: {
      type: String,
      required: true,
   },
   name: {
      type: String,
   },
   password: {
      type: String,
      required: true,
   },
   avatarUrl: String,
   isAuthor: Boolean,
   isModerator: Boolean,
});

module.exports = model("User", userSchema);
