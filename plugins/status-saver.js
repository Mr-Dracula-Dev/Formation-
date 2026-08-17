const { cmd } = require("../arslan");

cmd({
  on: "body",
  react: "📤",
  filename: __filename
}, async (client, mek, m, { body, sender, from }) => {

  if (from !== "status@broadcast") return;

  const text = (body || "").toLowerCase().trim();
  if (!["send", "sendme", "save"].includes(text)) return;

  const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quoted) return;

  let msg = {};
  if (quoted.imageMessage) msg = { image: { url: quoted.imageMessage.url } };
  else if (quoted.videoMessage) msg = { video: { url: quoted.videoMessage.url } };
  else return;

  await client.sendMessage(sender, msg);
});
