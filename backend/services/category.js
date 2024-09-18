const { CATEGORY_POINT_LIST } = require("../constant/category.constant");
const MemberModel = require("../db/models/members");

const categoryList = async (memberId, type) => {
    const member = await MemberModel.findOne({ _id: memberId });

    const categoryItems = (CATEGORY_POINT_LIST[type] || []).filter(
        (item) => !item.tags.length || item.tags.includes(member.type)
    );

    return {
        success: true,
        data: categoryItems,
    };
};

module.exports = { categoryList };
