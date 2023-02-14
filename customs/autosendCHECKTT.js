import cron from 'node-cron'


export default function autoSend() {
    const timezone = global.config?.timezone || "Asia/Ho_Chi_Minh";
    if (!timezone) return;

    cron.schedule("0 0 * * *", async () => {
        const allDATA = global.checktt_cache;

        if (!allDATA) return;

        for (const [tid, data] of allDATA) {
            const _DAYDATA = data.day.sort((a, b) => b.n - a.n);

            if (!_DAYDATA) continue;

            let msg = "📊 Thống kê TOP 10 ngày hôm qua:\n";

            for (let i = 0; i < _DAYDATA.slice(0, 10).length; i++) {
                let username = (await global.controllers.Users.getName(_DAYDATA[i].id)) || "Người dùng Facebook";
                msg += `\n${i + 1}. ${username} - ${_DAYDATA[i].n}`;
            }

            global.checktt_cache.set(tid, {
                day: [],
                week: data.week,
                all: data.all
            })
            global.api.sendMessage(msg, tid);

            global.sleep(300);
        }
    }, {
        timezone: timezone
    })

    cron.schedule("0 0 * * 1", async () => {

        const allDATA = global.checktt_cache;

        if (!allDATA) return;

        for (const [tid, data] of allDATA) {
            global.checktt_cache.set(tid, {
                day: [],
                week: [],
                all: data.all
            })
        }
    }, {
        timezone: timezone
    })
}
