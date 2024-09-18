const { Router } = require("express");
const authenticateJWT = require("../middleware/token");
const {
    memberHistory,
    exportXlsx,
    addMemberHistory,
} = require("../services/history");

const HistoryRouter = Router();

HistoryRouter.use(authenticateJWT);

HistoryRouter.get("/export-xlsx", async (req, res) => {
    const workbook = await exportXlsx();
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");

    workbook.xlsx.write(res).then(() => {
        res.end();
    });
});

HistoryRouter.get("/:id", async (req, res) => {
    const { page, limit } = req.query;
    const { id } = req.params;

    const memberHis = await memberHistory(page, limit, id);

    return res.status(200).json(memberHis);
});

HistoryRouter.post("/:id", async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    const addHis = await addMemberHistory(id, body);

    return res.status(200).json(addHis);
});

module.exports = HistoryRouter;
