const {
    POINT_STAGE,
    POINT_STAGE_TAG,
} = require("../constant/point-stage.constant");

const getPointStage = (point) => {
    const stages = POINT_STAGE;

    for (const st of Object.entries(stages)) {
        const [key, { from, to }] = st;

        if (!from && to) {
            if (point < to) {
                return POINT_STAGE_TAG[key];
            }
        } else if (!to && from) {
            if (point >= from) {
                return POINT_STAGE_TAG[key];
            }
        } else {
            if (from <= point && point < to) {
                return POINT_STAGE_TAG[key];
            }
        }
    }

    return POINT_STAGE_TAG.UN_QUALIFIED;
};

module.exports = { getPointStage };
