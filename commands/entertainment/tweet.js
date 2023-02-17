import { loadImage, createCanvas } from "canvas";
import { join } from "path";

export const config = {
    name: "tweet",
    version: "0.0.1-xaviabot-port-refactor",
    credits: "Joshua Sy",
    description: "",
    usage: "[text]",
    cooldown: 10
};

export function wrapText(ctx, text, maxWidth) {
    return new Promise(resolve => {
        if (ctx.measureText(text).width < maxWidth) return resolve([text]);
        if (ctx.measureText('W').width > maxWidth) return resolve(null);
        const words = text.split(' ');
        const lines = [];
        let line = '';
        while (words.length > 0) {
            let split = false;
            while (ctx.measureText(words[0]).width >= maxWidth) {
                const temp = words[0];
                words[0] = temp.slice(0, -1);
                if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
                else {
                    split = true;
                    words.splice(1, 0, temp.slice(-1));
                }
            }
            if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
            else {
                lines.push(line.trim());
                line = '';
            }
            if (words.length === 0) lines.push(line.trim());
        }
        return resolve(lines);
    });
}

export async function onCall({ message, args }) {
    try {
        const { senderID } = message;

        let pathImg = join(global.cachePath, `__tweet_${senderID}_${Date.now()}.png`);
        let text = args.join(" "),
            name = await global.controllers.Users.getName(senderID);

        if (!text) return message.reply("Please write something");

        let avatarPath = join(global.cachePath, `__tweet_avt_${senderID}_${Date.now()}.png`);

        await global.downloadFile(avatarPath, global.getAvatarURL(senderID));
        await global.downloadFile(pathImg, "https://i.imgur.com/dMiKIXM.png");

        let baseImage = await loadImage(pathImg);
        let image = await loadImage(avatarPath);

        let canvas = createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(baseImage, 5, 5, canvas.width, canvas.height);
        ctx.drawImage(image, 53, 35, 85, 85);
        ctx.font = "700 23px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "start";
        ctx.fillText(name, 160, 70);
        ctx.font = "400 16px Arial";
        ctx.fillStyle = "#BBC0C0";
        ctx.textAlign = "start";
        ctx.fillText(`@${name}`, 153, 99);
        ctx.font = "400 45px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "start";

        let fontSize = 250;
        while (ctx.measureText(text).width > 2600) {
            fontSize--;
            ctx.font = `500 ${fontSize}px Arial`;
        }
        const lines = await wrapText(ctx, text, 850);
        ctx.fillText(lines.join('\n'), 56, 180);
        ctx.beginPath();

        const imageBuffer = canvas.toBuffer();
        global.writeFile(pathImg, imageBuffer);

        await message.reply({ attachment: global.reader(pathImg) }).catch(console.error)

        global.deleteFile(pathImg);
        global.deleteFile(avatarPath);
    } catch (e) {
        console.error(e);
        message.reply("Error");
    }
}
