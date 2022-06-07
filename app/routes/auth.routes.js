const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token-hotel, x-access-token-hotel, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateEmailOrPhone,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );
    app.post("/api/auth/signin", controller.signin);
    app.post("/api/auth/forgotpassword", controller.forgotPassword);
};