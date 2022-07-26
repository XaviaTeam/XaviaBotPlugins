export const info = {
    name: "info",
    about: "info bot and box",
    credits: "ntan"//Credits to the author of the plugin
}

function box() {
    const config = {
        name: "boxinfo",
        aliases: ["infobox", "boxin4"],
        description: "Xem thông tin nhóm chat",
        usage: "",
        permissions: 2,
        cooldown: 5
    }

    const onCall = async ({ message, controllers }) => {
        try {
            const { Threads } = controllers;
            const { reply, threadID } = message;
            const threadInfo = await Threads.getInfo(threadID);
            let icon = threadInfo.emoji || "👍";
            let threadName = threadInfo.name;
            let imageSrc = threadInfo.imageSrc;
            let tv = threadInfo.participantIDs.length;
            let qtv = threadInfo.adminIDs.length;
            const msg = {
                body: `===> Box Information <=== \n⇒ Name: ${threadName} \n⇒ ID: ${threadID} \n⇒ Emoji: ${icon}\n⇒ Admin Box: ${qtv}\n⇒ Member: ${tv}\n`
            }
            if (imageSrc) {
                msg.attachment = await getStream(imageSrc);
            }

            reply(msg);
            return;
        } catch (e) {
            console.error(e);
        }
    }
    return { config, onCall };
}

function bot() {
    const config = {
        name: "botinfo",
        aliases: ["infobot"],
        description: "Xem thông tin bot",
        usage: '',
        permissions: 2,
        cooldown: 5
    }

    const onCall = async ({ message, prefix }) => {
        try {
            const { reply } = message;
            const nameAdmin = client.config.MODERATORS;
            const nameBot = client.config.NAME;
            const time = process.uptime(),
                hours = Math.floor(time / (60 * 60)),
                minutes = Math.floor((time % (60 * 60)) / 60),
                seconds = Math.floor(time % 60);
            const msg = {
                body: `===> Bot Information <===\n⇒ Name: ${nameBot}\n⇒ Uptime: ${hours} : ${minutes} : ${seconds} \n` +
                    `⇒ Id Admin: ${nameAdmin}.` + `\n--------------\n` + `⇒ Prefix Bot: ${prefix}`
            }
            reply(msg);
            return;
        } catch (e) {
            console.error(e);
        }
    }
    return { config, onCall };
}
export const scripts = {
    commands: {
        bot,
        box
    }
}
