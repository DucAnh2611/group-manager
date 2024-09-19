const { POINT_TYPE } = require("../constant/category.constant");
const { MEMBER_TYPE_TEXT } = require("../constant/member.constant");
const HistoryModel = require("../db/models/history");
const MemberModel = require("../db/models/members");
const ExcelJS = require("exceljs");

const memberHistory = async (page, limit, memberId) => {
    const items = await HistoryModel.find({
        member: memberId,
    })
        .sort({ date: "desc" })
        .limit(limit)
        .skip((page - 1) * limit);

    const count = await HistoryModel.find({
        member: memberId,
    }).countDocuments();

    return {
        success: true,
        data: {
            items,
            count,
        },
    };
};

const addMemberHistory = async (memberId, body) => {
    const { histories } = body;

    const member = await MemberModel.findOne({ _id: memberId });

    const saved = await HistoryModel.insertMany(
        histories.map(
            ({ pointName, point, pointUnit, type, notes, behavior }) => ({
                pointName,
                point,
                pointUnit,
                type,
                notes,
                behavior,
                date: new Date(),
                member: memberId,
            })
        )
    );

    const newMemberPoint = (member.point += saved.reduce((acc, item) => {
        if (item.type === POINT_TYPE.ADD) {
            acc += item.point;
        }
        if (item.type === POINT_TYPE.MINUS) {
            acc -= item.point;
        }
        return acc;
    }, 0));

    const updateHistory = await MemberModel.updateOne(
        { _id: memberId },
        {
            histories: [...member.histories, ...saved.map((item) => item._id)],
            point: newMemberPoint,
        }
    );

    return {
        success: true,
    };
};

const exportXlsx = async () => {
    const workbook = new ExcelJS.Workbook();

    const members = await MemberModel.find({}).populate({
        path: "histories",
        select: "_id pointName pointUnit behavior point date type",
    });

    const totalColumns = [
        {
            header: "Tên thành viên",
            key: "name",
            width: 50,
        },
        {
            header: "Điểm",
            key: "point",
            width: 10,
        },
        {
            header: "Chức vụ",
            key: "type",
            width: 20,
        },
    ];

    const historyColumns = [
        {
            header: "Tên mục",
            key: "pointName",
            width: 70,
        },
        {
            header: "Điểm",
            key: "point",
            width: 10,
        },
        {
            header: "Đơn vị",
            key: "pointUnit",
            width: 10,
        },
        {
            header: "Hạnh kiểm",
            key: "behavior",
            width: 20,
        },
        {
            header: "Ngày",
            key: "date",
            width: 15,
        },
        {
            header: "Ghi chú",
            key: "notes",
            width: 30,
        },
    ];

    const sumary = workbook.addWorksheet("Tổng quát");
    sumary.columns = totalColumns;
    sumary.addRows(
        members.map((mem) => ({
            name: mem.name,
            point: mem.point.toFixed(2),
            type: MEMBER_TYPE_TEXT[mem.type],
        }))
    );

    members.forEach((mem) => {
        const memberSheet = workbook.addWorksheet(mem.name);
        memberSheet.columns = historyColumns;

        console.log(mem.histories);

        memberSheet.addRows(
            mem.histories.map((history) => ({
                pointName: history.pointName,
                pointUnit: history.pointUnit,
                point: `${history.type}${history.point}`,
                date: `${new Date(history.date).toLocaleDateString()}`,
                notes: history.notes,
                behavior: history.behavior,
            }))
        );
    });

    return workbook;
};

module.exports = { memberHistory, addMemberHistory, exportXlsx };
