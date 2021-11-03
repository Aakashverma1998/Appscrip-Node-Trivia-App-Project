const mongoose = require('mongoose');
const ObjectId = require('objectid')

const userSchema = mongoose.Schema({
    Question: { type: mongoose.Schema.Types.ObjectId, ref: "questions" },

    userDetails: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    yourAnswer: {
        type: Array
    },
    createdAt: {
        type: Date, default: Date.now()
    },
 
});

const Answer = (module.exports = mongoose.model("answer", userSchema));

module.exports.addAnswer = (data, callback) => {
    let query = {
        Question: ObjectId(data.questionId)
    }
    let update = {
        yourAnswer: data.answer,
        userDetails: (data.userId),
        Question: (data.questionId)

    }


    Answer.findOneAndUpdate(query, update,{ upsert: true, new: true }).populate("Question",'-answer').populate("userDetails", "-createAt -updatedAt").lean().exec(callback);
}
module.exports.getUserResult = (data, callback) => {
    let query = {
        userDetails: (data.userId)
    }

    Answer.find({ query }).populate("Question").populate("userDetails", "-createAt -updatedAt").exec(callback);

}
module.exports.getAllUserResult = (callback) => {
    
    Answer.find({},"answer").populate("Question").lean().populate("userDetails", "-createAt -updatedAt").exec(callback);

}