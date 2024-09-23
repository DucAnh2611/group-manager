const POINT_STAGE = {
    GOOD: {
        from: 25,
        to: -1,
    },
    NICE: {
        from: 20,
        to: 25,
    },
    QUALIFIED: {
        from: 15,
        to: 20,
    },
    UN_QUALIFIED: {
        from: -1,
        to: 15,
    },
};
const POINT_STAGE_TAG = {
    GOOD: "GOOD",
    NICE: "NICE",
    QUALIFIED: "QUALIFIED",
    UN_QUALIFIED: "UN_QUALIFIED",
};

const POINT_STAGE_TEXT = {
    GOOD: "Tốt",
    NICE: "Khá",
    QUALIFIED: "Đạt",
    UN_QUALIFIED: "Không đạt",
};

module.exports = { POINT_STAGE, POINT_STAGE_TAG, POINT_STAGE_TEXT };
