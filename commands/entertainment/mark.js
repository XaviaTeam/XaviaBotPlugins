import { loadImage, createCanvas } from "canvas";
import { join } from "path";

export const config = {
    name: "mark",
    version: "0.0.1-xaviabot-port",
    credits: "MewMew mod By hungdz30cm",
    description: "Generate a Mark Zuckerberg text image",
    usage: "[text]",
    cooldown: 10,
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

        let pathImg = join(global.cachePath, `_mark_${senderID}_${Date.now()}.png`);
        let text = args.join(" ");

        if (!text) return message.reply("Enter the content of the comment on the board");

        await global.downloadFile(pathImg, "https://i.imgur.com/3j4GPdy.jpg");

        let baseImage = await loadImage(pathImg);
        let canvas = createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.font = "400 45px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "start";

        let fontSize = 45;
        while (ctx.measureText(text).width > 2250) {
            fontSize--;
            ctx.font = `400 ${fontSize}px Arial, sans-serif`;
        }
        const lines = await wrapText(ctx, text, 440);
        ctx.fillText(lines.join('\n'), 95, 420);//comment
        ctx.beginPath();

        const imageBuffer = canvas.toBuffer();
        global.writeFile(pathImg, imageBuffer);

        await message.reply({ attachment: global.reader(pathImg) }).catch(e => console.error(e));

        global.deleteFile(pathImg);
    } catch (e) {
        console.error(e);
        message.reply("Error");
    }
}
