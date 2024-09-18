const { Router } = require("express");
const authenticateJWT = require("../middleware/token");
const {
    addMember,
    listMember,
    deleteMember,
    updateMember,
    memberType,
} = require("../services/member");

const MemberRouter = Router();

MemberRouter.use(authenticateJWT);

MemberRouter.get("/", async (req, res) => {
    const items = await listMember();

    return res.status(200).json(items);
});

MemberRouter.get("/types", async (req, res) => {
    const items = memberType();

    return res.status(200).json(items);
});

MemberRouter.post("/", async (req, res) => {
    const body = req.body;
    const createMember = await addMember(body);

    return res.status(200).json(createMember);
});

MemberRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const uMem = await updateMember(id, body);

    return res.status(200).json(uMem);
});

MemberRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const dMem = await deleteMember(id);

    return res.status(200).json(dMem);
});

module.exports = MemberRouter;
