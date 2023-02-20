const config = {
    name: "locmem",
    version: "0.0.1-xaviabot-port-refactor",
    description: "locmem theo data checktt (all)",
    usage: "[so tn]",
    cooldown: 10,
    permissions: [1],
    credits: "Nghia/DungUwU"
}

function kick(userID, threadID) {
    return new Promise((resolve, reject) => {
        global.api.removeUserFromGroup(userID, threadID, (err) => {
            if (err) return reject(err);
            resolve();
        })
    })
}

async function callback({ message, eventData }) {
    const { memberIDsNeedToBeRemoved } = eventData;

    if (message.reaction != "👍") return;

    try {
        let success = 0;
        for (const userID of memberIDsNeedToBeRemoved) {
            await kick(userID, message.threadID)
                .then(() => success++)
                .catch(console.error);
        }

        await message.send(`Đã loại bỏ thành công ${success} thành viên.`);
        if (success < memberIDsNeedToBeRemoved.length) {
            await message.send(`Không thể loại bỏ ${memberIDsNeedToBeRemoved.length - success} thành viên.`);
        }

        return;
    } catch (e) {
        console.error(e);
        return message.send("Lỗi khi loại bỏ thành viên.");
    }
}

async function onCall({ message, args, data }) {
    const { participantIDs, threadID, senderID } = message;
    if (args.length == 0) return message.reply("Vui lòng nhập số tn cần lọc.");

    const input = parseInt(args[0]);
    if (isNaN(input)) return message.reply("Vui lòng nhập số tn cần lọc hợp lệ.");

    const threadInfo = data.thread.info;
    const { adminIDs } = threadInfo;
    const { MODERATORS } = global.config;

    if (!adminIDs.some(e => e.id == global.botID)) return message.reply("Bot không phải là admin nhóm.");

    const whitelist = MODERATORS.concat(adminIDs.map(e => e.id), senderID, global.botID);

    try {
        let threadDATA = global.checktt_cache.get(threadID);
        if (!threadDATA) return message.reply("Không có dữ liệu về nhóm này!");

        threadDATA.all = threadDATA.all.filter(item => participantIDs.some(e => e == item.id));
        let allData = threadDATA.all.sort((a, b) => b.n - a.n);

        participantIDs.forEach(id => {
            if (!allData.some(e => e.id == id)) {
                allData.push({
                    id: id,
                    n: 0
                });
            }
        });

        const memberIDsNeedToBeRemoved = allData
            .filter(item => item.n < input && !whitelist.some(e => e == item.id))
            .map(item => item.id);

        if (memberIDsNeedToBeRemoved.length == 0) return message.reply("Không có thành viên nào cần loại bỏ.");
        return message
            .reply(`Đã yêu cầu loại bỏ ${memberIDsNeedToBeRemoved.length} thành viên.\nReact 👍 để xác nhận.`)
            .then(_ => _.addReactEvent({ callback: callback, memberIDsNeedToBeRemoved }))
            .catch(console.error);

    } catch (e) {
        console.error(e);
        return message.reply("Lỗi khi lọc dữ liệu.");
    }
}

export default {
    config,
    onCall
}
