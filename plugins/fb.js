const { cmd } = require('../arslan');
const axios = require('axios');

cmd({
  pattern: "fb",
  react: "☺️",
  alias: ["facebook", "fbdl"],
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, q, reply, config }) => {
  try {
    if (!q) return reply("*AP NE KOI FACEBOOK VIDEO DOWNLOAD KARNI HAI 🤔 TO AP US FACEBOOK VIDEO KA LINK COPY KAR LO 🤗*\n*PHIR ESE LIKHO ☺️*\n\n*FB ❮FACEBOOK VIDEO LINK❯*\n\n*JAB AP ESE LIKHO GE 😇 TO APKI FACEBOOK VIDEO DOWNLOAD KAR KE 😃 YAHA PER BHEJ DE JAYE GE 😍♥️*");

    const apiUrl = `https://movanest.xyz/v2/fbdown?url=${encodeURIComponent(q)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;

    // 🔎 API status check
    if (data.status !== true) {
      return reply("API ERROR 😢");
    }

    // 🔎 Results check
    if (!Array.isArray(data.results) || data.results.length === 0) {
      return reply("*FACEBOOK VIDEO NAHI MIL RAHI 🥺*");
    }

    const result = data.results[0];

    // 🎥 Quality selection (API ke mutabiq)
    const videoUrl = result.hdQualityLink
      ? result.hdQualityLink
      : result.normalQualityLink;

    if (!videoUrl) {
      return reply("*SIRF FACEBOOK VIDEO KA LINK DO ☺️*");
    }

    // 📝 Caption API data se
    const caption = `*👑 FB VIDEO 👑*
*👑 TIME :❯ ${result.duration}*
*👑 CREATER :❯ ${data.creator}*
*👑 BY :❯ ${config?.BOT_NAME} 👑*`;

    await conn.sendMessage(
      from,
      {
        video: { url: videoUrl },
        mimetype: "video/mp4",
        caption: caption
      },
      { quoted: mek }
    );

  } catch (err) {
    console.log(err);
    reply("❌ Error aa gaya");
  }
});
