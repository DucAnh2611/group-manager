const { Schema, default: mongoose } = require("mongoose");
const { encrypt } = require("../../utils/enscrypt");
const { MEMBER_TYPE } = require("../../constant/member.constant");

const memberSchema = new Schema({
    name: { type: String, required: true },
    point: { type: Number, default: 20, required: true },
    type: { type: String, enum: Object.values(MEMBER_TYPE) },
    histories: [{ type: Schema.Types.ObjectId, ref: "history" }],
});

memberSchema.pre("save", async function (next) {
    const member = this;
    if (member.isModified("name")) {
        member.name = encrypt(member.name, process.env.MEMBER_NAME_KEY);
    }
    next();
});

const MemberModel = mongoose.model("member", memberSchema);

module.exports = MemberModel;
