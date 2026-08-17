const { cmd } = require('../arslan');
const axios = require('axios');

cmd({
  pattern: "screenshot",
  alias: ["ss", "webshot", "sitepic"],
  react: "🖥️",
  category: "tools",
  desc: "Take full HD desktop screenshot of a website",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) {
      return reply(
        "*🖥️ WEBSITE SCREENSHOT COMMAND*\n\n" +
        "Use is tarah:\n" +
        "*.screenshot <website URL>*\n\n" +
        "Example:\n" +
        "*.screenshot https://google.com*"
      );
    }

    // ✅ API call to movanest.xyz for full HD screenshot (1280x720)
    const apiUrl = `https:///movanest.xyz/v2/ssweb?url=${encodeURIComponent(q)}&width=1280&height=720&full_page=true`;
    const res = await axios.get(apiUrl, { timeout: 60000 });

    if (!res.data || !res.data.status || !res.data.screenshot) {
      return reply("❌ Screenshot generate nahi hua / API se response nahi aaya");
    }

    const screenshotUrl = res.data.screenshot;

    // ✅ Send screenshot
    await conn.sendMessage(from, {
      image: { url: screenshotUrl },
      caption: `🖥️ Screenshot of: ${q}`
    }, { quoted: mek });

  } catch (err) {
    console.error("SCREENSHOT COMMAND ERROR:", err.message);
    reply("❌ Screenshot generate nahi hua / API busy");
  }
});
