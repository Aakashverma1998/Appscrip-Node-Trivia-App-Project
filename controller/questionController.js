const { response } = require("express");
const Question = require("../models/questionModel")

module.exports = {
    addQuestion: async (req, res) => {
        try {
            var data = req.body;

            if (!data.title) {
                return res.json(helper.showValidationErrorResponse("title is required"))
            }
            if (!data.options) {
                return res.json(helper.showValidationErrorResponse("options is required"))
            }
            if (!data.answer) {
                return res.json(helper.showValidationErrorResponse("answer is required"))
            }

            Question.addQuestion(data, async (err, response) => {
                if (err) {
                    return res.json(
                        helper.showDatabaseErrorResponse("INTERNAL_DB_ERROR", err)
                    );
                }
                return res.json(
                    helper.showSuccessResponse("Question Added", response)
                );

            });

        } catch (error) {
            console.log(error);
            return res.json(
                helper.showInternalServerErrorResponse("INTERNAL_SERVER_ERROR")
            );
        }
    },
    getQuestionByFillter: async (req, res) => {

        try {
            const data = req.body;
            const pageSize = data.limit || 10;
            const sortByField = data.orderBy || "createdAt";
            const sortOrder = data.order || -1;
            const paged = data.page || 1;
            let obj = {};
            if (data.fieldName && data.fieldValue)
                obj[data.fieldName] = { $regex: data.fieldValue || "", $options: "i" };
            if (data.startDate) obj.createdAt = { $gte: new Date(data.startDate) };
            if (data.endDate) obj.createdAt = { $lte: new Date(data.endDate) };
            Question.aggregate(
                [
                    { $match: obj },
                    { $sort: { [sortByField]: parseInt(sortOrder) } },
                    { $skip: (paged - 1) * pageSize },
                    { $limit: parseInt(pageSize) },
                ],
                function (err, data) {
                    if (err) {
                        return res.json(
                            helper.showDatabaseErrorResponse("INTERNAL_DB_ERROR", err)
                        );
                    } else {
                        return res.json(helper.showSuccessResponse("DASHBOARD_LIST", data));
                    }
                })
        } catch (error) {
            console.log(error);
        }

    },
    getQuestion: async (req, res) => {
        var data = req.body;
        var limit = data.limit || 1;
        Question.getQuestions(limit, async (err, data) => {
            if (err) {
                return res.json(
                    helper.showDatabaseErrorResponse("INTERNAL_DB_ERROR", err)
                );
            }
            return res.json(
                helper.showSuccessResponse("Data Success",data)
            );
        })
    }
}
