const { cmd } = require('../arslan')

cmd({
    pattern: "vv",
    alias: ["viewonce", "view", "open"],
    react: "🥺",
    desc: "Retrieve view-once media (Owner only)",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator)
            return reply("*YEH COMMAND SIRF BOT OWNER KE LIYE HAI 😎*")

        if (!m.quoted)
            return reply(
                "*🥺 KISI VIEW ONCE PHOTO / VIDEO / AUDIO KO REPLY KARO*\n\n" +
                "*Phir likho:* `.vv`\n\n" +
                "*Phir dekho kamal 😎*"
            )

        // 🔥 VIEW ONCE FIX
        let quoted = m.quoted
        let msg = quoted.message

        if (msg?.viewOnceMessageV2) {
            msg = msg.viewOnceMessageV2.message
        } else if (msg?.viewOnceMessageV2Extension) {
            msg = msg.viewOnceMessageV2Extension.message
        }

        const type = Object.keys(msg)[0]
        const buffer = await quoted.download()

        let content = {}

        if (type === "imageMessage") {
            content = {
                image: buffer,
                caption: quoted.text || ""
            }
        } 
        else if (type === "videoMessage") {
            content = {
                video: buffer,
                caption: quoted.text || ""
            }
        } 
        else if (type === "audioMessage") {
            content = {
                audio: buffer,
                mimetype: "audio/mp4",
                ptt: false
            }
        } 
        else {
            return reply("*❌ YE VIEW ONCE MEDIA SUPPORT NAHI KARTA 🥺*")
        }

        await conn.sendMessage(from, content, { quoted: mek })

    } catch (e) {
        console.log("VV ERROR:", e)
        reply("*❌ VIEW ONCE OPEN KARNE ME ERROR AYA 🥺*")
    }
})
