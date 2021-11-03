const User = require('../models/userModel');
const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');


module.exports = {

    register: async (req, res) => {
        try {
            var data = req.body;

            if (!data.name) {
                return res.json(helper.showValidationErrorResponse("Name is required"))
            }

            User.addUser(data, (err, response) => {
                if (err) {
                    return res.json(
                        helper.showDatabaseErrorResponse("INTERNAL_DB_ERROR", err)
                    );
                }
                return res.json(
                    helper.showSuccessResponse("User Register Successfully", response)
                );
            });

        } catch (error) {
            console.log(error);
            return res.json(
                helper.showInternalServerErrorResponse("INTERNAL_SERVER_ERROR")
            );
        }



    },
    getUserList: async (req, res) => {

        var userList = await User.getAllUser();
        res.json(
            helper.showSuccessResponse("Data Success", userList)
        );



    },
    addUserAnswer: async (req, res) => {
        try {
            var data = req.body;
            var answer = data.answer
            if (!data.answer) {
                return res.json(helper.showValidationErrorResponse("answer is required"))
            }
            if (!data.userId) {
                return res.json(helper.showValidationErrorResponse("userId is required"))
            }
            if (!data.questionId) {
                return res.json(helper.showValidationErrorResponse("question is required"))
            }

            var userAnswer = await Question.findOne({
                _id: data.questionId,
                answer: {
                    $in: answer
                }
            });
            if (!userAnswer) {
                return res.json(helper.showDatabaseErrorResponse("Wrong Answer"))
            }
            Answer.addAnswer(data, (err, response) => {
                if (err) {
                    return res.json(
                        helper.showDatabaseErrorResponse("INTERNAL_DB_ERROR", err)
                    );
                }
                console.log(response)
                return res.json(
                    helper.showSuccessResponse("Correct Answer", response)
                );
            });

        } catch (error) {
            console.log(error);
            return res.json(
                helper.showInternalServerErrorResponse("INTERNAL_SERVER_ERROR")
            );
        }



    },
    getUserResult: async (req, res) => {
        try {
            var data = req.body;
            if (!data.userId) {
                return res.json(helper.showValidationErrorResponse("userId is required"))
            }
            Answer.getUserResult(data, (err, data) => {
                if (err) {
                    return res.json(
                        helper.showDatabaseErrorResponse("INTERNAL_DB_ERROR", err)
                    );
                }
                return res.json(
                    helper.showSuccessResponse("User results", data)
                );
            })

        } catch (error) {
            console.log(error);
            return res.json(
                helper.showInternalServerErrorResponse("INTERNAL_SERVER_ERROR")
            );
        }

    },
    getUserallResult: async (req, res) => {
        try {
            Answer.getAllUserResult((err, data) => {
                if (err) {
                    return res.json(
                        helper.showDatabaseErrorResponse("INTERNAL_DB_ERROR", err)
                    );
                }
                console.log(data);
                return res.json(
                    helper.showSuccessResponse("User all results", data)
                );
            })

        } catch (error) {
            console.log(error);
            return res.json(
                helper.showInternalServerErrorResponse("INTERNAL_SERVER_ERROR")
            );
        }

    }
}