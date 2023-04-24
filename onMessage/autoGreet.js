const langData = {
    "en_US": {
        "delayedGreet": [
            "Hi!",
            "Hello!",
            "Yo!"
        ]
    },
    "vi_VN": {
        "delayedGreet": [
            "Xin chào!",
            "Chào bạn!",
            "Chào cậu!"
        ]
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function onCall({ message, getLang }) {
    if (["hi", "hello", "yo"].includes(message.body.toLowerCase())) {
        const greetings = getLang("delayedGreet");
        const greeting = greetings[Math.floor(Math.random() * greetings.length)]; // Select a random greeting
        await sleep(5000); // Wait 5 seconds
        message.reply(getLang(greeting));
    }

    return;
}

export default {
    langData,
    onCall
}
