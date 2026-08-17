const { cmd } = require("../arslan");
const moment = require("moment");
const { fakevCard } = require('../lib/fakevCard');

let botStartTime = Date.now(); // Recording the start time of the bot
const ALIVE_IMG = "https://files.catbox.moe/6a48t4.png"; // Make sure this URL is valid

cmd({
    pattern: "alive",
    desc: "Check if the bot is active.",
    category: "owner",
    react: "💡",
    filename: __filename
}, async (conn, mek, m, { reply, from, config }) => {
    try {
        const botName = config?.BOT_NAME;
        const pushname = m.pushName || "User"; // Username or default value
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY");

        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        const formattedInfo = `
╭┄┄┄┄[ *${botName} sᴛᴀᴛᴜs* ]┄┄┄┄
┊
┊     Hi 🫵🏽 ${pushname}
┊
┊🕒 *ᴛɪᴍᴇ*: ${currentTime}
┊📅 *ᴅᴀᴛᴇ*: ${currentDate}
┊⏳ *ᴜᴘᴛɪᴍᴇ*: ${runtimeHours} hours, ${runtimeMinutes} minutes, ${runtimeSeconds} seconds
╰───────────────

> 🤖 *Status*: *${botName} is Alive and Ready!*

🎉 *Enjoy the Service!*
        `.trim();

        // Utilise la pp personnalisée de l'utilisateur si définie (setbotpp), sinon l'image par défaut
        const aliveImage = config?.BOT_PP || config?.IMAGE_PATH || ALIVE_IMG;
        if (!aliveImage || !aliveImage.startsWith("http")) {
            throw new Error("Invalid image URL. Please set a valid image URL.");
        }

        // Send the message with image and caption
        await conn.sendMessage(from, {
            image: { url: aliveImage },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
    newsletterJid: config?.NEWSLETTER_JID,
    newsletterName: botName,
    serverMessageId: 143
}
                }
            }
        }, { quoted: fakevCard });

    } catch (error) {
        console.error("Error in alive command: ", error);
        
        // Respond with error details 
        const errorMessage = `
❌ An error occurred while processing the alive command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});
