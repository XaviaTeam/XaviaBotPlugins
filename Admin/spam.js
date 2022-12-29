const config = {
    credits: "Malik",
    isAbsolute: true,
    cooldown: 3
}

const spam = '\nSPAM'.repeat(200);

function onLoad() {
    global.dispatching = [];
}

const langData = {
    "vi_VN": {
        "stopped": "Stopped!",
        "notRunning": "Not running yet!",
        "alreadyRun": "Already run!"
    },
    "en_US": {
        "stopped": "Stopped!",
        "notRunning": "Not running yet!",
        "alreadyRun": "Already run!"
    }
}

async function onCall({ message, args, getLang }) {
    let dispatchTimes = parseInt(args[0]);
    let delayBetweenDispatch = parseInt(args[1]);

    if (args[0] == "stop") {
        if (global.dispatching.includes(message.threadID)) {
            global.dispatching = global.dispatching.filter(e => e != message.threadID);

            return message.reply(getLang("stopped"));
        } else {
            return message.reply(getLang("notRunning"));
        }
    }

    if (!dispatchTimes || isNaN(dispatchTimes) || dispatchTimes < 1) dispatchTimes = 100;
    if (!delayBetweenDispatch || isNaN(delayBetweenDispatch) || delayBetweenDispatch < 1) delayBetweenDispatch = 1;

    if (global.dispatching.includes(message.threadID))
        return message.reply(getLang("alreadyRun"));

    global.dispatching.push(message.threadID);

    let fail = 0;
    for (let i = 0; i < dispatchTimes; i++) {
        try {
            if (!global.dispatching.includes(message.threadID)) break;
            await message.send(spam);
            global.sleep(delayBetweenDispatch * 1000);
        } catch (error) {
            fail++;
            if (fail >= 3) break;
        }
    }

    global.dispatching = global.dispatching.filter(e => e != message.threadID);
}

export default {
    onLoad,
    langData,
    config,
    onCall
}
