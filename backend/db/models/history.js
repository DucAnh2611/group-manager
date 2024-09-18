const { Schema, default: mongoose } = require("mongoose");
const { POINT_TYPE } = require("../../constant/category.constant");

const historySchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: "member",
        required: true,
    },
    type: {
        type: String,
        enum: [POINT_TYPE.ADD, POINT_TYPE.MINUS],
        required: true,
    },
    pointName: {
        type: String,
        required: true,
    },
    point: {
        type: Number,
        required: true,
    },
    pointUnit: {
        type: String,
        required: true,
    },
    behavior: {
        type: String,
        required: false,
        default: "",
    },
    notes: {
        type: String,
        required: false,
        default: "",
    },
    date: {
        type: Date,
        required: true,
    },
});

const HistoryModel = mongoose.model("history", historySchema);

module.exports = HistoryModel;
