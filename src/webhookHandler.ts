import axios from 'axios'
import { getConfigProperty } from './configHelper'

function sendWebhookData(options: Partial<Webhook>): void {
    let data = {
        content: options.content || '',
        avatar_url: options.avatar_url,
        tts: options.tts,
        embeds: options.embeds || [],
        username: options.username || 'BAF'
    }
    axios.post(getConfigProperty('WEBHOOK_URL'), data)
}

function isWebhookConfigured() {
    return !!getConfigProperty('WEBHOOK_URL')
}

export function sendWebhookInitialized() {
    if (!isWebhookConfigured()) {
        return
    }
    let ingameName = getConfigProperty('INGAME_NAME')
    sendWebhookData({
        content: 'Initialized Connection',
        embeds: [
            {
                title: 'Initialized Connection',
                fields: [
                    { name: 'Connected as:', value: `\`\`\`${ingameName}\`\`\``, inline: false },
                    {
                        name: 'Started at:',
                        value: `<t:${(Date.now() / 1000).toFixed(0)}:t>`,
                        inline: false
                    }
                ],
                thumbnail: { url: `https://minotar.net/helm/${ingameName}/600.png` }
            }
        ]
    })
}

export function sendWebhookItemPurchased(itemName: string, price: string, target: string) {
    if (!isWebhookConfigured()) {
        return
    }
    let ingameName = getConfigProperty('INGAME_NAME')
    sendWebhookData({
        embeds: [
            {
                title: 'Item Purchased',
                fields: [
                    {
                        name: 'Item:',
                        value: `\`\`\`${itemName}\`\`\``,
                        inline: true
                    },
                    {
                        name: 'Bought for:',
                        value: `\`\`\`${price}\`\`\``,
                        inline: true
                    },
                    {
                        name: 'Estimated Profit:',
                        value: `\`\`\`${target}\`\`\``,
                        inline: true
                    }
                ],
                thumbnail: { url: `https://minotar.net/helm/${ingameName}/600.png` }
            }
        ]
    })
}

export function sendWebhookItemSold(itemName: string, price: string, purchasedBy: string, target: string) {
    if (!isWebhookConfigured()) {
        return
    }
    let ingameName = getConfigProperty('INGAME_NAME')
    sendWebhookData({
        embeds: [
            {
                title: 'Item Sold',
                fields: [
                    {
                        name: 'Purchased by:',
                        value: `\`\`\`${purchasedBy}\`\`\``,
                        inline: true
                    },
                    {
                        name: 'Item Sold:',
                        value: `\`\`\`${itemName}\`\`\``,
                        inline: true
                    },
                    {
                        name: 'Sold for:',
                        value: `\`\`\`${price}\`\`\``,
                        inline: true
                    },
                     {
                        name: 'Estimated Profit:',
                        value: `\`\`\`${target}\`\`\``,
                        inline: true
                    }
                ],
                thumbnail: { url: `https://minotar.net/helm/${ingameName}/600.png` }
            }
        ]
    })
}

export function sendWebhookItemListed(itemName: string, price: string, duration: number, target: string) {
    if (!isWebhookConfigured()) {
        return
    }
    let ingameName = getConfigProperty('INGAME_NAME')
    sendWebhookData({
        embeds: [
            {
                title: 'Item Listed',
                fields: [
                    {
                        name: 'Listed Item:',
                        value: `\`\`\`${itemName}\`\`\``,
                        inline: false
                    },
                    {
                        name: 'Item Price:',
                        value: `\`\`\`${price}\`\`\``,
                        inline: false
                    },
                     {
                        name: 'Estimated Profit:',
                        value: `\`\`\`${target}\`\`\``,
                        inline: true
                    },
                    {
                        name: 'AH Duration:',
                        value: `\`\`\`${duration}h\`\`\``,
                        inline: false
                    }
                ],
                thumbnail: { url: `https://minotar.net/helm/${ingameName}/600.png` }
            }
        ]
    })
}
