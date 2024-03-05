import Hero from "./Hero";
import Schedule from "../Components/Schedule/Schedule";
import MarqueeElement from "../Components/Marquee/MarqueeElement";
import HighlightedEvents from "../Components/HighlightedEvents/HighlightedEvents";
import DemoEvent from "../Components/Demo/DemoEvent";
import Footer from "./Footer";
import { useEffect } from "react";

const Home = ({ isHome }: { isHome: boolean }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    script.onload = () => {
      (window as any).botpressWebChat.init({
        composerPlaceholder: "Want to know about TimeForge?",
        botConversationDescription: "This bot is developed by TimeForge.",
        botId: "b0f13280-761b-4f19-9364-a019729de58c",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "b0f13280-761b-4f19-9364-a019729de58c",
        webhookId: "b663d2b0-9992-4bdb-b2b2-c47a1f934bb1",
        lazySocket: true,
        themeName: "prism",
        botName: "TimeForge",
        avatarUrl: "https://res.cloudinary.com/ddcjzcoys/image/upload/v1709583226/ytsadbl7mazxhirvkqqg.png",
        frontendVersion: "v1",
        useSessionStorage: true,
        enableConversationDeletion: true,
        theme: "prism",
        themeColor: "#2563eb"
      });
      // showButton();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    showButton(isHome);
  }, [isHome]);

  function showButton(isHome: boolean): void {
    const button = document.getElementById("bp-web-widget-container");
    if (button) {
      button.style.display = isHome ? "block" : "none";
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
