const { cmd } = require('../arslan');
const { updateUserConfig } = require('../lib/database');

// ============================================================
// Helper : met à jour la config PROPRE À CE NUMÉRO uniquement.
// - botNumber identifie l'utilisateur (numéro WhatsApp du bot connecté)
// - updateUserConfig() sauvegarde en base sous cette clé "number" précise
//   (voir lib/database.js : updateUserConfigInMongoDB filtre par cleanNumber)
// - "config" ici est déjà une copie locale à cette requête (effectiveConfig
//   généré par utilisateur dans main.js), donc la modifier ne touche
//   JAMAIS la config d'un autre numéro ni l'objet global partagé.
// ============================================================
const updateConfig = async (key, value, botNumber, config, reply) => {
    if (!botNumber) {
        return reply("❌ Impossible d'identifier ton numéro de session. Réessaie.");
    }
    try {
        // Copie locale pour ne jamais dépendre d'une référence partagée
        const updated = { ...config, [key]: value };

        // Persistance isolée : updateUserConfig merge uniquement dans le
        // document Mongo dont number === botNumber (nettoyé des symboles).
        await updateUserConfig(botNumber, { [key]: value });

        // Reflète le changement pour le reste de CETTE requête seulement
        Object.assign(config, updated);

        return reply(`✅ *${key}* mis à jour avec succès pour ton bot (${botNumber}) :\n➤ *${value}*\n\n_Cette modification n'affecte que ta propre session._`);
    } catch (e) {
        console.error(e);
        return reply("❌ Erreur lors de la sauvegarde en base de données.");
    }
};

// ============================================================
// 1. SETBOTNAME — Change le nom du bot
// ============================================================
cmd({
    pattern: "setbotname",
    alias: ["setname"],
    desc: "Changer le nom du bot",
    category: "settings",
    react: "🤖"
},
async (conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*CETTE COMMANDE EST RÉSERVÉE AU DÉVELOPPEUR 😎*");
    const newName = args.join(' ');
    if (!newName) {
        return reply(`*Nom actuel du bot :❯ ${config.BOT_NAME}*\n\nPour changer, écris :\n*.setbotname Nouveau Nom*`);
    }
    await updateConfig('BOT_NAME', newName, botNumber, config, reply);
});

// ============================================================
// 2. SETOWNERNAME — Change le nom du dev/owner
// ============================================================
cmd({
    pattern: "setownername",
    alias: ["setdevname"],
    desc: "Changer le nom du développeur/owner",
    category: "settings",
    react: "👑"
},
async (conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*CETTE COMMANDE EST RÉSERVÉE AU DÉVELOPPEUR 😎*");
    const newName = args.join(' ');
    if (!newName) {
        return reply(`*Nom du dev actuel :❯ ${config.OWNER_NAME || 'ARSLAN-MD'}*\n\nPour changer, écris :\n*.setownername Nouveau Nom*`);
    }
    await updateConfig('OWNER_NAME', newName, botNumber, config, reply);
});

// ============================================================
// 3. SETOWNERNUMBER — Change/ajoute le(s) numéro(s) owner
// ============================================================
cmd({
    pattern: "setownernumber",
    alias: ["setdevnumber"],
    desc: "Changer le(s) numéro(s) du développeur/owner",
    category: "settings",
    react: "📞"
},
async (conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*CETTE COMMANDE EST RÉSERVÉE AU DÉVELOPPEUR 😎*");
    if (!args[0]) {
        const current = Array.isArray(config.OWNER_NUMBER) ? config.OWNER_NUMBER.join(', ') : config.OWNER_NUMBER;
        return reply(`*Numéro(s) actuel(s) :❯ ${current}*\n\nPour changer (séparer par une virgule pour plusieurs numéros), écris :\n*.setownernumber 923237045919,923001234568*`);
    }
    // Sépare par virgule, nettoie les espaces, retire les préfixes "+" pour homogénéiser
    const numbers = args.join(' ').split(',').map(n => n.trim().replace(/^\+/, '')).filter(Boolean);
    await updateConfig('OWNER_NUMBER', numbers, botNumber, config, reply);
});

// ============================================================
// 4. SETCHANNELLINK — Change le lien du channel/newsletter
// ============================================================
cmd({
    pattern: "setchannellink",
    alias: ["setnewsletterlink"],
    desc: "Changer le lien du channel WhatsApp (newsletter)",
    category: "settings",
    react: "📢"
},
async (conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*CETTE COMMANDE EST RÉSERVÉE AU DÉVELOPPEUR 😎*");
    const newLink = args[0];
    if (!newLink) {
        return reply(`*Lien channel actuel :❯ ${config.CHANNEL_LINK}*\n\nPour changer, écris :\n*.setchannellink https://whatsapp.com/channel/xxxx*`);
    }
    if (!newLink.startsWith('https://whatsapp.com/channel/')) {
        return reply("❌ Lien invalide. Le lien doit commencer par https://whatsapp.com/channel/");
    }
    await updateConfig('CHANNEL_LINK', newLink, botNumber, config, reply);
});

