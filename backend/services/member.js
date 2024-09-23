const { MEMBER_TYPE } = require("../constant/member.constant");
const HistoryModel = require("../db/models/history");
const MemberModel = require("../db/models/members");
const { getPointStage } = require("../utils/get-point-stage");

const listMember = async () => {
    const list = await MemberModel.find({});

    const mapProps = list.map((item) => {
        const additionProps = {
            stage: getPointStage(item.point),
        };
        return { ...item.toObject(), ...additionProps };
    });

    return {
        success: true,
        data: mapProps,
    };
};

const addMember = async (body) => {
    const { members } = body;

    const saved = await MemberModel.insertMany(
        members.map((m) => ({
            name: m.name,
            type: m.type,
            histories: [],
        }))
    );

    return {
        success: true,
    };
};

const updateMember = async (memberId, body) => {
    const { name, type } = body;

    const member = await MemberModel.findOne({ _id: memberId });
    if (!member) {
        return {
            success: false,
        };
    }

    const update = await MemberModel.updateOne(
        { _id: memberId },
        { name: name || member.name, type: type || member.type }
    );

    return {
        success: true,
    };
};

const deleteMember = async (memberId) => {
    const member = await MemberModel.findOne({ _id: memberId });
    if (!member) {
        return {
            success: false,
        };
    }

    const del = await MemberModel.deleteOne({ _id: memberId });
    const delHistory = await HistoryModel.deleteMany({ member: memberId });

    return {
        success: true,
    };
};

const memberType = () => {
    return {
        success: true,
        data: MEMBER_TYPE,
    };
};

module.exports = {
    listMember,
    deleteMember,
    updateMember,
    memberType,
    addMember,
};
