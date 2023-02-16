import { join } from "path";

export const config = {
    name: "p",
    version: "0.0.1-xaviabot-port",
    permissions: [1],
    description: "tag toàn bộ thành viên",
    usage: "[Text]",
    cooldown: 0
};

const emptyChar = '\u200B';
export async function onCall({ message, args }) {
    try {
        const { threadID, senderID, type, messageReply } = message;

        const botID = global.api.getCurrentUserID();
        let text = '';
        if (args[0]) {
            text = args.join(" ")
        } else {
            text = "TT hay bị đánh đít 😾"
        }

        const mentions = message.participantIDs.filter(e => e != botID && e != senderID).map((e, i) => ({ tag: text[i] || emptyChar, id: e }))
        // console.log(mentions)

        if (type != "message_reply") return message.reply({ body: text, mentions });

        const link = messageReply.attachments;
        let imageData = [], cache = [];
        for (const e of link) {
            let fileName = e.url, ext;
            const audio = fileName.match("audioclip");
            if (audio != null) ext = ".mp3"
            else ext = fileName.split(".")[5].split("?")[0]

            let path = join(global.cachePath, `_atm_p_${threadID}_${Date.now()}.${ext}`)
            cache.push(path)
            await global.downloadFile(path, e.url);
            imageData.push(global.reader(path));
        }

        await message.reply({
            body: text,
            attachment: imageData,
            mentions
        }).catch(e => console.error(e));

        for (const e of cache) {
            global.deleteFile(e);
        }
    } catch (error) {
        console.log(error)
        return message.reply("Đã xảy ra lỗi")
    }
}
