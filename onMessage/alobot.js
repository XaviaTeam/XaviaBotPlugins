import moment from "moment-timezone";

export const config = {
    name: "alobot",
    version: "0.0.1-xaviabot-port",
    credits: "ManhG",
    description: "Gọi Bot Version 3"
};

async function handleReply({ message, data, eventData }) {
    var name = data.user?.info?.name || message.senderID;

    switch (eventData.type) {
        case "reply": {
            var listMods = global.config.MODERATORS;
            for (let mod of listMods) {
                await message
                    .send({
                        body: "➣ 𝐓𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐭𝐮̛̀ " + name + ":\n" + message.body,
                        mentions: [{
                            id: message.senderID,
                            tag: name
                        }]
                    }, mod)
                    .then(data => data.addReplyEvent({
                        messID: message.messageID,
                        type: "goibot",
                        author_only: false,
                        callback: handleReply
                    }))
                    .catch(err => console.error(err));

                global.sleep(300)
            }
            break;
        }
        case "goibot": {
            await message
                .send({ body: `${message.body}`, mentions: [{ tag: name, id: message.senderID }] }, eventData.id, eventData.messID)
                .then(data => data.addReplyEvent({
                    type: "reply",
                    author_only: false,
                    callback: handleReply
                }))
                .catch(err => console.error(err));


            break;
        }
        default: break;
    }
}


export async function onCall({ message, data }) {
    var { threadID, messageID, body, senderID } = message;
    if (senderID == global.data.botID) return;

    var time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    let name = data.user?.info?.name || senderID,
        idbox = threadID,
        uidUser = senderID,
        dataThread = data.thread,
        threadInfo = dataThread.info;

    const listMods = global.config.MODERATORS;

    var tl = [
        "Yêu em <3", "Hi, chào con vợ bé:3", "Vợ gọi có việc gì không?",
        "Dạ, có em đây, yêu em không mà gọi <3. hmm...",
        `${name}` + ", sử dụng callad để liên lạc với admin!",
        `${name}` + ", yêu admin bot đi rồi hãy gọi",
        `${name}` + ", không bé ơi 😇",
        `${name}` + ", tớ nghe nè ❤️"
    ];
    let rand = tl[Math.floor(Math.random() * tl.length)];
    // Gọi bot
    var arr = ["bot", "long", "admin", "bot oi", "yêu bot", "bot đâu"];

    if (!arr.some(item => body.toLowerCase() == item)) return;

    let nameT = threadInfo.name;

    try {
        await message.send(rand, threadID);

        for (var mod of listMods) {
            await message
                .send(`===「 𝐁𝐨𝐭 𝐍𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 🌟 」===\n────────────────────\n💬𝐁𝐨𝐱 𝐍𝐚𝐦𝐞: ${nameT}\n🆔𝐈𝐃 𝐁𝐨𝐱: ${idbox}\n👀𝐍𝐚𝐦𝐞 𝐔𝐬𝐞𝐫: ${name} \n🆔𝐈𝐃 𝐔𝐬𝐞𝐫: ${uidUser}\n⏳𝐓𝐢𝐦𝐞: ${time}\n🗨️𝐆𝐨̣𝐢 𝐛𝐨𝐭: ${body}\n────────────────────`, mod)
                .then(data => data.addReplyEvent({
                    messID: messageID,
                    type: "goibot",
                    author_only: false,
                    callback: handleReply
                }))
                .catch(err => console.error(err));

            global.sleep(300)
        }


    } catch (e) {
        console.error(e);
    }

}
