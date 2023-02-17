export const config = {
    name: "hug",
    version: "0.0.1-xaviabot-port-refactor",
    description: "Hug someone you tag",
    usage: "[tag]",
    cooldown: 5
};

export function onCall({ message }) {
    if (!Object.keys(message.mentions).length) return message.reply("tag a person bitch");

    return global.GET(`${global.xva_api.sfw}/hug`)
        .then(async res => {
            const mention = Object.keys(message.mentions)[0];
            const tag = message.mentions[mention].replace("@", "");

            message.reply({
                body: `${tag}, we just hugged, each other`,
                mentions: [
                    {
                        tag: tag,
                        id: mention
                    }
                ],
                attachment: await global.getStream(res.data.url)
            }).catch(console.error)
        })
        .catch(console.error);
}
