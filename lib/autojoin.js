// ============================================================
// lib/autojoin.js
// Rejoint automatiquement le groupe WhatsApp officiel et suit
// le channel (newsletter) officiel à la connexion du bot.
// Code 100% lisible, aucune obfuscation — remplace l'ancien
// lib/system.js qui faisait potentiellement la même chose de
// façon opaque (et peut-être davantage).
// ============================================================

/**
 * Extrait le code d'invitation depuis un lien de groupe WhatsApp.
 * Ex: https://chat.whatsapp.com/ABCDEF123 -> ABCDEF123
 */
function extractGroupInviteCode(groupLink) {
    if (!groupLink) return null;
    const match = groupLink.match(/chat\.whatsapp\.com\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
}

/**
 * Extrait le JID d'un channel depuis son lien.
 * Ex: https://whatsapp.com/channel/0029VarfjW04tRrmwfb8x306 -> 0029VarfjW04tRrmwfb8x306@newsletter
 * (Baileys attend le JID complet, pas juste l'ID)
 */
function extractChannelJid(channelLink) {
    if (!channelLink) return null;
    const match = channelLink.match(/whatsapp\.com\/channel\/([a-zA-Z0-9]+)/);
    return match ? `${match[1]}@newsletter` : null;
}

/**
 * Rejoint le groupe officiel et suit le channel officiel.
 * À appeler une fois, juste après la connexion réussie (connection === 'open').
 *
 * @param {object} conn - la connexion Baileys active
 * @param {object} config - config effective de cet utilisateur (par numéro)
 * @param {function} log - fonction de log (arslanLog)
 */
async function autoJoin(conn, config, log = console.log) {
    // --- Rejoindre le groupe ---
    if (config.AUTOJOIN_GROUP !== 'false' && config.GROUP_INVITE_LINK) {
        const code = extractGroupInviteCode(config.GROUP_INVITE_LINK);
        if (code) {
            try {
                await conn.groupAcceptInvite(code);
                log(`✅ Groupe rejoint avec succès (${code})`, 'success');
            } catch (err) {
                // Déjà membre, lien expiré, ou groupe plein : on log sans casser la connexion
                log(`⚠️ Impossible de rejoindre le groupe : ${err.message}`, 'warn');
            }
        }
    }

    // --- Suivre le channel (newsletter) ---
    if (config.AUTOJOIN_CHANNEL !== 'false' && config.CHANNEL_LINK) {
        const channelJid = extractChannelJid(config.CHANNEL_LINK);
        if (channelJid) {
            try {
                await conn.newsletterFollowChannel(channelJid);
                log(`✅ Channel suivi avec succès (${channelJid})`, 'success');
            } catch (err) {
                log(`⚠️ Impossible de suivre le channel : ${err.message}`, 'warn');
            }
        }
    }
}

module.exports = { autoJoin, extractGroupInviteCode, extractChannelJid };
