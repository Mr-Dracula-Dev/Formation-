const { cmd, commands } = require('../arslan');
const os = require("os");
const { runtime } = require('../lib/functions');
// config n'est plus importé globalement — utilisation de ctx.config (par utilisateur)

cmd({
    pattern: "alive",
    alias: ["status", "live"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply, config }) => {
    try {
        const totalCmds = commands.length;
        const uptime = () => {
            let sec = process.uptime();
            let h = Math.floor(sec / 3600);
            let m = Math.floor((sec % 3600) / 60);
            let s = Math.floor(sec % 60);
            return `${h}h ${m}m ${s}s`;
        };

        const status = `
        *I AM ALIVE NOW 🤗♥️*
*┏────〘 INFO 〙───⊷*
*┃👑 MODE :❯ ${config?.WORK_TYPE || config?.MODE || 'private'}*
*┃👑 USER :❯ ${config?.OWNER_NAME}*
*┃👑 PREFIX :❯ ❮ ${config?.PREFIX || '.'} ❯*
*┃👑 VERSION :❯ 1.0.0*
*┃👑 TOTAL CMNDS :❯ ❮ ${totalCmds} ❯*
*┃👑 UPTIME :❯ ${uptime()}*
*┗──────────────⊷*
*👑 ${config?.BOT_NAME} WHATSAPP BOT 👑*`;

        await conn.sendMessage(from, { 
            text: status,
            contextInfo: {
                mentionedJid: [sender],   // ✅ FIXED
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
