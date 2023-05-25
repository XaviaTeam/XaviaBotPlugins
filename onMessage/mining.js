//trash coder
import axios from'axios'
export const config = {
    name: "mining",
    version: "0.0.1",
    credits: "Benggg",
    description: "game vui, mine help để coi hướng dẫn"
};
let sto = [
  {
    id: "x15",
    price: 500,
    name: "x1.5🪙",
    use: "x1.5🪙",
    Type: "One time use",
  },
  {
    id: "x115",
    price: 500,
    name: "x1.15🌟",
    use: "x1.15🌟",
    Type: "One time use",
  },
  {
    id: "x13",
    price: 750,
    name: "x1.3🌟",
    use: "x1.3🌟",
    Type: "One time use",
  },
  { id: "x2", price: 700, name: "x2🪙", use: "x2🪙", Type: "One time use" },
  {
    id: "x25",
    price: 850,
    name: "x2.5🪙",
    use: "x2.5🪙",
    Type: "One time use",
  },
  { id: "x2luck", price: 700, name: "x2☘️", use: "x2☘️", Type: "One time use" },
  { id: "x3", price: 1000, name: "x3🪙", use: "x3🪙", Type: "One time use" },
  { id: "x3luck", price: 950, name: "x3☘️", use: "x3☘️", Type: "One time use" },
  {
    id: "infpack",
    price: 1000,
    name: "🎒MegaPack",
    use: "Unlimited Capatity",
    Type: "One time use",
  },
  {
    id: "automine",
    price: 5000,
    name: "⛏⚙️Mining Machine",
    use: "Automatically sell your mining if your pack get full",
    Type: "Always",
    ps: "Quá bá, không thể rẻ hơn",
  },
  {
    id: "eff1",
    price: 500,
    name: "Effecency Ⅰ",
    use: "mine x1.2 faster",
    Type: "Always",
  },
  {
    id: "eff2",
    price: 650,
    name: "Effecency Ⅱ",
    use: "mine x1.5 faster",
    Type: "Always",
  },
  {
    id: "eff3",
    price: 800,
    name: "Effecency Ⅲ",
    use: "mine x1.8 faster",
    Type: "Always",
  },
  {
    id: "eff4",
    price: 1150,
    name: "Effecency Ⅳ",
    use: "mine x2 faster",
    Type: "Always",
  },
  {
    id: "eff5",
    price: 1500,
    name: "Effecency Ⅴ",
    use: "mine x2.5 faster",
    Type: "Always",
  },
  {
    id: "for1",
    price: 650,
    name: "Fortune Ⅰ",
    use: "x1.2 rare item rate",
    Type: "Always",
  },
  {
    id: "for2",
    price: 850,
    name: "Fortune Ⅱ",
    use: "1.4 rare item rate",
    Type: "Always",
  },
  {
    id: "for3",
    price: 1200,
    name: "Fortune Ⅲ",
    use: "1.5 rare item rate",
    Type: "Always",
  },
  {
    id: "double1",
    price: 1250,
    name: "Duplicated Ⅰ",
    use: "+7% to double your item you mined",
    Type: "Always",
  },
  {
    id: "double2",
    price: 1500,
    name: "Duplicated Ⅱ",
    use: "+15% to double your item you mined",
    Type: "Always",
  },
    {
    id: "reshop",
    price: 1500,
    name: "Wandering trader",
    use: "+15% to double your item you mined",
    Type: "Use now",
  },
      {
    id: "random",
    price: 1500,
    name: "Loot Bag",
    use: "random an item with the same chance",
    Type: "Use now",
  },
];
const aloop = "Nhóm mới:";
async function random(rate, time) {
  try {
    //  let rate = {"Dia":3,"Gold":15,"Iron":30,"Coal":50,"Stone":"."}
    let out = [];
    let get = {};
    for (let i = 0; i < time; i++) {
      let x = Math.random() * 100;
      switch (true) {
        case x >30 - rate[Object.keys(rate)[0]]:
          out.push(Object.keys(rate)[0]);
          break;
        case x >
          100 - (rate[Object.keys(rate)[1]] + rate[Object.keys(rate)[0]]):
          out.push(Object.keys(rate)[1]);
          break;
        case x >
          100 -
            (rate[Object.keys(rate)[2]] +
              rate[Object.keys(rate)[1]] +
              rate[Object.keys(rate)[0]]):
          out.push(Object.keys(rate)[2]);
          break;
        case x >
          100 -
            (rate[Object.keys(rate)[3]] +
              rate[Object.keys(rate)[2]] +
              rate[Object.keys(rate)[1]] +
              rate[Object.keys(rate)[0]]):
          out.push(Object.keys(rate)[3]);
          break;
        default:
          out.push(Object.keys(rate)[4]);
      }
    }
    out.forEach(function (x) {
      get[x] = (get[x] || 0) + 1;
    });
   // console.log({ get, out });
    return { get, out };
  } catch (err) {
    console.error(err);
  }
}
async function use({ message, args }) {

  const { Users } = global.controllers;
  let threadData = await Users.getData(message.senderID);
  const thread = await global.api.getThreadInfo(message.senderID);
  let game = threadData.game;
  const memberIndex = game.findIndex((member) => member.id == message.senderID);

    const edex = game[memberIndex].vatpham.findIndex((member) => member.name == "random");
  let da = [10,20,30]
      const dex = game[memberIndex].count.findIndex((member) => member.name == "usetotal");
const countl = game[memberIndex].count[dex].value
switch (true) {
case ((countl>da[0])&&(game[memberIndex].count[dex].level <1)):
    game[memberIndex].count[dex].level = 1
      message.send(`Đạt thành tựu "Người chơi đồ Ⅰ". Nhận 1x Loot Bag`)
game[memberIndex].vatpham[edex].numb += 1
    break
case countl>da[1]&&game[memberIndex].count[dex].level <2:
        game[memberIndex].count[dex].level = 2
      message.send(`Thành tựu "Người chơi đồ Ⅰ"➩"Người chơi đồ Ⅱ".Tăng thời gian boost〚15➩18〛, nhận 2x Loot Bag`)
game[memberIndex].vatpham[edex].numb += 2
break
case countl>da[2]&&game[memberIndex].count[dex].level <3:
        game[memberIndex].count[dex].level = 3
      message.send(`Thành tựu "Người chơi đồ Ⅱ"➩"Người chơi đồ Ⅲ".Tăng thời gian boost〚18➩20〛, nhận 3x Loot Bag`)
  game[memberIndex].vatpham[edex].numb += 3
break
}

  
  try {
    let min = "";
    if (args[2] == undefined) {
      return message.send(`❎Sai cú pháp.`);
    }
    const Index = game[memberIndex].vatpham.findIndex(
      (member) => member.name == args[2]
    );
    const undex = sto.findIndex((member) => member.id == args[2]);


   // console.log(Index);
  //  console.log(sto[undex].Type == "Use now");
    if (Index !== -1) {
          if (sto[undex].Type == "Use now") {
          if (game[memberIndex].vatpham[Index].name == "reshop"){ if (game[memberIndex].vatpham[Index].numb == 0) {return message.send(`❎Không có ${sto[undex].name} để sử dụng.`);}
            const tong = game.findIndex((membe) => membe.id == aloop);
                if (game[tong].wander) {return message.send(`❎Đã sử dụng rồi, vui lòng chờ shop reset.`)}
          game[memberIndex].vatpham[Index].numb =
            game[memberIndex].vatpham[Index].numb - 1
        game[memberIndex].count[dex].value +=     1


                                                                                                    
           let item2 = await renew({ message });
          game[tong].shop2 = item2;
              game[tong].wander = true
                                                                                                                  return message.send(`✅Đã triệu hồi wandering trader.Check shop để xem thêm.`)
           }
            }
      if (sto[undex].Type == "One time use") {
        if (game[memberIndex].vatpham[Index].numb > 0) {
          game[memberIndex].vatpham[Index].numb =
            game[memberIndex].vatpham[Index].numb - 1;
          if (
            Date.now() >
            game[memberIndex].boosttime[Index].time +
              game[memberIndex].boosttime[Index].dura
          ) {
            game[memberIndex].boosttime[Index].time = Date.now();
            game[memberIndex].boosttime[Index].dura = 15 * 60 * 1000;
            console.log("new");
          } else {
            game[memberIndex].boosttime[Index].dura =
              game[memberIndex].boosttime[Index].dura + 15 * 60 * 1000;
          }
          let min = -Math.round(
            (Date.now() -
              game[memberIndex].boosttime[Index].time -
              game[memberIndex].boosttime[Index].dura) /
              60 /
              1000
          );
          var hour =
            Math.floor(min / 60) > 0 ? `${Math.floor(min / 60)} giờ` : "";
          var min2 =
            Math.floor(min / 60) > 0 ? min - Math.floor(min / 60) * 60 : min;
        game[memberIndex].count[dex].value +=     1
          return message.send(
            `Sử dụng thành công ${sto[undex].name}. Thời giạn còn lại:${hour} ${min2} phút.Còn dư ${game[memberIndex].vatpham[Index].numb}`
          );
        } else return message.send(`Không có ${sto[undex].name} để sử dụng.`);
      } 
      if (sto[undex].Type == "Always") {
        let book = args[2];
        let char = args[2].length;
        let lvl = args[2].charAt(char - 1);
        let boo = args[2].split("");
        boo[char - 1] = "";
        let boool = boo.join("");
        if (book == "automine") {        let check = threadData.game[memberIndex].picenchant.findIndex(
          (member) => member.name == "automine"
        );
                                         let check2 = threadData.game[memberIndex].vatpham.findIndex(
          (member) => member.name == "automine"
        );
            if (threadData.game[memberIndex].picenchant[check].lv !== 0) {
          return message.send(
            `❎Cúp đã được cường hóa ${boool}.Gỡ cường hóa bằng /miner tach`
          );
        }
        if (threadData.game[memberIndex].exp < 300) {
          return message.send(`❎Không đủ exp để cường hóa`);
        }
        if (threadData.game[memberIndex].vatpham[check2].numb == 0) {
          return message.send(`❎Không có sách để cường hóa`);
        } else {
          threadData.game[memberIndex].vatpham[check2].numb =
            threadData.game[memberIndex].vatpham[check2].numb - 1;
          threadData.game[memberIndex].picenchant[check].lv = true
          threadData.game[memberIndex].exp =
            threadData.game[memberIndex].exp - 300;
    game[memberIndex].count[dex].value += 1
          return message.send(`✅Đã cường hóa thành công`);
        }}
        let check = threadData.game[memberIndex].picenchant.findIndex(
          (member) => member.name == boool
        );
        let check2 = threadData.game[memberIndex].vatpham.findIndex(
          (member) => member.name == boool + lvl
        );
                    console.log(book);

        if (check == -1) {
          return message.send(`❎Không tồn tại sách này`);
        }
        if (check2 == -1) {
          return message.send(`❎Không tồn tại level này`);
        }
        if (threadData.game[memberIndex].picenchant[check].lv !== 0) {
          return message.send(
            `❎Cúp đã được cường hóa ${boool}.Gỡ cường hóa bằng /miner tach`
          );
        }
        if (threadData.game[memberIndex].exp < 300) {
          return message.send(`❎Không đủ exp để cường hóa`);
        }
        if (threadData.game[memberIndex].vatpham[check2].numb == 0) {
          return message.send(`❎Không có sách để cường hóa`);
        } else {
          threadData.game[memberIndex].vatpham[check2].numb =
            threadData.game[memberIndex].vatpham[check2].numb - 1;
          threadData.game[memberIndex].picenchant[check].lv = Number(lvl);
          threadData.game[memberIndex].exp =
            threadData.game[memberIndex].exp - 300;
    game[memberIndex].count[dex].value += 1
          return message.send(`✅Đã cường hóa thành công`);
        }
        return message.send(`Lỗi mẹ gì đó rồi`);
      } 
    } else return message.send(`Không tồn tại sách này`);
  } catch (err) {
    console.error(err);
  }
}
async function tach({ message, args }) {
  const { Users } = global.controllers;
  let threadData = await Users.getData(message.senderID);
  const thread = await global.api.getThreadInfo(message.senderID);
  let game = threadData.game;
  const memberIndex = game.findIndex((member) => member.id == message.senderID);
  try {
    if (args[2] == undefined) {
      return message.send(`✍Đã sử dụng`);
    }
    if (args[2] == "automine") {
  let check = threadData.game[memberIndex].picenchant.findIndex(
          (member) => member.name == "automine"
        );
        
        let check2 = threadData.game[memberIndex].vatpham.findIndex(
          (member) =>
            member.name ==
            "automine"
        );
        if (check == -1) {
          return message.send(`❎Không tồn tại cường hóa này`);
        }
        if (threadData.game[memberIndex].picenchant[check].lv == 0) {
          return message.send(`❎Cúp chưa được cường hóa ${boool}.`);
        }
        if (threadData.game[memberIndex].exp < 300) {
          return message.send(`❎Không đủ exp để tách cường hóa`);
        }

        threadData.game[memberIndex].vatpham[check2].numb =
          threadData.game[memberIndex].vatpham[check2].numb + 1;
        threadData.game[memberIndex].picenchant[check].lv = 0;
        threadData.game[memberIndex].exp =
          threadData.game[memberIndex].exp - 300;
        return message.send(`✅Đã tách cường hóa thành công✂︎✂︎✂︎`);
           
         }
    const Index = game[memberIndex].picenchant.findIndex(
      (member) => member.name == args[2]
    );
    const undex = sto.findIndex((member) => member.id == args[2] + "2");
    if (Index !== -1) {
      if (sto[undex].Type == "One time use") {
      } else {
        let book = args[2];

        let check = threadData.game[memberIndex].picenchant.findIndex(
          (member) => member.name == book
        );
        
        let check2 = threadData.game[memberIndex].vatpham.findIndex(
          (member) =>
            member.name ==
            book + threadData.game[memberIndex].picenchant[check].lv
        );
        if (check == -1) {
          return message.send(`❎Không tồn tại cường hóa này`);
        }
        if (threadData.game[memberIndex].picenchant[check].lv == 0) {
          return message.send(`❎Cúp chưa được cường hóa ${boool}.`);
        }
        if (threadData.game[memberIndex].exp < 300) {
          return message.send(`❎Không đủ exp để tách cường hóa`);
        }

        threadData.game[memberIndex].vatpham[check2].numb =
          threadData.game[memberIndex].vatpham[check2].numb + 1;
        threadData.game[memberIndex].picenchant[check].lv = 0;
        threadData.game[memberIndex].exp =
          threadData.game[memberIndex].exp - 300;
        return message.send(`✅Đã tách cường hóa thành công`);

        return message.send(`Lỗi mẹ gì đó rồi`);
      }
    } else return message.send(`Không tồn tại cường hóa này`);
  } catch (err) {
    console.error(err);
  }
}
async function showinfo({ message }) {
  try {
    var index = message.body;
    let rank = "";
    switch (true) {
      case sto[index - 1].price > 2000:
        rank =
          "Admin:)) or ko xác định hoặc có thế up item cao hơn but admin up xót code";
        break;
      case sto[index - 1].price > 1500:
        rank = "Mythical";
        break;
      case sto[index - 1].price > 1250:
        rank = "Lengendary";
        break;
      case sto[index - 1].price >300:
        rank = "Epic";
        break;
      case sto[index - 1].price > 900:
        rank = "Rare";
        break;
      case sto[index - 1].price > 750:
        rank = "Uncommon";
        break;
      case sto[index - 1].price > 0:
        rank = "Common";
        break;
    }

    if ((index > 0) & (index < sto.length)) {
      return message.send(
        `Thông tin vật phẩm:\n➫︎Tên:${
          sto[index - 1].name
        }\n➫︎Cấp bậc:*${rank}*\n➫︎Loại:${sto[index - 1].Type}\n➫︎Tác dụng:${
          sto[index - 1].use
        }${sto[index - 1].ps == undefined ? "" : `\n➫︎P/s:${sto[index - 1].ps}`}`
      );
    } else return message.send(`Số không hợp lệ`);
  } catch (err) {
    console.error(err);
  }
}
async function getinfo({ message }, arr) {
  try {
    let name = [];
    let price = [];
    let use = [];
    let id = [];
    let type = [];
    for (let index = 0; index < Object.keys(arr).length; index++) {
      let ind = sto.findIndex((membe) => membe.id == arr[`item0${index + 1}`]);
      name.push(sto[ind].name);
      use.push(sto[ind].use);
      price.push(sto[ind].price);
      id.push(sto[ind].id);
      type.push(sto[ind].Type);
    }

    return { name, price, use, id, type };
  } catch (err) {
    console.error(err);
  }
}
async function checkrank(ind) {
  try {
    var index = ind + 1;
    let rank = "";
    switch (true) {
      case sto[index - 1].price > 2000:
        rank =
          "Admin:)) or ko xác định hoặc có thế up item cao hơn but admin up xót code";
        break;
      case sto[index - 1].price > 1500:
        rank = "Mythical";
        break;
      case sto[index - 1].price > 1250:
        rank = "Lengendary";
        break;
      case sto[index - 1].price >300:
        rank = "Epic";
        break;
      case sto[index - 1].price > 900:
        rank = "Rare";
        break;
      case sto[index - 1].price > 750:
        rank = "Uncommon";
        break;
      case sto[index - 1].price > 0:
        rank = "Common";
        break;
    }
    return rank;
  } catch (err) {
    console.error(err);
  }
}
async function help({ message, args }) {
  const { Users } = global.controllers;
  let threadData = await Users.getData(message.senderID);
  const thread = await global.api.getThreadInfo(message.senderID);
  let game = threadData.game;

  try {
    return message.send(`Dùng /miner help +\n "mine" \n"command"\n"item"
`);
  } catch (err) {
    console.error(err);
  }
}
async function buy({ message, eventData }) {
  try {
    let { arr ,arr2} = await eventData;
    const { Users } = global.controllers;
    let threadData = await Users.getData(message.senderID);
    const thread = await global.api.getThreadInfo(message.senderID);
    let game = threadData.game;
    const memberIndex = game.findIndex(
      (member) => member.id == message.senderID
    );
    let info = game[memberIndex];
    const text = message.body;
    const myArray = text.split(" ");

    if (myArray[1] !== undefined) {
      return message.send(`Số không hợp lệ./miner help để biết thêm`);
    }
    if ((myArray[0] <= Object.keys(arr).length) & (myArray[0] > 0)) {
      const Index = sto.findIndex(
        (member) => member.id == arr[`item0${myArray[0]}`]
      );

      if (game[memberIndex].exp < sto[Index].price) {
        return message.send(
          `❎Cần ${sto[Index].price}🌟 để nâng mua. Số dư:${info.exp}🌟`
        );
      } else {
        const iindex = info.vatpham.findIndex(
          (member) => member.name == sto[Index].id
        );
        if (info.vatpham[iindex].numb == undefined) {
          info.vatpham[iindex].numb = 1;
        } else {
          info.vatpham[iindex].numb = info.vatpham[iindex].numb + 1;
        }
        info.exp = info.exp - sto[Index].price;
                  game[memberIndex].count[dex].value +=     1
      const dex = game[memberIndex].count.findIndex((member) => member.name == "buytotal");
        return message.send(
          `✅Đã sử dụng ${sto[Index].price}🌟 để mua. Số dư:${info.exp}🌟`
        );
      }
    }
          if ((myArray[0] <= Object.keys(arr).length+Object.keys(arr2).length) & (myArray[0] > Object.keys(arr).length)) {
      const Index = sto.findIndex(
        (member) => member.id == arr2[`item0${myArray[0]-Object.keys(arr).length}`]
      );

      if (game[memberIndex].exp < sto[Index].price) {
        return message.send(
          `❎Cần ${sto[Index].price}🌟 để nâng mua. Số dư:${info.exp}🌟`
        );
      } else {
        const iindex = info.vatpham.findIndex(
          (member) => member.name == sto[Index].id
        );
        if (info.vatpham[iindex].numb == undefined) {
          info.vatpham[iindex].numb = 1;
        } else {
          info.vatpham[iindex].numb = info.vatpham[iindex].numb + 1;
        }
        info.exp = info.exp - sto[Index].price;
                  game[memberIndex].count[dex].value +=     1
      const dex = game[memberIndex].count.findIndex((member) => member.name == "buytotal");
        return message.send(
          `✅Đã sử dụng ${sto[Index].price}🌟 để mua. Số dư:${info.exp}🌟`
        );
      }
    }
    else {
      return message.send(`Số không hợp lệ`);
    }
  } catch (err) {
    console.error(err);
  }
}
async function ep({ message, args }) {
  const { Users } = global.controllers;
  let threadData = await Users.getData(message.senderID);
  const thread = await global.api.getThreadInfo(message.senderID);
  let game = threadData.game;
  try {
    const memberIndex = game.findIndex(
      (member) => member.id == message.senderID
    );
    let info = game[memberIndex];
    let book = args[2] + args[3];
    let book2 = args[2] + (Number(args[3]) + 1);
    let ind = sto.findIndex((membe) => membe.id == book);
    let n = ind + 1;
    let checkk = threadData.game[memberIndex].vatpham.findIndex(
      (member) => member.name == args[2] + (Number(args[3]) + 1)
    );
    let check = threadData.game[memberIndex].vatpham.findIndex(
      (member) => member.name == args[2] + args[3]
    );
    let ind2;
    if (args[3] == 0) message.send(`❎Sách này không thể nâng cấp.`);
    console.error(checkk);
    if (checkk !== -1) {
      ind2 = sto.findIndex((membe) => membe.id == book2);
      if (threadData.game[memberIndex].vatpham[check].numb == undefined) {
        return message.send(`❎Không có sách để ép`);
      }
      if (threadData.game[memberIndex].vatpham[check].numb < 2) {
        return message.send(`❎Không đủ sách để ép`);
      }
      if (threadData.game[memberIndex].exp < 200) {
        return message.send(`❎Không đủ exp để ép`);
      }

      threadData.game[memberIndex].exp = threadData.game[memberIndex].exp - 200;
      threadData.game[memberIndex].vatpham[checkk].numb =
        threadData.game[memberIndex].vatpham[checkk].numb + 1;
      threadData.game[memberIndex].vatpham[check].numb =
        threadData.game[memberIndex].vatpham[check].numb - 2;
      return message.send(
        `✅Sử dụng 200🌟 ép 2x ${sto[ind].name}《${await checkrank(
          ind
        )}》 thành ${sto[ind2].name}《${await checkrank(n)}》☄️☄️☄️`
      );
    } else return message.send(`❎Sách này đã đạt cấp độ tối đa.`);
  } catch (err) {
    console.error(err);
  }
}
async function renew({ message }) {
  try {
    const itemshop = await random({ five: 10, four: 90 }, 1)
    let numitem = 0;
    if (itemshop.out[0] == "five") {
      numitem = 5;
    } else {
      numitem = 4;
    }

    const item01 = (await random({ x15: 35, x2: 15, x25: 15, x2luck: 35 }, 1))
      .out[0];
    const item012 = (await random({ x15: 35, x2: 15, x25: 15, x2luck: 35 }, 1))
      .out[0];
    let item022 = (
      await random({ x3: 35, x3luck: 35, infpack: 15, automine: 15 }, 1)
    ).out[0];
    const item03 = (await random({ eff1: 35, eff2: 20, eff3: 10, for1: 35 }, 1))
      .out[0];
    const item032 = (
      await random({ eff1: 35, eff2: 20, eff3: 10, for1: 35 }, 1)
    ).out[0];
    const item042 = (
      await random({ eff4: 35, eff5: 15, for2: 35, for3: 15 }, 1)
    ).out[0];
    const item05 = (
      await random({ infpack: 25, automine: 25, double1: 25, double2: 25 }, 1)
    ).out[0];
    let item02 = (await random({ item022: "35", item01: "65" }, 1)).out[0];
    if (item02 == "item022") {
      item02 = item022;
    } else {
      item02 = item012;
    }
    let item04 = (await random({ item042: "35", item03: "65" }, 1)).out[0];
    if (item04 == "item042") {
      item04 = item042;
    } else {
      item04 = item032;
    }
    if (numitem == 5) {
      return { item01, item02, item03, item04, item05 };
    } else {
      //message.send(`Mặt hàng có hôm nay:\n❶${item01}\n❷${item02}\n❸${item03}\n❹${item04}`)
      return { item01, item02, item03, item04 };
    }
  } catch (err) {
    console.error(err);
  }
}
async function show({ message, args }) {
  const { Users } = global.controllers;
  let threadData = await Users.getData(message.senderID);
  const thread = await global.api.getThreadInfo(message.senderID);
  let game = threadData.game;
  const memberIndex = game.findIndex((member) => member.id == message.senderID);
  try {
    const tong = game.findIndex((membe) => membe.id == aloop);
    let vp = [];
    for (let x in game[memberIndex].vatpham) {
      if (game[memberIndex].vatpham[x].numb !== 0) {
        const index = sto.findIndex(
          (membe) => membe.id == game[memberIndex].vatpham[x].name
        );
        vp.push({
          id: game[memberIndex].vatpham[x].name,
          numb: game[memberIndex].vatpham[x].numb,
          name: sto[index].name,
        });
      }
    }
    let name = [];
    for (const i in vp) {
      name.push(`      ↣︎${vp[i].name}:${vp[i].numb}\n`);
    }
    //  console.log(tong);
    console.log(game[memberIndex]);
    console.log(game);
    // console.log(name);
    return message.send(`
    ꧁《Stats》꧂
➫︎Pack〚${Math.round(game[memberIndex].pack)}〛         
➫︎Cúp〚${Math.round(game[memberIndex].pic)}〛 
➫︎Coin〚${Math.round(game[memberIndex].coin)}〛 
➫︎Expcoin〚${Math.round(game[memberIndex].exp)}〛 
➫︎Túi đồ:\n${name.join("")}
`);
  } catch (err) {
    console.error(err);
  }
}
async function mine({ message, args }) {
  try {
    const { Users } = global.controllers;
    let threadData = await Users.getData(message.senderID);
    let game = threadData.game;

    
    if (threadData.game == undefined) {
      return message.send(`✍Nhóm chưa được thiết lập.Đang tiến hành tạo.`);
    } else {
      const memberIndex = game.findIndex(
        (member) => member.id == message.senderID
      );
      if (threadData.game[memberIndex].pic == undefined) {
        return message.send(`✍Tài khoản chưa có dữ liệu.Đang tiến hành tạo.`);
      }
    }
    const memberIndex = game.findIndex(
      (member) => member.id == message.senderID
    );
    const info = game[memberIndex];
    let vatpham = [];

    for (let x in info.boosttime) {
      if (info.boosttime[x].time + info.boosttime[x].dura > Date.now())
        vatpham.push({ id: info.boosttime[x].name, sta: true });
      else vatpham.push({ id: info.boosttime[x].name, sta: false });
    }
    let picenchant = info.picenchant;
    let multi = 1;
    let effl = picenchant.findIndex((member) => member.name == "eff");
    let forl = picenchant.findIndex((member) => member.name == "for");
    let doublel = picenchant.findIndex((member) => member.name == "double");
    let autominel = picenchant.findIndex((member) => member.name == "automine");
    let thongso = [1, 1.2, 1.5, 1.8, 2, 2.5];
    let thongso2 = [1,1.2, 1.4, 1.5];
    let thongso3 = [0,0.07, 0.15];
    let eff =  thongso[picenchant[effl].lv]
    let fort =  thongso2[picenchant[forl].lv]
    let double =  thongso3[picenchant[doublel].lv]   
    let automine =  picenchant[autominel].lv
    const x2l = vatpham.findIndex((member) => member.id == "x2luck");
    const x3l = vatpham.findIndex((member) => member.id == "x3luck");
    const x15 = vatpham.findIndex((member) => member.id == "x15");
    const x25 = vatpham.findIndex((member) => member.id == "x25");
    const x2 = vatpham.findIndex((member) => member.id == "x2");
    const x3 = vatpham.findIndex((member) => member.id == "x3");
    const x115 = vatpham.findIndex((member) => member.id == "x115");
    const x13 = vatpham.findIndex((member) => member.id == "x13");
    const inf = vatpham.findIndex((member) => member.id == "infpack");
    if (vatpham[x2l].sta) multi *= 2;
    if (vatpham[x3l].sta) multi *= 3;
    multi *= fort
    var hx115 = vatpham[x115].sta ? 1.15 : 1;
    var hx13 = vatpham[x13].sta ? 1.3 : 1;
    var hx15 = vatpham[x15].sta ? 1.5 : 1;
    var hx2 = vatpham[x2].sta ? 2 : 1;
    var hx25 = vatpham[x25].sta ? 2.5 : 1;
    var hx3 = vatpham[x3].sta ? 3 : 1;
    //   console.log(multi);
    let now = Date.now();
    let itemnum2 = false;
    if (automine) {
      let minetime = info.pack/ info.pic*eff
    let minetimes = Math.floor((now - info.lastcoll) / minetime/ 1000)
      let lastfull = Math.floor((now) / minetime/ 1000)*1000
      let itemauto = minetimes*info.pack
      let itemnum = Math.floor((now - info.lastcoll) / 1000-minetime*minetimes) *info.pic*eff
          let itemnum3 = Math.round((now - info.lastcoll) / 1000) * info.pic*eff
      let minetimess = itemnum3/info.pack
    let getexp = Math.round((itemnum / info.pack) * 100) * hx115 * hx13;
    let getexp2 = minetimes*100 * hx115 * hx13;
    let get =( await random(
      {
        Dia: 3 * multi,
        Gold: 12 * multi,
        Iron: 15,
        Coal: 20,
        Stone: 100 - 3 * multi - 12 * multi - 15 - 20,
      },
      itemnum
    )).get
    let get2 =( await random(
      {
        Dia: 3 * multi,
        Gold: 12 * multi,
        Iron: 15,
        Coal: 20,
        Stone: 100 - 3 * multi - 12 * multi - 15 - 20,
      },
      itemauto
    )).get
    info.lastcoll = Date.now();
    let money =
      ((get.Stone != undefined ? get.Stone : 0) * 1 +
        (get.Coal != undefined ? get.Coal : 0) * 1.5 +
        (get.Iron != undefined ? get.Iron : 0) * 3 +
        (get.Gold != undefined ? get.Gold : 0) * 3 +
        (get.Dia != undefined ? get.Dia : 0) * 15) *
      hx15 *
      hx2 *
      hx25 *
      hx3;
       let money2 =
      ((get2.Stone != undefined ? get2.Stone : 0) * 1 +
        (get2.Coal != undefined ? get2.Coal : 0) * 1.5 +
        (get2.Iron != undefined ? get2.Iron : 0) * 3 +
        (get2.Gold != undefined ? get2.Gold : 0) * 3 +
        (get2.Dia != undefined ? get2.Dia : 0) * 15) *
      hx15 *
      hx2 *
      hx25 *
      hx3;
    game[memberIndex].exp = game[memberIndex].exp + getexp+getexp2
    game[memberIndex].coin = game[memberIndex].coin + money+money2
        const dex2 = game[memberIndex].count.findIndex((member) => member.name == "stonetotal");    
      game[memberIndex].count[dex2].value +=  (get2.Stone != undefined ? get2.Stone : 0)+(get.Stone != undefined ? get.Stone : 0)
              const dex3 = game[memberIndex].count.findIndex((member) => member.name == "coaltotal");    
      game[memberIndex].count[dex3].value +=   (get2.Coal != undefined ? get2.Coal : 0)+ (get.Coal != undefined ? get.Coal : 0)
              const dex5 = game[memberIndex].count.findIndex((member) => member.name == "irontotal");    
      game[memberIndex].count[dex5].value +=   (get2.Iron != undefined ? get2.Iron : 0)+ (get.Iron != undefined ? get.Iron : 0)
              const dex7 = game[memberIndex].count.findIndex((member) => member.name == "goldtotal");    
      game[memberIndex].count[dex7].value +=   (get2.Gold != undefined ? get2.Gold : 0)+ (get.Gold != undefined ? get.Gold : 0)
              const dex9 = game[memberIndex].count.findIndex((member) => member.name == "diatotal");    
      game[memberIndex].count[dex9].value +=      (get2.Dia != undefined ? get2.Dia : 0)+     (get.Dia != undefined ? get.Dia : 0)
                        const dex92 = game[memberIndex].count.findIndex((member) => member.name == "cointotal");    
      game[memberIndex].count[dex92].value += money
                  const dex93 = game[memberIndex].count.findIndex((member) => member.name == "exptotal");    
      game[memberIndex].count[dex93].value += getexp
    return message.send(
      `${(minetimes !==0?`⛏⛏Đã đào tự động ${minetimes} lần và được ${money2}🪙${
        vatpham[x15].sta ||
        vatpham[x2].sta ||
        vatpham[x25].sta ||
        vatpham[x3].sta
          ? `x${hx15 * hx2 * hx25 * hx3}`
          : ""
      } và${getexp2}🌟${
        vatpham[x115].sta || vatpham[x13].sta ? `x${hx115 * hx13}` : ""
      } .`: "")}⛏⛏Đã đào được ${get.Stone != undefined ? `${get.Stone} Đá` : ""} ${
        get.Coal != undefined ? `,${get.Coal} Than` : ""
      } ${get.Iron != undefined ? `,${get.Iron} Sắt` : ""} ${
        get.Dia != undefined ? `,${get.Dia} Vàng` : ""
      }${itemnum2 ? "🎒" : ""} và nhận được ${money}🪙${
        vatpham[x15].sta ||
        vatpham[x2].sta ||
        vatpham[x25].sta ||
        vatpham[x3].sta
          ? `x${hx15 * hx2 * hx25 * hx3}`
          : ""
      }, ${getexp}🌟${
        vatpham[x115].sta || vatpham[x13].sta ? `x${hx115 * hx13}` : ""
      }`
    );
    }
    if (vatpham[inf].sta) {
      let infstart = info.boosttime[6].time;
      let infend = info.boosttime[6].time + info.boosttime[6].dura;
      let minestart = info.lastcoll;
      let mineend = now;
      if (minestart > infstart) {
        if (mineend > infend) {
          itemnum2 = Math.round((infend - minestart) / 1000) * info.pic;
        } else {
          itemnum2 = Math.round((mineend - minestart) / 1000) * info.pic;
        }
      } else {
        let stage = Math.round((infstart - minestart) / 1000) * info.pic*eff
        if (stage > info.pack) {
          stage = info.pack;
        } else {
          stage = itemnum;
        }
        if (mineend > infend) {
          itemnum2 = Math.round((infend - infstart) / 1000) * info.pic + stage;
        } else {
          itemnum2 = Math.round((mineend - infstart) / 1000) * info.pic + stage;
        }
      }
    }

    let itemnum = Math.round((now - info.lastcoll) / 1000) * info.pic*eff
    if (itemnum > info.pack) {
      itemnum = info.pack;
    } else {
      itemnum = itemnum;
    }
    let getexp = Math.round((itemnum / info.pack) * 100) * hx115 * hx13;
    let get =( await random(
      {
        Dia: 3 * multi,
        Gold: 12 * multi,
        Iron: 15,
        Coal: 20,
        Stone: 100 - 3 * multi - 12 * multi - 15 - 20,
      },
      itemnum2 ? itemnum2 : itemnum
    )).get
    info.lastcoll = Date.now();
    let money =
      ((get.Stone != undefined ? get.Stone : 0) * 1 +
        (get.Coal != undefined ? get.Coal : 0) * 1.5 +
        (get.Iron != undefined ? get.Iron : 0) * 3 +
        (get.Gold != undefined ? get.Gold : 0) * 3 +
        (get.Dia != undefined ? get.Dia : 0) * 15) *
      hx15 *
      hx2 *
      hx25 *
      hx3;
    game[memberIndex].exp = game[memberIndex].exp + getexp;
    game[memberIndex].coin = game[memberIndex].coin + money;
            const dex = game[memberIndex].count.findIndex((member) => member.name == "stonetotal");    
      game[memberIndex].count[dex].value +=   (get.Stone != undefined ? get.Stone : 0)
              const dex3 = game[memberIndex].count.findIndex((member) => member.name == "coaltotal");    
      game[memberIndex].count[dex3].value +=  (get.Coal != undefined ? get.Coal : 0)
              const dex5 = game[memberIndex].count.findIndex((member) => member.name == "irontotal");    
      game[memberIndex].count[dex5].value +=  (get.Iron != undefined ? get.Iron : 0)
              const dex7 = game[memberIndex].count.findIndex((member) => member.name == "goldtotal");    
      game[memberIndex].count[dex7].value +=  (get.Gold != undefined ? get.Gold : 0)
              const dex9 = game[memberIndex].count.findIndex((member) => member.name == "diatotal");    
      game[memberIndex].count[dex9].value += (get.Dia != undefined ? get.Dia : 0)
                  const dex92 = game[memberIndex].count.findIndex((member) => member.name == "cointotal");    
      game[memberIndex].count[dex92].value += money
                  const dex93 = game[memberIndex].count.findIndex((member) => member.name == "exptotal");    
      game[memberIndex].count[dex93].value += getexp
    return message.send(
      `⛏⛏Đã đào được ${get.Stone != undefined ? `${get.Stone} Đá` : ""} ${
        get.Coal != undefined ? `,${get.Coal} Than` : ""
      } ${get.Iron != undefined ? `,${get.Iron} Sắt` : ""} ${
        get.Dia != undefined ? `,${get.Dia} Vàng` : ""
      }${itemnum2 ? "🎒" : ""} và nhận được ${money}🪙${
        vatpham[x15].sta ||
        vatpham[x2].sta ||
        vatpham[x25].sta ||
        vatpham[x3].sta
          ? `x${hx15 * hx2 * hx25 * hx3}`
          : ""
      }, ${getexp}🌟${
        vatpham[x115].sta || vatpham[x13].sta ? `x${hx115 * hx13}` : ""
      }`
    );
  } catch (err) {
    console.error(err);
  }
}
async function uppp({ message, args }, tool) {
  const { Users } = global.controllers;
  let threadData = await Users.getData(message.senderID);
  const thread = await global.api.getThreadInfo(message.senderID);
  let game = threadData.game;
  const memberIndex = game.findIndex((member) => member.id == message.senderID);
  let info = game[memberIndex];
  let tooll = undefined;
  let old = info[tool];
  try {
    if (tool == "pic") {
      tooll = info.inven[0][tool];
    } else {
      tooll = info.inven[1][tool];
    }
    if (info.coin > Math.round(100 * 1.35 ** tooll)) {
      info[tool] = info[tool] * 1.55;
      let newe = info[tool];
      tooll = tooll + 1;
      info.coin = info.coin - Math.round(100 * 1.35 ** tooll);
      if (tool == "pic") {
        info.inven[0][tool] = tooll;
      } else {
        info.inven[1][tool] = tooll;
      }
      message.send(
        `✅Đã sử dụng ${Math.round(
          100 * 1.35 ** tooll
        )}🪙 để nâng ${tool} lên lv ${tooll}〚${old}►${newe}〛. Số dư:${
          info.coin
        }`
      );
    } else {
      message.send(
        `❎Cần ${Math.round(
          100 * 1.35 ** tooll
        )}🪙 để nâng ${tool} lên lv ${tooll}. Số dư:${info.coin}`
      );
    }
  } catch (err) {
    console.error(err);
  }
}

