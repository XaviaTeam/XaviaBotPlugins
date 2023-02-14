export default async function ({ event }) {
    const { api } = global;
    const { threadID, author, logMessageData } = event;
    const { Threads, Users } = global.controllers;
    const getThread = await Threads.get(threadID) || {};

    const getThreadInfo = getThread.info || {};


    if (Object.keys(getThreadInfo).length === 0) return;
    const leftMemberIndex = getThreadInfo.members.findIndex(mem => mem.userID == logMessageData.leftParticipantFbId);
    if (leftMemberIndex > -1) {
        delete getThreadInfo.members[leftMemberIndex].exp;
    }

    const type = (author == logMessageData.leftParticipantFbId) ? "left" : "kicked";
    const authorName = (await Users.getInfo(author))?.name || author;

    if (logMessageData.leftParticipantFbId == botID) {
        // For: checktt advanced
        if (global.hasOwnProperty("checktt_cache")) {
            global.checktt_cache.delete(threadID);
        }


        getThreadInfo.isSubscribed = false;

        let atlertMsg = getLang(`plugins.events.unsubcribe.bot.${type}`, {
            authorName: authorName,
            authorId: author,
            threadName: getThreadInfo.name,
            threadId: threadID
        });
        for (const adid of global.config.MODERATORS) {
            global.sleep(300);
            if (adid != threadID) {
                api.sendMessage(atlertMsg, adid);
            }
        }

        return;
    }

    // For: checktt advanced
    if (global.hasOwnProperty("checktt_cache")) {
        let threadCACHE = global.checktt_cache.get(threadID);

        if (threadCACHE) {
            global.checktt_cache.set(threadID, {
                day: threadCACHE.day.filter(e => e.id != logMessageData.leftParticipantFbId),
                week: threadCACHE.week.filter(e => e.id != logMessageData.leftParticipantFbId),
                all: threadCACHE.all.filter(e => e.id != logMessageData.leftParticipantFbId)
            });
        }
    }

    let callback = async () => {
        const leftName = (await Users.getInfo(logMessageData.leftParticipantFbId))?.name || logMessageData.leftParticipantFbId;

        let atlertMsg = {
            body: (getThread?.data?.leaveMessage ?
                getThread.data.leaveMessage : getLang(`plugins.events.unsubcribe.${type}`))
                .replace(/\{leftName}/g, leftName),
            mentions: [{
                tag: leftName,
                id: logMessageData.leftParticipantFbId
            }]
        }

        const gifPath = `${global.mainPath}/plugins/events/unsubcribeGifs/${threadID}.gif`;
        if (global.isExists(gifPath)) {
            atlertMsg.attachment = [await global.getStream(gifPath)];
        }

        api.sendMessage(atlertMsg, threadID);
    }

    if (getThread?.data?.antiSettings?.antiOut && type == "left") {
        global.api.addUserToGroup(logMessageData.leftParticipantFbId, threadID, async (err) => {
            let needNotify = getThread?.data?.antiSettings?.notifyChange === true;
            if (err) {
                await callback();

                console.error(err);
                if (needNotify) global.api.sendMessage(getLang("plugins.events.unsubcribe.antiOut.error"), threadID);
            } else {
                if (needNotify) global.api.sendMessage(getLang("plugins.events.unsubcribe.antiOut.success"), threadID);
            }
        })
    } else await callback();

    await Threads.updateInfo(threadID, { members: getThreadInfo.members, isSubscribed: getThreadInfo.isSubscribed });
}
