const config = {
  name: "kickinactive",
  description: "Kick inactive members with less than specified EXP",
  usage: "",
  cooldown: 10,
  permissions: [1],
  credits: "TakiUwU && Isai"
};

const langData = {
  "en_US": {
    "noInactiveMembers": "There are no inactive members with less than {exp} EXP in this thread",
    "kicked": "Kicked {count} inactive member(s) with less than {exp} EXP",
    "error": "An error occurred, please try again later",
    "noAdmin": "Bot needed to be admin in order to kick",
    "invalidExp": "Invalid experience value"
  }
};

async function onCall({ message, getLang, data, args }) {
  if (!message.isGroup) return;
  const { MODERATORS } = global.config;
  const { threadID } = message;
  try {
    const threadInfo = data.thread.info;
    const { adminIDs } = threadInfo;
    if (!adminIDs.some(e => e.id == global.botID)) return message.reply(getLang("noAdmin"));

    let exp = parseInt(args[0]);
    if (isNaN(exp)) return message.reply(getLang("invalidExp"));

    const inactiveMembers = threadInfo.members.filter(member => {
      const keys = Object.keys(member);
      if (keys.length !== 2) return false;
      const [key, value] = Object.entries(member)[1];
      return key === "exp" && value < exp;
    });

    let aIds = adminIDs.map(item => Object.values(item)).flat();

    const withoutBotID = inactiveMembers.filter(item => item.userID !== global.botID && !aIds.some(val => val === item.userID));
    const IDs = withoutBotID.map(item => item.userID);
    if (IDs.length === 0) return message.reply(getLang("noInactiveMembers", { exp }));

    let count = 0;
    for (const member of IDs) {
      try {
        await global.api.removeUserFromGroup(member, threadID);
        count++;
        global.sleep(500);
      } catch (e) {
        console.error(e);
      }
    }

    await message.reply(getLang("kicked", { count, exp }));
  } catch (e) {
    console.error(e);
    message.reply(getLang("error"));
  }
}

export default {
  config,
  langData,
  onCall
}
