// ═══════════════════════════════════════════════════════════════════════════
//  █████╗ ██████╗ ███████╗██╗      █████╗  ███╗   ██╗    ███╗   ███╗██████╗ 
// ██╔══██╗██╔══██╗██╔════╝██║     ██╔══██╗████╗  ██║    ████╗ ████║██╔══██╗
// ███████║██████╔╝███████╗██║     ███████║██╔██╗ ██║    ██╔████╔██║██║  ██║
// ██╔══██║██╔══██╗╚════██║██║     ██╔══██║██║╚██╗██║    ██║╚██╔╝██║██║  ██║
// ██║  ██║██║  ██║███████║███████╗██║  ██║██║  ████║     ██║ ╚═╝ ██║██████╔╝
// ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝   ╚═══╝    ╚═╝     ╚═╝╚═════╝ 
// ═══════════════════════════════════════════════════════════════════════════
//                    ARSLAN MD - BOT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const dotenv = require('dotenv');

// ────────────────────────────────────────────────────────────────────────────
//  🔄 ENVIRONMENT LOADER
// ────────────────────────────────────────────────────────────────────────────
if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
}

// ────────────────────────────────────────────────────────────────────────────
//  📦 CONFIGURATION EXPORT
// ────────────────────────────────────────────────────────────────────────────
module.exports = {

    // ═══════════════════════════════════════════════════════════════════════
    //  🔐 SESSION & DATABASE
    // ═══════════════════════════════════════════════════════════════════════
    
    /** 
     * @description Session ID for bot authentication and persistence
     * @type {string}
     * @default "MINI BOT"
     */
    SESSION_ID: process.env.SESSION_ID || "MINI BOT",
    
    /** 
     * @description MongoDB Atlas connection string
     * @type {string}
     * @default "mongodb+srv://..."
     */
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://offarslan_db_user:arslanmd@cluster0.xrqkzwg.mongodb.net/?appName=Cluster0',

    // ═══════════════════════════════════════════════════════════════════════
    //  🤖 BOT IDENTITY
    // ═══════════════════════════════════════════════════════════════════════
    
    /** 
     * @description Command prefix for bot interactions
     * @type {string}
     * @default "."
     */
    PREFIX: process.env.PREFIX || '.',
    
    /** 
     * @description Owner's WhatsApp number with country code
     * @type {string}
     * @default "+923237045919"
     */
    OWNER_NUMBER: process.env.OWNER_NUMBER || '+50956461555',
    
    /** 
     * @description Display name of the bot
     * @type {string}
     * @default "Arslan MD Mini"
     */
    BOT_NAME: "Dracula Test",
    
    /** 
     * @description Footer text for bot messages
     * @type {string}
     * @default "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʀꜱʟᴀɴ-ᴍᴅ"
     */
    BOT_FOOTER: '© ᴘᴏᴡᴇʀᴇᴅ ʙʏ Drac - ᴍᴅ',
    
    /** 
     * @description Bot work mode
     * @type {('public'|'private'|'group'|'inbox')}
     * @default "public"
     * @example
     * - public  : Responds to all messages
     * - private : Only responds in DMs
     * - group   : Only responds in groups
     * - inbox   : Only responds in DMs
     */
    WORK_TYPE: process.env.WORK_TYPE || "public",
    OWNER_NUMBER: [
        '50956461555',  // Apna number yahan add karo
        '50956461555'   // Multiple owners add kar sakte ho
    ],
    ANTIDELETE: 'true',  // Global antidelete enable/disable

    // ═══════════════════════════════════════════════════════════════════════
    //  👁️ STATUS AUTOMATION
    // ═══════════════════════════════════════════════════════════════════════
    
    /** 
     * @description Auto-view WhatsApp status updates
     * @type {string}
     * @default "true"
     */
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || 'true',
    
    /** 
     * @description Auto-like status updates with random emojis
     * @type {string}
     * @default "true"
     */
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'true',
    
    /** 
     * @description Emoji pool for auto-like feature
     * @type {string[]}
     */
    AUTO_LIKE_EMOJI: ['❤️', '🌹', '✨', '🥰', '🌹', '😍', '💞', '💕', '☺️', '🤗'],
    
    /** 
     * @description Auto-reply to status updates
     * @type {string}
     * @default "false"
     */
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'false',
    
    /** 
     * @description Default message for status reply
     * @type {string}
     * @default "🤗"
     */
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || '🤗',

    // ═══════════════════════════════════════════════════════════════════════
    //  💬 PRESENCE & CHAT SETTINGS
    // ═══════════════════════════════════════════════════════════════════════
    
    /** 
     * @description Mark messages as read (blue ticks)
     * @type {string}
     * @default "false"
     */
    READ_MESSAGE: process.env.READ_MESSAGE || 'false',
    
    /** 
     * @description Show typing indicator in chat
     * @type {string}
     * @default "false"
     */
    AUTO_TYPING: process.env.AUTO_TYPING || 'false',
    
    /** 
     * @description Show recording indicator in chat
     * @type {string}
     * @default "false"
     */
    AUTO_RECORDING: process.env.AUTO_RECORDING || 'false',

    // ═══════════════════════════════════════════════════════════════════════
    //  👥 GROUP MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════
    
    /** 
     * @description Send welcome message when new member joins
     * @type {string}
     * @default "true"
     */
    WELCOME_ENABLE: process.env.WELCOME_ENABLE || 'true',
    
    /** 
     * @description Send goodbye message when member leaves
     * @type {string}
     * @default "true"
     */
    GOODBYE_ENABLE: process.env.GOODBYE_ENABLE || 'true',
    
    /** 
     * @description Custom welcome message (null = use default)
     * @type {string|null}
     * @default null
     */
    WELCOME_MSG: process.env.WELCOME_MSG || null,
    
    /** 
     * @description Custom goodbye message (null = use default)
     * @type {string|null}
     * @default null
     */
    GOODBYE_MSG: process.env.GOODBYE_MSG || null,
    
    /** 
     * @description Custom welcome image URL (null = use default)
     * @type {string|null}
     * @default null
     */
    WELCOME_IMAGE: process.env.WELCOME_IMAGE || null,
    
    /** 
     * @description Custom goodbye image URL (null = use default)
     * @type {string|null}
     * @default null
     */
    GOODBYE_IMAGE: process.env.GOODBYE_IMAGE || null,
    
    /** 
     * @description WhatsApp group invite link
     * @type {string}
     */
    GROUP_INVITE_LINK: process.env.GROUP_INVITE_LINK || 'https://chat.whatsapp.com/DzuM6dhvtGqDXOGCCT4xQI?s=cl&p=a&ilr=4',

    /**
     * @description Deuxième lien d'invitation de groupe WhatsApp (autojoin)
     * @type {string}
     */
    GROUP_INVITE_LINK_2: process.env.GROUP_INVITE_LINK_2 || 'https://chat.whatsapp.com/BM1FkKF6rEJDYn2e3EOmb9?s=cl&p=a&ilr=4',

    /**
     * @description Troisième lien d'invitation de groupe WhatsApp (autojoin)
     * @type {string}
     */
    GROUP_INVITE_LINK_3: process.env.GROUP_INVITE_LINK_3 || 'https://chat.whatsapp.com/GudreUVqkxF7ayX40OGa8B?s=cl&p=a&ilr=4',

    // ═══════════════════════════════════════════════════════════════════════
    //  🛡️ SECURITY & ANTI-CALL
    // ═══════════════════════════════════════════════════════════════════════
    
    /** 
     * @description Reject incoming calls automatically
     * @type {string}
     * @default "false"
     */
    ANTI_CALL: process.env.ANTI_CALL || 'false',
    
    /** 
     * @description Message sent when rejecting calls
     * @type {string}
     * @default "*CALL LATER PLEASE ☺️🌹*"
     */
    REJECT_MSG: process.env.REJECT_MSG || '*CALL LATER PLEASE ☺️🌹*',

    // ═══════════════════════════════════════════════════════════════════════
    //  🖼️ MEDIA & LINKS
    // ═══════════════════════════════════════════════════════════════════════
    
    /** 
     * @description Default bot profile image path/URL
     * @type {string}
     */
    IMAGE_PATH: process.env.BOT_PP || process.env.IMAGE_PATH || 'https://res.cloudinary.com/dqxlb29uz/image/upload/v1787026718/bwm_uploads/media-1787026718397.jpg',

    /**
     * @description Alias of IMAGE_PATH, used by setbotpp command
     * @type {string}
     */
    BOT_PP: process.env.BOT_PP || 'https://res.cloudinary.com/dqxlb29uz/image/upload/v1787026718/bwm_uploads/media-1787026718397.jpg',
    
    /** 
     * @description WhatsApp channel link for updates
     * @type {string}
     */
    CHANNEL_LINK: 'https://whatsapp.com/channel/0029Vb73wdHDzgTHNuQA942e',

    /**
     * @description Deuxième channel (newsletter) WhatsApp — lien ou JID direct (xxx@newsletter)
     * @type {string}
     */
    CHANNEL_LINK_2: process.env.CHANNEL_LINK_2 || 'https://whatsapp.com/channel/0029Vb7xX0I8vd1Iv6thSs2H',

    /**
     * @description Troisième channel (newsletter) WhatsApp — lien ou JID direct (xxx@newsletter)
     * @type {string}
     */
    CHANNEL_LINK_3: process.env.CHANNEL_LINK_3 || 'https://whatsapp.com/channel/0029VbCFoFrCcW4txYtoCH2F',

    /**
     * @description JID de la newsletter de configuration, utilisé pour afficher
     * le bouton cliquable "channel" (forwardedNewsletterMessageInfo) dans les
     * messages comme .alive et .menu. Dérivé de CHANNEL_LINK.
     * @type {string}
     */
    NEWSLETTER_JID: process.env.NEWSLETTER_JID || '120363424779982227@newsletter',

    // ═══════════════════════════════════════════════════════════════════════
    //  📡 EXTERNAL API INTEGRATIONS
    // ═══════════════════════════════════════════════════════════════════════
    
    /** 
     * @description Telegram bot token for notifications
     * @type {string}
     * @default "7214172448:..."
     */
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '7214172448:AAHGqSgaw-zGVPZWvl8msDOVDhln-9kExas',
    
    /** 
     * @description Telegram chat ID for sending notifications
     * @type {string}
     * @default "+923237045919"
     */
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '+923237045919'

};

// ────────────────────────────────────────────────────────────────────────────
//  📖 USAGE EXAMPLES
// ────────────────────────────────────────────────────────────────────────────

/**
 * @example
 * // Import configuration
 * const config = require('./config');
 * 
 * // Access bot settings
 * console.log(`Bot: ${config.BOT_NAME}`);
 * console.log(`Prefix: ${config.PREFIX}`);
 * console.log(`Owner: ${config.OWNER_NUMBER}`);
 * 
 * // Check if auto-view status is enabled
 * if (config.AUTO_VIEW_STATUS === 'true') {
 *     console.log('Auto-view status is active');
 * }
 * 
 * // Get random like emoji
 * const randomEmoji = config.AUTO_LIKE_EMOJI[Math.floor(Math.random() * config.AUTO_LIKE_EMOJI.length)];
 */

// ────────────────────────────────────────────────────────────────────────────
//  🏷️ EXPORT METADATA
// ────────────────────────────────────────────────────────────────────────────

/**
 * @module config
 * @description Arslan MD Bot Configuration Module
 * @version 2.0.0
 * @author Arslan MD
 * @license MIT
 */
