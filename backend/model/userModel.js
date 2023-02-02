// user name
// user picture
// user code
// user qr code
//locations
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        userID: {
            type: String,
            requried: true
        },
        password: {
            type: String,
            requried: true
        },
        pic: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            required: false,
        },
        uniqueID:
        {
            type: String,
            requried: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    { timestaps: true }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);
module.exports = User;