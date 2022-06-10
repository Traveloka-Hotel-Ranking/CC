const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/hotel",
        [authJwt.verifyTokenHotel, authJwt.isUser],
        controller.findHotel
    );

    app.get(
        "/api/hotel/loc",
        [authJwt.verifyTokenHotel, authJwt.isUser],
        controller.findByLoc
    );

    app.get(
        "/api/test/mod",
        [authJwt.verifyTokenHotel, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyTokenHotel, authJwt.isAdmin],
        controller.adminBoard
    );
};