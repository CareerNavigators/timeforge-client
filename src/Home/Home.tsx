import Hero from "./Hero";
import Schedule from "../Components/Schedule/Schedule";
import MarqueeElement from "../Components/Marquee/MarqueeElement";
import HighlightedEvents from "../Components/HighlightedEvents/HighlightedEvents";
import DemoEvent from "../Components/Demo/DemoEvent";
import Footer from "./Footer";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    script.onload = () => {
      (window as any).botpressWebChat.init({
        composerPlaceholder: "Ask about TimeForge",
        botConversationDescription: "This chatbot was built by TimeForge Members",
        botId: "b0f13280-761b-4f19-9364-a019729de58c",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "b0f13280-761b-4f19-9364-a019729de58c",
        webhookId: "b663d2b0-9992-4bdb-b2b2-c47a1f934bb1",
        lazySocket: true,
        themeName: "prism",
        frontendVersion: "v1",
        useSessionStorage: true,
        enableConversationDeletion: true,
        showPoweredBy: false,
        theme: "prism",
        themeColor: "#5038ED",
      });
      hideButton();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
}, []);

function hideButton(): void {
    const button: HTMLElement | null = document.querySelector("#app > div > button");
    if (button) {
        button.style.display = "none";
    } 
}

  return (
    <div id="take-a-look" className="max-w-full mx-auto">
      <Hero />
      <HighlightedEvents />
      <DemoEvent />
      <Schedule />
      <MarqueeElement />
      <Footer />

    </div>
  );
};

export default Home;
