const config = {
  name: "roll",
  aliases: ["dice"],
  description: "Roll a dice",
  usage: "<bet amount>",
  cooldown: 5,
  credits: "TakiUwU"
};

const langData = {
  "en_US": {
    "roll.invalidAmount": "Invalid bet amount.",
    "roll.insufficientBalance": "You don't have enough money to place that bet.",
    "roll.result": "You rolled a {result}! {message}"
  },
  "vi_VN": {
    "roll.invalidAmount": "Số tiền đặt cược không hợp lệ.",
    "roll.insufficientBalance": "Bạn không đủ tiền để đặt cược đó.",
    "roll.result": "Bạn đã tung được {result}! {message}"
  }
};

async function onCall({ message, args, getLang }) {
  const { Users } = global.controllers;
  const amount = parseInt(args[0]);

  if (isNaN(amount)) {
    return message.reply(getLang("roll.invalidAmount"));
  }

  const userBalance = await Users.getMoney(message.senderID);

  if (userBalance < amount) {
    return message.reply(getLang("roll.insufficientBalance"));
  }

  const rollResult = Math.floor(Math.random() * 6) + 1;
  const isWin = rollResult >= 4;
  const winnings = isWin ? amount * 2 : -amount;
  const newBalance = userBalance + winnings;

  await Users.decreaseMoney(message.senderID, amount);
  await Users.increaseMoney(message.senderID, winnings);

  const resultMessage = isWin
    ? getLang("roll.result", { result: rollResult, message: `You won ${winnings}XC!` })
    : getLang("roll.result", { result: rollResult, message: `You lost ${amount}XC.` });

  message.reply(resultMessage);
}

export default {
  config,
  langData,
  onCall
};
