import langdetect from "langdetect"

const config = {
  name: "genshin",
  description: "Genshin Impact character and weapon images",
  usage: "<category> <name>",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "Shahryar Salmaan"
};

const langData = {
  "en_US": {
    "invalidCategory": "Invalid category, available categories: character, weapon",
    "notFound": "Could not find {category} with name {name}",
    "error": "An error occurred, please try again later"
  },
  "vi_VN": {
    "invalidCategory": "Danh mục không hợp lệ, các danh mục hiện có: character, weapon",
    "notFound": "Không thể tìm thấy {category} với tên {name}",
    "error": "Đã xảy ra lỗi, vui lòng thử lại sau"
  },
  "ar_SY": {
    "invalidCategory": "الفئة غير صالحة ، الفئات المتاحة: character، weapon",
    "notFound": "تعذر العثور على {category} بالاسم {name}",
    "error": "حدث خطأ ، يرجى المحاولة مرة أخرى في وقت لاحق"
  }
};

async function onCall({ message, args, getLang }) {
  try {
    const category = args[0]?.toLowerCase();
    const name = args.slice(1).join(" ").toLowerCase();
    let lang = "en";

    if (category === "character") {
      if (/[\u0600-\u06FF]/.test(name)) {
        lang = "ar";
      }
      const url = encodeURI(`http://genshin.taki-workspace.repl.co/${lang}/character/${name}`);
      const response = await global.GET(url);
      const data = response.data;

      if (!data) {
        return message.reply(getLang("notFound", { category: "character", name }));
      }

      const imageStream = await global.getStream(data.image);
      await message.reply({
        attachment: [imageStream]
      });
    } else if (category === "weapon") {
      // Code to retrieve weapon image
    } else {
      return message.reply(getLang("invalidCategory"));
    }
  } catch (e) {
    console.error(e);
    message.reply(getLang("error"));
  }
}

export default {
  config,
  langData,
  onCall
};
