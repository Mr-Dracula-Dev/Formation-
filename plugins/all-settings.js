const { cmd } = require('../arslan');
const { updateUserConfig } = require('../lib/database');

// Helper function to update config — PER-USER ONLY (isolated by botNumber)
const updateConfig = async (key, value, botNumber, config, reply) => {
    if (!botNumber) {
        return reply("❌ Impossible d'identifier ton numéro de session. Réessaie.");
    }
    try {
        // 1. Sauvegarde en DB : uniquement la clé modifiée, filtrée par botNumber
        //    (updateUserConfigInMongoDB merge dans le document de CE numéro uniquement)
        await updateUserConfig(botNumber, { [key]: value });

        // 2. Reflète le changement pour le reste de cette requête seulement
        //    (config est une copie locale par utilisateur, pas l'objet global)
        config[key] = value;

        return reply(`✅ *${key}* has been updated to: *${value}*\n_(propre à ta session, n'affecte pas les autres numéros)_`);
    } catch (e) {
        console.error(e);
        return reply("❌ Error while saving to database.");
    }
};

// ============================================================
// 1. PRESENCE MANAGEMENT (Recording / Typing)
// ============================================================

cmd({
    pattern: "autorecording",
    alias: ["autorec", "arecording"],
    desc: "Enable/Disable auto recording simulation",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*YEH COMMAND SIRF MERE LIE HAI 😎*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_RECORDING', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_RECORDING', 'false', botNumber, config, reply);
    } else {
        reply(`*ABHI :❯ ${config.AUTO_RECORDING} HAI 😊*\n\n*AUTO RECORDING ON KARNE K LIE LIKHO ☺️*\n*👑 ❮AUTORECORDING ON❯ 👑*\n*AUTORECORDING OFF KARNE K LIE LIKHO ☺️*\n*👑 ❮AUTORECORDING OFF❯ 👑*`);
    }
});

cmd({
    pattern: "autotyping",
    alias: ["autotype", "atyping"],
    desc: "Enable/Disable auto typing simulation",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*YEH COMMAND SIRF MERE LIE HAI 😎*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_TYPING', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_TYPING', 'false', botNumber, config, reply);
    } else {
        reply(`*ABHI :❯ ${config.AUTO_TYPING} HAI 😊*\n\n*AUTO TYPING ON KARNE K LIE LIKHO ☺️*\n*👑 ❮AUTOTYPING ON❯ 👑*\n*AUTOTYPING OFF KARNE K LIE LIKHO ☺️*\n*👑 ❮AUTOTYPING OFF❯ 👑*`);
    }
});

// ============================================================
// 2. CALL MANAGEMENT (Anti-Call)
// ============================================================

cmd({
    pattern: "anticall",
    alias: "acall",
    desc: "Auto reject calls",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*YEH COMMAND SIRF MERE LIE HAI ☺️*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('ANTI_CALL', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('ANTI_CALL', 'false', botNumber, config, reply);
    } else {
        reply(`*ABHI :❯ ${config.AUTO_RECORDING} HAI 😊*\n\n*JO BHI CALL KARE GA KHUD HI REJECT HO JAYE GE 😃 YE SETTING ON KARNE K LIE LIKHO ☺️*\n*👑 ❮ANTICALL ON❯ 👑*\n*ANTICALL OFF KARNE K LIE LIKHO ☺️*\n*👑 ❮ANTICALL OFF❯ 👑*`);
    }
});

// ============================================================
// 3. GROUP MANAGEMENT (Welcome / Goodbye)
// ============================================================

cmd({
    pattern: "welcome",
    desc: "Enable/Disable welcome messages",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*YEH COMMAND SIRF MERE LIE HAI 😎*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('WELCOME', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('WELCOME', 'false', botNumber, config, reply);
    } else {
        reply(`*ABHI :❯ ${config.WELCOME} HAI 😊*\n\n*JO NEW MEMBER GROUP JOIN KARE GA USKA WELCOME MSG BHEJ DYA JAYE GA 😃 YEH SETTING ON KARNE K LIE LIKHO ☺️*\n*👑 ❮WECOME ON❯ 👑*\n*WELCOME OFF KARNE K LIE LIKHO ☺️*\n*👑 ❮WELCOME OFF❯ 👑*`);
    }
});

