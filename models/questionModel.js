const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        reqired: true
    },
    options:{
        type: Object,
        required: true
    },
    answer:{
        type: Array,
        required: true
    },
    createdAt:{
        type:Date , default:Date.now()
    }
   
});

const Question = (module.exports = mongoose.model("questions", questionSchema));

module.exports.addQuestion = (data, callback) => {
    Question.create(data, callback);
}
module.exports.getQuestions = (data,callback)=>{
    Question.find({},{ "answer": 0 },callback).lean().limit(data);
}