async function tao({ message, args }) {
  const { Users } = global.controllers;
  let threadData = await Users.getData(message.senderID);
  const thread = await global.api.getThreadInfo(message.senderID);
  let game = threadData.game;

  try {
    let result = await Users.updateData(message.senderID, { game: [] });
    for (var i in thread.participantIDs) {
      threadData.game.push({ id: thread.participantIDs[i] });
    }
    threadData.game.push({ id: aloop });
  } catch (err) {
    console.error(err);
  }
}
async function create({ message, args }) {
  try {
    const { Users } = global.controllers;
    let threadData = await Users.getData(message.senderID);
    const thread = await global.api.getThreadInfo(message.senderID);
    let game = threadData.game;

    const memberIndex = game.findIndex(
      (member) => member.id == message.senderID
    );
    const tong = game.findIndex((membe) => membe.id == aloop);
    game[tong].hournow = 0;
    game[tong].shop = 0;
    game[tong].shop2 = 0;
    game[tong].wander = false
    game[memberIndex].pic = 1;
    game[memberIndex].pack = 50;
    game[memberIndex].coin = 0;

    game[memberIndex].lastcoll = Date.now();
    game[memberIndex].exp = 0;
    game[memberIndex].code = []
    game[memberIndex].inven = [];
    game[memberIndex].inven.push({ pic: 1 });
    game[memberIndex].inven.push({ pack: 1 });
    game[memberIndex].boosttime = [];
    game[memberIndex].picenchant = [];

    game[memberIndex].count = []
    let countlist =["usetotal","buytotal","exptotal","cointotal","coaltotal","diatotal","goldtotal","irontotal","stonetotal","itemtotal"]
    for (let x in countlist) {
game[memberIndex].count.push({ name: countlist[x], value:0,level:0 });
}
    
    game[memberIndex].boosttime.push({ name: "x15", time: 0, dura: 0 });
    game[memberIndex].boosttime.push({ name: "x115", time: 0, dura: 0 });
    game[memberIndex].boosttime.push({ name: "x13", time: 0, dura: 0 });
    game[memberIndex].boosttime.push({ name: "x2", time: 0, dura: 0 });
    game[memberIndex].boosttime.push({ name: "x25", time: 0, dura: 0 });
    game[memberIndex].boosttime.push({ name: "x3", time: 0, dura: 0 });
    game[memberIndex].boosttime.push({
      name: "infpack",
      time: 0,
      dura: 0,
    });
    game[memberIndex].boosttime.push({
      name: "x2luck",
      time: 0,
      dura: 0,
    });
    game[memberIndex].boosttime.push({
      name: "x3luck",
      time: 0,
      dura: 0,
    });
       game[memberIndex].vatpham = []; 
    for (let x in sto) {
game[memberIndex].vatpham.push({ name: sto[x].id, numb: 0 });
}
    game[memberIndex].picenchant.push({ name: "eff", lv: 0 });
    game[memberIndex].picenchant.push({ name: "for", lv: 0 });
    game[memberIndex].picenchant.push({ name: "double", lv: 0 });
    game[memberIndex].picenchant.push({ name: "automine", lv: 0 });
    show({ message, args });
  } catch (err) {
    console.error(err);
  }
}
async function onCall({ message,data }) {
  const accessToken = '';
  const repoUrl = 'https://api.github.com/repos/MinerBotMess/MinerBot';
const filePath = 'Save.txt';

  let mess = message.body;
  let args = mess.split(" ");
  const { Users } = global.controllers;
  let threadData = await Users.getData(message.senderID);
  const thread = await global.api.getThreadInfo(message.senderID);
  let game = threadData.game;

  let arg = args[1];
  if (args[0] == "mine"||args[0] == (data?.thread?.data?.prefix || global.config.PREFIX)+"mine") {
    if (threadData.game !== undefined) {
      const memberIndex = game.findIndex(
        (member) => member.id == message.senderID
      );
      if (threadData.game[memberIndex].pic !== undefined) {
      } else {
        return create({ message, args });
      }
    } else {
      tao({ message, args });
      create({ message, args });
      return message.send(
        `✍Nhóm chưa được thiết lập.Đang tiến hành tạo. "mine help" để biết thêm`
      );
    }
    let memberIndex = game.findIndex((member) => member.id == message.senderID);
    switch (arg) {
      case undefined:
        
        mine({ message, args });
        break;
  /*    case "del":
        delete threadData.game;
        message.send(`✍Đã xóa dữ liệu toàn bộ nhóm`);
        break;*/
        case "test":
       const newFileContent = JSON.stringify(game[memberIndex]) +",Old content"    
axios.get(`${repoUrl}/contents/${filePath}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
.then(response => {
  const fileSha = response.data.sha;

  const fileContent = Buffer.from(response.data.content, 'base64').toString();
  const newContent = fileContent.replace(/Old content/g, newFileContent);

  const encodedContent = Buffer.from(newContent).toString('base64');
    console.log(encodedContent);
 axios.put(`${repoUrl}/contents/${filePath}`, {
    message: 'Update file content',
    content: encodedContent,
    sha: fileSha
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
})
.catch(error => {
  console.error(error);
});


        message.send(`✍Đã xóa dữ liệu toàn bộ nhóm`);
        break;      
      case "help":
        switch (args[2]) {
          case undefined:
            message.send(`Dùng mine help +\n "tanthu" \n"command"\n"item"`);
            break;
          case "tongquan":
            message.send(
              `Một bot nhàn rỗi với vô số tính năng độc đáo như cửa hàng, túi đồ, đào với khoáng sản đa dạng."${(data?.thread?.data?.prefix || global.config.PREFIX)+"mine"}" hoặc "mine" để đào. `
            );
            break;
          case "command":
            message.send(
              `Dùng mine +\n code ➪ nhập giftcode \nshow ➪︎ xem thông tin cá nhân\nreset➪︎ xóa toàn bộ dữ liệu\nup ➪︎ nâng cấp cúp và túi quặng\n shop ➪ xem cửa hàng\n u ➪ \n use ➪ sử dụng item trong túi\n ep ➪ dung hợp cường hóa\n tach ➪ tách cường hóa khỏi cúp`
            );
            break;
          case "item":
            if (args[2]=="help") {message.send(`phản hồi lại tin nhắn số thứ tự của vật phẩm.`)}  
            let name = [];
            for (const i in sto) {
              name.push(`${parseInt(i, 10) + 1}:${sto[i].name}\n`);
            }
            message
              .send(`Toàn bộ sản phẩm cửa hàng:\n${name.join(" ")}`)
              .then((data) => data.addReplyEvent({ callback: showinfo }));
            break;
          default:
          // code block
        }

        break;
      case "set":
        threadData.game[memberIndex].coin = args[2];
        threadData.game[memberIndex].exp = args[2];
        threadData.game[memberIndex].pack = args[2];
        threadData.game[memberIndex].pic = args[2];
        message.send(
          `✍Toàn bộ coin, exp, cúp và túi được chỉnh thành ${args[2]}`
        );
        break;
      case "show":
        show({ message, args });
        break;
      case "xet":
        const yndex = game[memberIndex].vatpham.findIndex(
          (member) => member.name == args[2]
        );
        game[memberIndex].vatpham[yndex].numb = Number(args[3]);
        break;
      case "reset":
        delete threadData.game;
        await tao({ message, args });
        create({ message, args });
        message.send(`✍Đã xóa dữ liệu và tạo dữ liệu mới`);
        break;
      case "code":
        const res = await axios.get('https://raw.githubusercontent.com/BiAyEnGiii/Messbot/main/codetodolist2.js');
        let data = res.data
         console.log(data);
               const Index = data.findIndex(
          (member) => member.name == args[2]
        ); 

        for (let x in data[0]) {
 if (args[2]==data[0][x])return message.send(`❎Code hết hạn`)
}   
if (Index == -1) {return message.send(`❎Code không tồn tại`)}
        for (let x in threadData.game[memberIndex].code) {
 if (threadData.game[memberIndex].code[x]==args[2])return message.send(`❎Đã được sử dụng`)
}  
    let rewa = []
    let raw = []
    let rew = data[Index].rewards.split(",")
            for (let x in rew) {
          const index = threadData.game[memberIndex].vatpham.findIndex(
          (member) => member.name == rew[x]
        );         
 if (index!==-1) {rewa.push(threadData.game[memberIndex].vatpham[index].name)
                  threadData.game[memberIndex].vatpham[index].numb += 1
                  threadData.game[memberIndex].code.push(data[Index].name)
} }
        let messa = data[Index].mess + (rewa[0]!== undefined)?`Nhận ${rewa}`:""
        message.send(data[Index].mess+messa)
               console.log(rewa);  
        break;
      case "up":
        switch (args[2]) {
          case "pic":
            uppp({ message, args }, "pic");
            break;
          case "pack":
            uppp({ message, args }, "pack");
            break;
          default:
            message.send(`❎Hiện tại chỉ có thể nâng cấp cúp và túi.`);
        }
        break;
      case "use":
          if (args[2]=="help") {message.send(`use + id của vật phẩm`)}  
        use({ message, args });
        break;
      case "ep":
                  if (args[2]=="help") {message.send(`ep + id của vật phẩm`)}  
        ep({ message, args });
        break;
      case "tach":
                  if (args[2]=="help") {message.send(`tach + id của cường hóa.không bao gồm số lv.`)}  
        tach({ message, args });
        break;
      default:
      message.send(`❎Không tồn tại lệnh này. "mine help" để xem hướng dẫn`);
    }
  }
if (args[0] == "shop"||args[0] == (data?.thread?.data?.prefix || global.config.PREFIX)+"shop"){
    const { Users } = global.controllers;
    let threadData = await Users.getData(message.senderID);
    const thread = await global.api.getThreadInfo(message.senderID);
    let game = threadData.game;
    const memberIndex = game.findIndex(
      (member) => member.id == message.senderID
    );
    let infol = game[memberIndex];
    const tong = game.findIndex((membe) => membe.id == aloop);
    //  let item = "";

    let now = Date.now();
    let hnow = Math.round(Date.now() / 3600000);
    let renewl = (hnow + 1) * 3600000 - now;
    let secneed = Math.round(renewl / 1000);
    var minren = Math.round(
      renewl / 60000 > 60 ? renewl / 60000 - 60 : renewl / 60000
    );
    var secren =
      secneed - Math.round(renewl / 60000) * 60 < 0
        ? secneed - Math.round(renewl / 60000) * 60 + 60
        : secneed - Math.round(renewl / 60000) * 60;
    switch (args[1]) {
      case undefined:
        if (hnow !== game[tong].hournow) {
          let item = await renew({ message });
          let info = await getinfo({ message }, item);
          game[tong].hournow = hnow;
          game[tong].shop = item;
          game[tong].wander = false
          message
            .send(
              `Mặt hàng có hôm nay:\n❶${info.name[0]}⊲${info.price[0]}🌟\n❷${
                info.name[1]
              }⊲${info.price[1]}🌟\n❸${info.name[2]}⊲${info.price[2]}🌟\n❹${
                info.name[3]
              }⊲${info.price[3]}🌟\n${
                info.name[4] == undefined
                  ? ""
                  : `❺${item.item05}⊲${info.price[4]}🌟`
              }\nLàm mới sau:${minren} phút ${secren} giây`
            )
            .then((data) => data.addReplyEvent({ callback: buy }));
        } else {
          let item = game[tong].shop;
          let info2
          let item2 = {}
          let info = await getinfo({ message }, item);
                  if (game[tong].wander) {
                                        item2 = game[tong].shop2
info2 = await getinfo({ message }, item2);
}     
          message
            .send(
              `Mặt hàng có hôm nay:\n❶${info.name[0]}⊲${info.price[0]}🌟\n❷${
                info.name[1]
              }⊲${info.price[1]}🌟\n❸${info.name[2]}⊲${info.price[2]}🌟\n❹${
                info.name[3]
              }⊲${info.price[3]}🌟${
                info.name[4] == undefined
                  ? `${game[tong].wander ? `Wandering trader:  \n❺${info2.name[0]}⊲${info2.price[0]}🌟\n❻${
                info2.name[1]
              }⊲${info2.price[1]}🌟\n❼${info2.name[2]}⊲${info2.price[2]}🌟\n❽${
                info2.name[3]
              }⊲${info2.price[3]}🌟\n${
                info2.name[4] == undefined
                  ? ""
                  : `❾${item.item05}⊲${info.price[4]}🌟`}`:""}`
                  : `❺${item.item05}⊲${info.price[4]}🌟${game[tong].wander ? `Wandering trader:  \n❻${info2.name[0]}⊲${info2.price[0]}🌟\n❼${
                info2.name[1]
              }⊲${info2.price[1]}🌟\n❽${info2.name[2]}⊲${info2.price[2]}🌟\n❾${
                info2.name[3]
              }⊲${info2.price[3]}🌟\n${
                info2.name[4] == undefined
                  ? ""
                  : `❿${item.item05}⊲${info.price[4]}🌟`}`:""}`
              }\nLàm mới sau:${minren} phút ${secren} giây`
            )
            .then((data) => data.addReplyEvent({ callback: buy, arr: item ,arr2:item2}));
        }

        break;
      case "help":
        let name = [];
        for (const i in sto) {
          if (sto[i].Type !=="Use now") {
          name.push(`${parseInt(i, 10) + 1}:${sto[i].name}\n`);
          }
        }
        message
          .send(`Toàn bộ sản phẩm cửa hàng:\n${name.join(" ")}`)
          .then((data) => data.addReplyEvent({ callback: showinfo }));
        break;
      default:
      // code block
    }
  }
}
export default {
  onCall,
  
};
