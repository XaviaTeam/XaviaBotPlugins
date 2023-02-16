import { join } from "path";

export const config = {
    name: "pair",
    version: "0.0.1-xaviabot-port",
    description: "Pairing",
    cooldown: 15
};

const lovePath = join(global.assetsPath, "love_pairing.png");
export async function onLoad() {
    global.downloadFile(lovePath, "https://i.ibb.co/2g0wdVV/heart-icon-14.png").catch(console.error);
}

export async function onCall({ message }) {
    try {
        const { participantIDs, senderID } = message;
        const botID = api.getCurrentUserID();
        const listUserID = participantIDs.filter(ID => ID != botID && ID != senderID);

        let tle = Math.floor(Math.random() * 101);
        let id = listUserID[Math.floor(Math.random() * listUserID.length)];

        let namee = await global.controllers.Users.getName(senderID);
        let name = await global.controllers.Users.getName(id);

        let arraytag = [
            { id: senderID, tag: namee },
            { id: id, tag: name }
        ]

        const avtPath = join(global.cachePath, `${senderID}.png`);
        const avtPath2 = join(global.cachePath, `${id}.png`);

        await global.downloadFile(avtPath, global.getAvatarURL(senderID));
        await global.downloadFile(avtPath2, global.getAvatarURL(id));

        let atms = [];

        atms.push(global.reader(avtPath));
        atms.push(global.reader(lovePath));
        atms.push(global.reader(avtPath2));

        let msg = {
            body: `Successful pairing!\nWish you two hundred years of happiness\nDouble ratio: ${tle}%\n${namee} + ${name}`,
            mentions: arraytag,
            attachment: atms
        }
        await message.reply(msg).catch(e => console.error(e));

        global.deleteFile(avtPath);
        global.deleteFile(avtPath2);
    } catch (error) {
        console.log(error);
        message.reply("Error!");
    }
}
