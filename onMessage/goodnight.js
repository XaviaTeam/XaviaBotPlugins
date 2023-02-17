import { join } from "path";

export const config = {
    name: "good-night",
    version: "0.0.1-xaviabot-refactor",
    credits: "Choru tiktokers",
    description: "good night",
};

const gngifPath = join(global.assetsPath, "gn.gif");
export async function onLoad() {
    await downloadFile(gngifPath, "https://i.ibb.co/V90WrN0/f9f6b9fb33c2c998a456ad845a966d82.gif");
}

export async function onCall({ message }) {
    const conditions = [
        "good eve",
        "evening",
        "magandang gabi"
    ]

    if (conditions.some(c => message.body.toLowerCase().startsWith(c))) {
        message.reply({
            body: "🌃ɢᴏᴏᴅɴɪɢʜᴛ ᴍʏ ᴅᴇᴀʀ ꜰʀɪᴇɴᴅ, ꜱʟᴇᴇᴘ ᴡᴇʟʟ ꜰᴏʀ ʙᴇᴛᴛᴇʀ ᴍᴇɴᴛᴀʟ ᴘᴇʀꜰᴏʀᴍᴀɴᴄᴇ ɪɴ ᴛʜᴇ ᴜᴘᴄᴏᴍɪɴɢ ᴅᴀʏꜱ⏳🌠",
            attachment: global.reader(gngifPath)
        })
        message.react("🌃")
    }
}
