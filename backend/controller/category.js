const { Router } = require("express");
const authenticateJWT = require("../middleware/token");
const { categoryList } = require("../services/category");

const CategoryRouter = Router();

CategoryRouter.use(authenticateJWT);

CategoryRouter.post("/", async (req, res) => {
    const { memberId, type } = req.body;

    const items = await categoryList(memberId, type);

    return res.status(200).json(items);
});

module.exports = CategoryRouter;
