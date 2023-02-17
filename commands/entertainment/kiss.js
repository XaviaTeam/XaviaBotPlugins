import { join } from "path";
import { loadImage, createCanvas } from "canvas";

export const config = {
    name: "kiss",
    version: "0.0.1-xaviabot-port-refactor",
    credits: "Clarence DK",
    description: "",
    usage: "[tag]",
    cooldown: 5
};

const kissPath = join(global.assetsPath, "kiss-template.png");
export async function onLoad() {
    global.downloadFile(kissPath, "https://i.imgur.com/T1IZTbG.jpeg");
}

export async function makeImage({ one, two }) {
    const template = await loadImage(kissPath);

    let avatarPathOne = join(global.cachePath, `avt_${one}.png`);
    let avatarPathTwo = join(global.cachePath, `avt_${two}.png`);

    await global.downloadFile(avatarPathOne, global.getAvatarURL(one));
    await global.downloadFile(avatarPathTwo, global.getAvatarURL(two));

    const avatarOne = await loadImage(avatarPathOne);
    const avatarTwo = await loadImage(avatarPathTwo);

    const avatarOneCircle = await global.circle(avatarOne, avatarOne.width / 2, avatarOne.height / 2, avatarOne.width / 2);
    const avatarTwoCircle = await global.circle(avatarTwo, avatarTwo.width / 2, avatarTwo.height / 2, avatarTwo.width / 2);

    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatarOneCircle, 330, 100, 200, 200);
    ctx.drawImage(avatarTwoCircle, 500, 130, 190, 190);

    const pathImg = join(global.cachePath, `kiss_${one}_${two}.png`);
    const imageBuffer = canvas.toBuffer();

    global.deleteFile(avatarPathOne);
    global.deleteFile(avatarPathTwo);

    global.writeFile(pathImg, imageBuffer);
    return pathImg;
}

export async function onCall({ message }) {
    const { senderID, mentions } = message;
    const mention = Object.keys(mentions);
    if (!mention[0]) return message.reply("please tag a person.");
    else {
        const one = senderID, two = mention[0];
        return makeImage({ one, two })
            .then(async path => {
                await message.reply({
                    attachment: global.reader(path)
                }).catch(e => {
                    message.reply("An error occurred, please try again.");
                    console.error(e);
                });

                global.deleteFile(path);
            })
            .catch(e => {
                message.reply("An error occurred, please try again.");
                console.error(e);
            });
    }
}
