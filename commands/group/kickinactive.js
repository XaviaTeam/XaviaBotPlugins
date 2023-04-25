const config = {
  name: "kickinactive",
  description: "Kick inactive members with 0 exp",
  usage: "",
  cooldown: 10,
  permissions: [1],
  credits: "XaviaTeam"
};

const langData = {
  "en_US": {
    "noInactiveMembers": "There are no inactive members with 0 exp in this thread",
    "kicked": "Kicked {count} inactive member(s) with 0 exp",
    "error": "An error occurred, please try again later",
    "noAdmin" : "Bot needed to be admin in order to kick"
  },
  "vi_VN": {
    "noInactiveMembers": "Không có thành viên nào không hoạt động với 0 exp trong nhóm này",
    "kicked": "Đã kick {count} thành viên không hoạt động với 0 exp",
    "error": "Đã có lỗi xảy ra, vui lòng thử lại sau",
    "noAdmin" : "Bot cần phải là quản trị viên để kick"
  },
  "ar_SY": {
    "noInactiveMembers": "لا يوجد أعضاء غير نشطين بـ 0 نقطة في هذه المجموعة",
    "kicked": "تم طرد {count} عضو غير نشط بـ 0 نقطة",
    "error": "لقد حدث خطأ، رجاء أعد المحاولة لاحقا",
    "noAdmin" : "يجب أن يكون البوت مشرفًا من أجل الركل"
  }
};

async function onCall({ message, getLang, data }) {
  if (!message.isGroup) return;
  const { MODERATORS } = global.config;
  const { threadID } = message;
  try {
    const threadInfo = data.thread.info;
    const { adminIDs } = threadInfo;
    if (!adminIDs.some(e => e.id == global.botID)) return message.reply(getLang("noAdmin"));

    const inactiveMembers = threadInfo.members.filter(member => {
      const keys = Object.keys(member);
      return keys.length === 1 && member[keys[0]];
    });
    let aIds = adminIDs.map(item => Object.values(item)).flat();
    
    const withoutBotID = inactiveMembers.filter(item => item.userID !== global.botID && !aIds.some(val => val === item.userID));
    const IDs = withoutBotID.map(item => Object.values(item)).flat();
    if (IDs.length === 0) return message.reply(getLang("noInactiveMembers"));

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

    await message.reply(getLang("kicked", { count }));
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
