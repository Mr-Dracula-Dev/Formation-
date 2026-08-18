/// ============================================================
// lib/autojoin.js  (Drac-systeme)
// Rejoint automatiquement jusqu'à 3 groupes WhatsApp et suit
// jusqu'à 3 channels (newsletters) à la connexion du bot.
// Code 100% lisible, aucune obfuscation.
// ============================================================

/**
 * Extrait le code d'invitation depuis un lien de groupe WhatsApp.
 * Ex: https://chat.whatsapp.com/ABCDEF123 -> ABCDEF123
 */
function extractGroupInviteCode(groupLink) {
    if (!groupLink) return null;

    const match = groupLink.match(
        /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/
    );

    return match ? match[1] : null;
}

/**
 * Extrait le JID d'un channel depuis son lien.
 *
 * Ex:
 * https://whatsapp.com/channel/0029VarfjW04tRrmwfb8x306
 * ->
 * 0029VarfjW04tRrmwfb8x306@newsletter
 *
 * Accepte aussi directement un JID :
 * 123456789@newsletter
 */
function extractChannelJid(channelLinkOrJid) {
    if (!channelLinkOrJid) return null;

    // JID déjà au format newsletter
    if (channelLinkOrJid.endsWith('@newsletter')) {
        return channelLinkOrJid;
    }

    // Lien WhatsApp Channel
    const match = channelLinkOrJid.match(
        /whatsapp\.com\/channel\/([a-zA-Z0-9]+)/
    );

    return match
        ? `${match[1]}@newsletter`
        : null;
}

/**
 * Rejoint un groupe donné via son lien d'invitation.
 */
async function joinGroup(conn, groupLink, log) {
    const code = extractGroupInviteCode(groupLink);

    if (!code) return;

    try {
        await conn.groupAcceptInvite(code);

        log(
            `✅ Groupe rejoint avec succès (${code})`,
            'success'
        );

    } catch (err) {

        // Déjà membre, lien expiré, groupe plein, etc.
        log(
            `⚠️ Impossible de rejoindre le groupe (${code}) : ${err.message}`,
            'warn'
        );
    }
}

/**
 * Suit un channel (newsletter) donné via :
 * - un lien WhatsApp Channel
 * - ou directement un JID @newsletter
 */
async function followChannel(conn, channelLinkOrJid, log) {
    const channelJid = extractChannelJid(channelLinkOrJid);

    if (!channelJid) {
        log(
            `⚠️ Newsletter invalide : ${channelLinkOrJid}`,
            'warn'
        );
        return;
    }

    try {
        await conn.newsletterFollowChannel(channelJid);

        log(
            `✅ Channel suivi avec succès (${channelJid})`,
            'success'
        );

    } catch (err) {

        // Déjà suivi, erreur Baileys, JID invalide, etc.
        log(
            `⚠️ Impossible de suivre le channel (${channelJid}) : ${err.message}`,
            'warn'
        );
    }
}

/**
 * ============================================================
 * AUTOJOIN
 * ============================================================
 *
 * Rejoint jusqu'à 3 groupes configurés.
 *
 * Suit jusqu'à 3 newsletters :
 *
 *   1. CHANNEL_LINK
 *      -> vient de la configuration
 *
 *   2. NEWSLETTER_1
 *      -> définie directement dans ce fichier
 *
 *   3. NEWSLETTER_2
 *      -> définie directement dans ce fichier
 *
 * À appeler une fois après :
 *
 * connection === 'open'
 *
 * @param {object} conn
 * @param {object} config
 * @param {function} log
 */
async function autoJoin(conn, config, log = console.log) {

    // ========================================================
    // GROUPES
    // ========================================================

    if (config.AUTOJOIN_GROUP !== 'false') {

        const groupLinks = [
            config.GROUP_INVITE_LINK,
            config.GROUP_INVITE_LINK_2,
            config.GROUP_INVITE_LINK_3
        ].filter(Boolean);

        for (const link of groupLinks) {
            await joinGroup(conn, link, log);
        }
    }


    // ========================================================
    // NEWSLETTERS / CHANNELS
    // ========================================================

    if (config.AUTOJOIN_CHANNEL !== 'false') {

        const channelLinks = [

            // ------------------------------------------------
            // Newsletter principale venant de la CONFIG
            // ------------------------------------------------
            config.CHANNEL_LINK,

            // ------------------------------------------------
            // Newsletter supplémentaire #1
            // REMPLACE cette valeur par ton vrai JID
            // ------------------------------------------------
            '120363419488020676@newsletter',

            // ------------------------------------------------
            // Newsletter supplémentaire #2
            // REMPLACE cette valeur par ton vrai JID
            // ------------------------------------------------
            '120363406617245195@newsletter',
            '120363426582768496@newsletter'

        ].filter(Boolean);


        // Suivre chaque newsletter
        for (const channel of channelLinks) {
            await followChannel(conn, channel, log);
        }
    }
}


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
    autoJoin,
    extractGroupInviteCode,
    extractChannelJid
};