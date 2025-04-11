import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Configure document title and meta
document.title = "AlgoTrust - Reputation Scoring System with AI & Soulbound NFTs";

// Add meta description
const metaDesc = document.createElement("meta");
metaDesc.name = "description";
metaDesc.content = "AI-powered reputation scoring system on the Algorand blockchain with Soulbound NFTs";
document.head.appendChild(metaDesc);

// Add favicon
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'><path d='M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0Z' fill='black'/><path d='M36.5172 42H31.6552V18H36.5172V42Z' fill='%2300BF63'/><path d='M28.3448 42H23.4828V24.8276H28.3448V42Z' fill='%2300BF63'/><path d='M20.1724 42H15.3103V31.6552H20.1724V42Z' fill='%2300BF63'/><path d='M44.8276 42H39.9655V24.8276H44.8276V42Z' fill='%2300BF63'/></svg>";
document.head.appendChild(favicon);

// Add font preconnect
const fontPreconnect = document.createElement("link");
fontPreconnect.rel = "preconnect";
fontPreconnect.href = "https://fonts.googleapis.com";
document.head.appendChild(fontPreconnect);

const fontPreconnect2 = document.createElement("link");
fontPreconnect2.rel = "preconnect";
fontPreconnect2.href = "https://fonts.gstatic.com";
fontPreconnect2.crossOrigin = "";
document.head.appendChild(fontPreconnect2);

// Add font import
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
document.head.appendChild(fontLink);

createRoot(document.getElementById("root")!).render(<App />);
