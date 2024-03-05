import { useEffect } from 'react'

const Bot = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'

        script.async = true
        document.body.appendChild(script)

        script.onload = () => {
            (window as any).botpressWebChat.init({
                "composerPlaceholder": "Want to know about TimeForge?",
                "botConversationDescription": "This bot is developed by TimeForge navigators.",
                "botId": "b0f13280-761b-4f19-9364-a019729de58c",
                "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
                "messagingUrl": "https://messaging.botpress.cloud",
                "clientId": "b0f13280-761b-4f19-9364-a019729de58c",
                "webhookId": "b663d2b0-9992-4bdb-b2b2-c47a1f934bb1",
                "lazySocket": true,
                "themeName": "prism",
                "botName": "TimeForge",
                "avatarUrl": "https://res.cloudinary.com/ddcjzcoys/image/upload/v1709583226/ytsadbl7mazxhirvkqqg.png",
                "frontendVersion": "v1",
                "useSessionStorage": true,
                "enableConversationDeletion": true,
                "showPoweredBy": false,
                "theme": "prism",
                "themeColor": "#2563eb",
                "showConversationButton": true,
                "showTimeStamp": true,
                // "hideWidget": true
            })
        }
    }, [])

    return (
        <div  hidden><div  id="webchat" /></div>
    )
}

export default Bot