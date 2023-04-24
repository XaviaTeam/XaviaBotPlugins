const config = {
  name: "bet",
  aliases: ["gamble"],
  description: "Place a bet on a coin flip",
  usage: "<amount>",
  cooldown: 5,
  credits: "TakiUwU"
};

const langData = {
  "en_US": {
    "bet.invalidAmount": "Invalid bet amount.",
    "bet.insufficientBalance": "You don't have enough money to place that bet.",
    "bet.result": "The coin landed on {result}! {message}"
  },
  "vi_VN": {
    "bet.invalidAmount": "Số tiền đặt cược không hợp lệ.",
    "bet.insufficientBalance": "Bạn không đủ tiền để đặt cược đó.",
    "bet.result": "Đồng xu rơi vào {result}! {message}"
  }
};

async function onCall({ message, args, getLang }) {
  const { Users } = global.controllers;
  const amount = parseInt(args[0]);

  if (isNaN(amount)) {
    return message.reply(getLang("bet.invalidAmount"));
  }

  const userBalance = await Users.getMoney(message.senderID);

  if (userBalance < amount) {
    return message.reply(getLang("bet.insufficientBalance"));
  }

  const flipResult = Math.random() < 0.5 ? "heads" : "tails";
  const isWin = flipResult === "heads";
  const winnings = isWin ? amount : -amount;
  const newBalance = userBalance + winnings;

  await Users.decreaseMoney(message.senderID, amount);
  await Users.increaseMoney(message.senderID, winnings);

  const resultMessage = isWin
    ? getLang("bet.result", { result: flipResult, message: `You won ${winnings}XC!` })
    : getLang("bet.result", { result: flipResult, message: `You lost ${amount}XC.` });

  message.reply(resultMessage);
}

export default {
  config,
  langData,
  onCall
};