cmd({
    pattern: "goodbye",
    desc: "Enable/Disable goodbye messages",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*YEH COMMAND SIRF MERE LIE HAI 😎*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('GOODBYE', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('GOODBYE', 'false', botNumber, config, reply);
    } else {
        reply(`*ABHI :❯ ${config.GOODBYE} HAI 😊*\n\n*JO MEMBER GROUP LEFT KARE GA USKA GOODBYE MSG BHEJ DYA JAYE GA 😃 YEH SETTING ON KARNE K LIE LIKHO ☺️*\n*👑 ❮GOODBYE ON❯ 👑*\n*GOODBYE OFF KARNE K LIE LIKHO ☺️*\n*👑 ❮GOODBYE OFF❯ 👑*`);
    }
});

// ============================================================
// 4. READ & STATUS MANAGEMENT
// ============================================================

cmd({
    pattern: "autoread",
    desc: "Enable/Disable auto read messages (Blue Tick)",
    category: "settings",
    react: "👀"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*YEH COMMAND SIRF MERE LIE HAI 😎*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('READ_MESSAGE', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('READ_MESSAGE', 'false', botNumber, config, reply);
    } else {
        reply(`*ABHI ${config.READ_MESSAGE} HAI 😊*\n*JO BHI MSG KARE GA USKA MSG KHUD HI SEEN `);
    }
});

cmd({
    pattern: "autoviewsview",
    alias: ["avs", "statusseen", "astatus"],
    desc: "Auto view status updates",
    category: "settings",
    react: "😎"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*YEH COMMAND SIRF MERE LIE HAI 😎*");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_VIEW_STATUS', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_VIEW_STATUS', 'false', botNumber, config, reply);
    } else {
        reply(`*ABHI ${config.AUTO_VIEW_STATUS} HAI 😊*\n\n*JO BHI STATUS LAGAYE GA KHUD HI SEEN HO JAYE GA 😃 YEH SETTING ON KARNE K LIE LIKHO ☺️*\n*👑 ❮AUTOSTATUSVIEW ON❯ 👑*\n*OFF KARNE KE LIE LIKHO ☺️*\n*👑 ❮AUTOSTATUSVIEW OFF❯ 👑*`);
    }
});

cmd({
    pattern: "autolikestatus",
    alias: ["als"],
    desc: "Auto like status updates",
    category: "settings",
    react: "❤️"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("🚫 Owner only!");
    const value = args[0]?.toLowerCase();
    
    if (value === 'on' || value === 'true') {
        await updateConfig('AUTO_LIKE_STATUS', 'true', botNumber, config, reply);
    } else if (value === 'off' || value === 'false') {
        await updateConfig('AUTO_LIKE_STATUS', 'false', botNumber, config, reply);
    } else {
        reply(`Current Status: ${config.AUTO_LIKE_STATUS}\nUsage: .autolikestatus on/off`);
    }
});

// ============================================================
// 5. SYSTEM (Mode & Prefix)
// ============================================================

cmd({
    pattern: "mode",
    desc: "Change bot mode (public/private/groups/inbox)",
    category: "settings",
    react: "⚙️"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*YEH COMMAND SIRF MERE LIE HAI 😎*");
    const mode = args[0]?.toLowerCase();
    const validModes = ['public', 'private', 'groups', 'inbox'];

    if (validModes.includes(mode)) {
        await updateConfig('WORK_TYPE', mode, botNumber, config, reply);
    } else {
        reply(`*GHALAT LIKHA HAI 🥺*\n*ESE LIKHO ☺️*COMMAND ❮MODE❯ LIKH KER IN ME SE KOI EK WORD LIKHO JAHA AP CHAHTE HO K BOT WORK KRE 🤗*\n ${validModes.join(', ')}\nCurrent: ${config.WORK_TYPE}`);
    }
});

cmd({
    pattern: "setprefix",
    desc: "Change bot prefix",
    category: "settings",
    react: "👑"
},
async(conn, mek, m, { args, isOwner, reply, botNumber, config }) => {
    if (!isOwner) return reply("*YEH COMMAND SIRF MERE LIE HAI 😎*");
    const newPrefix = args[0];

    if (newPrefix) {
        // Ensure prefix is short (single character or short string)
        if (newPrefix.length > 1 && newPrefix !== 'noprefix') return reply("❌ Prefix must be short (e.g. . or ! or #)");
        
        await updateConfig('PREFIX', newPrefix, botNumber, config, reply);
    } else {
        reply(`*ABHI PREFIX ❮ ${config.PREFIX} ❯ HAI ☺️*\nJIS BHI NISHAN AP BOT CHALANA CHAHTE HAI WO NISHAN SET KERE ESE 😊*\n*❮SETPREFIX . ! + _ -❯*\n*JO BHI APKA DIL KARE 😍❣️*`);
    }
});
