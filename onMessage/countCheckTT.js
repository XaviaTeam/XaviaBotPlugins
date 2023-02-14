export default function ({ message }) {
    if (message.threadID == message.senderID) return; // ignore message from bot (self
    if (!global.hasOwnProperty("checktt_cache")) return;

    try {
        const { threadID, senderID } = message;
        let threadDATA = global.checktt_cache.get(threadID);

        if (!threadDATA) {
            threadDATA = {
                day: [],
                week: [],
                all: []
            };
        }

        let findDay = threadDATA.day.find(item => item.id == senderID);
        let findWeek = threadDATA.week.find(item => item.id == senderID);
        let findAll = threadDATA.all.find(item => item.id == senderID);

        if (!findDay) {
            threadDATA.day.push({
                id: senderID,
                n: 1
            });
        } else {
            findDay.n += 1;
        }

        if (!findWeek) {
            threadDATA.week.push({
                id: senderID,
                n: 1
            });
        } else {
            findWeek.n += 1;
        }

        if (!findAll) {
            threadDATA.all.push({
                id: senderID,
                n: 1
            });
        } else {
            findAll.n += 1;
        }

        global.checktt_cache.set(threadID, threadDATA);
    } catch (error) {
        console.error(error);
    }
}
