import { join as joinPath } from 'path';
import request from 'request';

export const config = {
    name: "sendnoti",
    version: "1.0.1-xaviabot-port-optimize",
    credits: "TruongMini",
    description: "Gửi thông báo đến tất cả nhóm",
    usage: "[msg]",
    cooldowns: 5,
}

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {};
    let atmDir = [];

    msg.body = body;
    for (let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response = request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = joinPath(global.cachePath, `_sntuoff_${eachAtm.filename}.${ext}`);

                response
                    .pipe(global.writer(path))
                    .on("close", () => {
                        // attachment.push(global.reader(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch (e) { console.log(e); }
        })
    }

    resolve({
        msg,
        atmDir
    });
})

async function handleReply({ message, eventData, data }) {
    const { messageID, senderID, body } = message;
    let name = data.user?.info?.name || senderID;

    let atmDir = [];

    switch (eventData.type) {
        case "sendnoti": {
            let text = `Nội dung : ${body}\n\nTừ ${name} nhóm ${data.thread.info.name || "Unknow"}`;
            if (message.attachments.length > 0) {
                let returnedObj = await getAtm(message.attachments, `Nội dung : ${body}\n\nTừ ${name} Trong nhóm ${data.thread.info.name || "Unknow"}`);

                text = returnedObj.msg;
                atmDir = returnedObj.atmDir;

                if (atmDir.length > 0) {
                    text.attachment = atmDir.map(item => global.reader(item));
                }
            }
            await message
                .send(text, eventData.tid, eventData.messID)
                .then(data => {
                    atmDir.forEach(async each => global.deleteFile(each).catch(e => console.error(e)))

                    data.addReplyEvent({
                        callback: handleReply,
                        type: "reply",
                        author_only: false,
                        messID: messageID,
                        tid: message.threadID
                    })
                })
                .catch(e => console.log(e));

            break;
        }
        case "reply": {
            let text = `Nội dung : ${body}\n\ntừ ${name} With Love!\nreply tin nhắn này để báo về admin`;
            if (message.attachments.length > 0) {
                const returnedObj = await getAtm(message.attachments, `${body}\n\nFrom ${name} With Love!\nreply tin nhắn này để báo về admin`);

                text = returnedObj.msg;
                atmDir = returnedObj.atmDir;

                if (atmDir.length > 0) {
                    text.attachment = atmDir.map(item => global.reader(item));
                }
            }
            await message
                .send(text, eventData.tid, eventData.messID)
                .then(data => {
                    atmDir.forEach(async each => global.deleteFile(each).catch(e => console.error(e)))

                    data.addReplyEvent({
                        callback: handleReply,
                        type: "sendnoti",
                        author_only: false,
                        messID: messageID,
                        tid: message.threadID
                    })
                })

            break;
        }
        default: break;
    }
}

export async function onCall({ message, args, data }) {
    const { threadID, messageID, senderID, messageReply } = message;

    if (!args[0]) return message.send("Please input message");
    let allThread = Array.from(global.data.threads.keys()).filter(item => item != threadID) || [];

    let atmDir = [];
    let can = 0, canNot = 0;

    let text = `Nội dung : ${args.join(" ")}\n\nTừ ${data.user?.info?.name || senderID} \nreply tin nhắn này để báo về admin`;
    if (message.type == "message_reply") {
        const returnedObj = await getAtm(messageReply.attachments, `Nội dung : ${args.join(" ")}\n\nTừ ${data.user?.info?.name || senderID}\nreply tin nhắn này để báo về admin`);

        text = returnedObj.msg;
        atmDir = returnedObj.atmDir;
    }

    for (const tid of allThread) {
        if (atmDir.length > 0) {
            text.attachment = atmDir.map(item => global.reader(item));
        }

        await message
            .send(text, tid)
            .then(data => {
                can++;

                data.addReplyEvent({
                    callback: handleReply,
                    type: "sendnoti",
                    author_only: false,
                    messID: messageID,
                    tid: message.threadID
                })
            })
            .catch(_ => { canNot++; });

        global.sleep(300);
    }


    atmDir.forEach(async each => global.deleteFile(each).catch(e => console.error(e)))

    message.send(`Đã gửi thông báo đến ${can} nhóm, không thể gửi đến ${canNot} nhóm`);
}
