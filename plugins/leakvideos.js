const { cmd } = require("../arslan");
const { fakevCard } = require('../lib/fakevCard');


//================= LEAKVIDEO 1 =================

cmd({
    pattern: "leakvideo",
    desc: "Send random leak video",
    category: "fun",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {

    try {

        await reply("⏳ Fetching leak video...");

        const videoUrl = "https://arslan-apis-v2.vercel.app/leakvideos";

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            caption: "🎬 Random Leak Video",
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: fakevCard });

    } catch (err) {

        console.log(err);
        reply("❌ Video load nahi hui.");

    }

});


//================= LEAKVIDEO 2 =================

cmd({
    pattern: "leakvideo2",
    desc: "Send random leak video 2",
    category: "fun",
    react: "🔥",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {

    try {

        await reply("⏳ Fetching leak video...");

        const videoUrl = "https://arslan-apis-v2.vercel.app/leakvideos2";

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            caption: "🔥 Random Leak Video 2",
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: fakevCard });

    } catch (err) {

        console.log(err);
        reply("❌ Video load nahi hui.");

    }

});
