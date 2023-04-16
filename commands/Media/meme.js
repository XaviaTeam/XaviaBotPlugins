const config = {
  credits: "TakiUwU"
}

function onCall({ message }) {
  global.GET("https://meme-api.com/gimme")
    .then(async res => {
      try {
        let imgStream = await global.getStream(res.data.url);
        message.reply({
          body: res.data.title,
          attachment: imgStream
        });
      } catch {
        message.reply("Error!");
      }
    })
    .catch(_ => message.reply("Error!"));
}

export default {
  config,
  onCall
}
