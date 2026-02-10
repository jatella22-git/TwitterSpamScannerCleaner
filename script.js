// ==UserScript==
// @name         X / Twitter - AutoBlock by keyword (fix render)
// @namespace    https://tampermonkey.net/
// @version      1.3
// @description  Block accounts if posted tweet contains keyword.
// @match        https://x.com/*
// @match        https://twitter.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  "use strict";

    const KEYWORDS = [
        '#SalesforcePartner'
    ];

  const DEBUG = true;

  const seenUsers = new Set();
  const processedWithText = new WeakSet();

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const log = (...a) => DEBUG && console.log("[AutoBlockX]", ...a);

  function norm(s) {
    return (s || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function containsKeyword(text) {
    const t = norm(text);
    return KEYWORDS.some(k => t.includes(norm(k)));
  }

  function getTweetText(article) {
    const node = article.querySelector('[data-testid="tweetText"]');
    if (node && node.innerText) return node.innerText;
    return article.innerText || "";
  }

  function getUsername(article) {
    const statusLink = article.querySelector('a[href*="/status/"]');
    if (!statusLink) return null;
    const href = statusLink.getAttribute("href") || "";
    const parts = href.split("/");
    return parts[1] || null;
  }

  async function blockFromOpenMenu() {
    const blockItem =
      document.querySelector('[data-testid="block"]') ||
      [...document.querySelectorAll('div[role="menuitem"]')].find(el => {
        const t = norm(el.innerText);
        return t.includes("bloquear") || t === "block";
      });

    if (!blockItem) {
      log("Opened menu but cannot find block button.");
      return false;
    }

    blockItem.click();
    await sleep(250);

    const confirm =
      document.querySelector('[data-testid="confirmationSheetConfirm"]') ||
      [...document.querySelectorAll('button, div[role="button"]')].find(el => {
        const t = norm(el.innerText);
        return t === "bloquear" || t === "block";
      });

    if (!confirm) {
      log("Cannot find block confirmation.");
      return false;
    }

    confirm.click();
    return true;
  }

  async function handle(article) {
    if (processedWithText.has(article)) return;

    const text = getTweetText(article);

    if (!text || norm(text).length < 3) return;

    processedWithText.add(article);

    if (!containsKeyword(text)) return;

    const user = getUsername(article);
    log("Detected KEYWORD. user:", user, "| Text:", norm(text).slice(0, 120) + "...");

    if (!user || seenUsers.has(user)) return;
    seenUsers.add(user);

    const caret =
      article.querySelector('[data-testid="caret"]') ||
      article.querySelector('button[aria-label*="Más"]') ||
      article.querySelector('button[aria-label*="More"]');

    if (!caret) {
      log("Cannot find button '...' (caret) for user:", user);
      return;
    }

    caret.click();
    await sleep(350);

    const ok = await blockFromOpenMenu();
    log(ok ? "✅ Blocked:" : "❌ Error blocking:", user);
  }

  function scan() {
    const arts = document.querySelectorAll("article");
    log("Scanning... visible tweets:", arts.length);
    arts.forEach(a => handle(a));
  }

  scan();
  setInterval(scan, 1500);
})();
