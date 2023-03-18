export const config = {
    name: "spank",
    version: "0.0.1-xaviabot-port-refactor",
    credits: "Mr.Aik3ro",
    description: "spank the user tagged",
    usage: "[Tag someone you need to spank]",
    cooldown: 5,
};

export async function onCall({ message }) {
    const { reply, mentions, react } = message;

    if (!mentions || !Object.keys(mentions)[0]) return reply("Please tag someone");

    return GET('https://apiservice1.kisara.app/satou/api/endpoint/spank')
        .then(async res => {
            let mention = Object.keys(mentions)[0],
                tag = mentions[mention].replace("@", "");

            await react("✅");
            await reply({
                body: "Spank! " + tag,
                mentions: [{
                    tag: tag,
                    id: mention
                }],
                attachment: await global.getStream(res.data.url)
            });
        })
        .catch(err => {
            console.error(err);
            reply("Error");
        })
}
