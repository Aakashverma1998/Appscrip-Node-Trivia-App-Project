const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },

    createAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },

},
    {
        versionKey: false, // You should be aware of the outcome after set to false
    }
);

const User = (module.exports = mongoose.model("users", userSchema));


module.exports.addUser = (data, callback) => {
    User.create(data, callback);
}
module.exports.getAllUser = () => {
   return User.find().lean();
}


