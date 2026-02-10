# X / Twitter Auto-Block by Keyword (Tampermonkey)

A **Tampermonkey userscript** that automatically blocks X (Twitter) accounts posting tweets containing specific keywords or hashtags.

This script is especially useful to fight **spam campaigns**, such as undisclosed paid collaborations that flood timelines with repetitive content.

---

## ✨ Features

- Automatically scans visible tweets on X / Twitter
- Detects custom keywords or hashtags (case-insensitive)
- Automatically blocks the author of the tweet
- Works with infinite scroll
- No external dependencies

---

## 🛠 Requirements

- Any browser which supports Tampermoney extension
- **Tampermonkey** browser extension

---

## 🚀 Installation

1. Install **Tampermonkey**  
   https://www.tampermonkey.net/

2. Open Tampermonkey and click **“Create a new script”**

3. Remove all default content

4. Paste the script code from this repository

5. Save the script

6. Reload:
   - https://x.com  
   - or https://twitter.com

The script will start running automatically.

---

## ⚙️ Configuration

Edit the `KEYWORDS` array inside the script to define what you want to block:

```javascript
const KEYWORDS = [
  '#salesforcepartner' //any string will work
];
```

## 🗒️ Notes

- Matching is case-insensitive
- Extra spaces and line breaks are normalized
- Use longer phrases to reduce false positives

## ⚠️ Important Notes

- This script blocks accounts, it does not just hide tweets
- Quoted or ironic mentions will also trigger a block
- Recommended for temporary use during spam waves

## 🧩 How To Use It

- Once it is working, just go to twitter searchbar, type the keyword you want to block and let the script work.

Before tampermonkey script is active

![Before](https://i.ibb.co/xK8trSTP/before.png "Before img")

After tampermonkey script is active

![After](https://i.ibb.co/3YRdCmxr/after.png "After img")


## 📄 License

MIT License
Free to use, modify and distribute.