module.exports = function (app) {

    /* importing routes files for routes */

  app.use("/api/v1/user", require("./user/userRoutes"));
  
  app.use("/api/v1/questions", require("./question/questionRoutes"));

}