// ============================================================
// 5. SETGROUPLINK — Change le lien du groupe WhatsApp
// ============================================================
cmd({
    pattern: "setgrouplink",
    alias: ["setgroupinvite"],
    desc: "Changer le lien du groupe WhatsApp officiel",
    category: "settings",
    react: "👥"
},
async (conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*CETTE COMMANDE EST RÉSERVÉE AU DÉVELOPPEUR 😎*");
    const newLink = args[0];
    if (!newLink) {
        return reply(`*Lien groupe actuel :❯ ${config.GROUP_INVITE_LINK}*\n\nPour changer, écris :\n*.setgrouplink https://chat.whatsapp.com/xxxx*`);
    }
    if (!newLink.startsWith('https://chat.whatsapp.com/')) {
        return reply("❌ Lien invalide. Le lien doit commencer par https://chat.whatsapp.com/");
    }
    await updateConfig('GROUP_INVITE_LINK', newLink, botNumber, config, reply);
});

// ============================================================
// 6. SETBOTPP — Change la photo de profil utilisée par le bot
// ============================================================
cmd({
    pattern: "setbotpp",
    alias: ["setpp", "setbotimage"],
    desc: "Changer la photo de profil / image du bot (URL directe)",
    category: "settings",
    react: "🖼️"
},
async (conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*CETTE COMMANDE EST RÉSERVÉE AU DÉVELOPPEUR 😎*");
    const newUrl = args[0];
    if (!newUrl) {
        return reply(`*Photo actuelle :❯ ${config.BOT_PP || config.IMAGE_PATH}*\n\nPour changer, écris :\n*.setbotpp https://lien-direct-image.png*\n\n(Tu peux héberger une image sur catbox.moe pour obtenir un lien direct)`);
    }
    if (!/^https?:\/\/.+\.(png|jpe?g|webp|gif)$/i.test(newUrl)) {
        return reply("❌ Merci de fournir un lien direct vers une image (.png, .jpg, .jpeg, .webp, .gif)");
    }
    // Met à jour les deux clés pour rester cohérent avec main.js
    config.IMAGE_PATH = newUrl;
    await updateConfig('BOT_PP', newUrl, botNumber, config, reply);
});

// ============================================================
// 8. AUTOJOIN GROUP — Activer/désactiver l'auto-jonction au groupe
// ============================================================
cmd({
    pattern: "setautojoingroup",
    alias: ["autojoingroup"],
    desc: "Activer/désactiver l'auto-jonction au groupe officiel à la connexion",
    category: "settings",
    react: "👥"
},
async (conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*CETTE COMMANDE EST RÉSERVÉE AU DÉVELOPPEUR 😎*");
    const value = args[0]?.toLowerCase();
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTOJOIN_GROUP', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTOJOIN_GROUP', 'false', botNumber, config, reply);
    } else {
        reply(`*Statut actuel :❯ ${config.AUTOJOIN_GROUP !== 'false' ? 'ON' : 'OFF'}*\n\n*.setautojoingroup on* ou *.setautojoingroup off*`);
    }
});

// ============================================================
// 9. AUTOJOIN CHANNEL — Activer/désactiver l'auto-suivi du channel
// ============================================================
cmd({
    pattern: "setautojoinchannel",
    alias: ["autojoinchannel", "autofollowchannel"],
    desc: "Activer/désactiver l'auto-suivi du channel officiel à la connexion",
    category: "settings",
    react: "📢"
},
async (conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*CETTE COMMANDE EST RÉSERVÉE AU DÉVELOPPEUR 😎*");
    const value = args[0]?.toLowerCase();
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTOJOIN_CHANNEL', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTOJOIN_CHANNEL', 'false', botNumber, config, reply);
    } else {
        reply(`*Statut actuel :❯ ${config.AUTOJOIN_CHANNEL !== 'false' ? 'ON' : 'OFF'}*\n\n*.setautojoinchannel on* ou *.setautojoinchannel off*`);
    }
});

// ============================================================
// 10. BOTINFO — Affiche toutes les infos d'identité actuelles
// ============================================================
cmd({
    pattern: "botinfo",
    alias: ["botidentity", "devinfo"],
    desc: "Afficher toutes les infos d'identité du bot",
    category: "settings",
    react: "ℹ️"
},
async (conn, mek, m, { reply, config }) => {
    const owners = Array.isArray(config.OWNER_NUMBER) ? config.OWNER_NUMBER.join(', ') : config.OWNER_NUMBER;
    const text = `
╭─❑ *IDENTITÉ DU BOT* ❑─╮

🤖 *Nom du bot* : ${config.BOT_NAME}
👑 *Nom du dev* : ${config.OWNER_NAME || 'ARSLAN-MD'}
📞 *Numéro(s) dev* : ${owners}
📢 *Channel* : ${config.CHANNEL_LINK}
👥 *Groupe* : ${config.GROUP_INVITE_LINK}
✦ *Préfixe* : ${config.PREFIX}
🖼️ *Photo* : ${config.BOT_PP || config.IMAGE_PATH}
🔁 *Autojoin groupe* : ${config.AUTOJOIN_GROUP !== 'false' ? 'ON' : 'OFF'}
🔁 *Autojoin channel* : ${config.AUTOJOIN_CHANNEL !== 'false' ? 'ON' : 'OFF'}

╰──────────────────╯
`.trim();
    reply(text);
});
