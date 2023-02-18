/**
 * Caution:
 * - This command may cause you to be banned from the group/Facebook because of the spam.
 * - Use this command at your own risk.
 */

export const config = {
    name: "flirt",
    version: "0.0.1-xaviabot-refactor",
    credits: "Zeska fixed by Choru tiktokers",
    description: "Continuously tag the person you tag for many times\nYou can capture that person's heart",
    usage: "[tag]",
    cooldown: 20
}

export async function onCall({ message }) {
    let mention = Object.keys(event.mentions)[0];
    if (!mention) return message.reply("Tag someone to flirt with them! ( ͡° ͜ʖ ͡°)")

    let name = event.mentions[mention],
        arraytag = [{
            id: mention,
            tag: name
        }];

    message.send("Start flirting!")

    flirt(message, "Psst crush po kita", 3000);
    flirt(message, "Hehehehe love u po", 5000);
    flirt(message, "Tara punta tayo parke dun tayo magpakasaya", 7000);
    flirt(message, "kumain ka naba? Pwede mo rin ako kainin, ugh ugh", 9000);

    global.sleep(90000);

    flirt(message, { body: `Ahhhhhh dahan dahan lang, makakarami din tayo ${name}`, mentions: arraytag }, 12000);
    flirt(message, "babe asan ka na, miss na kita", 15000);
    flirt(message, "gusto mo regaluhan kita mamaya ng matamis na chokolate?", 17000);
    flirt(message, "sarap mo po, tara istara isag round ulit", 20000);
    flirt(message, "lab lab kita, di kita iiwan pramis", 23000);
    flirt(message, "mwa mwa chup chup ugh ugh", 25000);
    flirt(message, "Grrrr */nagpapalambing, ako nalang tingnan mo wag na yang cellphone mo", 28500);
    flirt(message, "babe may sasabihin ako sayo.....", 31000);
    flirt(message, "Will you marry me?", 36000);
    flirt(message, "yieee happy anniversary babe", 39000);
    flirt(message, "wait kunin ko yung chocolate at roses ko para sayo, give me a minute", 40000);
    flirt(message, "Tada 💐🍫💐, Happy Anniversary ulit mahal", 65000);
    flirt(message, "After Many Years* \nBabe alam ko matanda nako malapit nako mawala..", 70000);
    flirt(message, "Pero tandaan mo kahit mawala ako mahal na mahal kita", 75000);
    flirt(message, "Babe paalam na.....", 80000);
    flirt(message, "salamat sa pakikipag flirt sa akin, ako ay masaya na...", 85000);
    flirt(message, "Good bye, see you in the next program.", 90000);
}

export function flirt(message, body, time) {
    setTimeout(() => message.send(body), time);
}
