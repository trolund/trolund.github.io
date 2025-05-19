---
title: 'Enhance Your Text with LLM Spoon for Hammerspoon'
excerpt: 'If you’re a Hammerspoon user and often find yourself rewriting, summarizing, or translating text, this little spoon might come in handy.'
coverImage: '/assets/blog/ai-spoon/front.png'
date: '2025-05-18T00:00:00.000Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/5-semester/datas.png'
tags: ['project']
technologies: ['Machine learning', 'Python', 'LLM', 'Lua']
language: 'en'
---

If you’re a Hammerspoon user and often find yourself rewriting, summarizing, or translating text, this little spoon might come in handy.

**LLM Spoon for Hammerspoon** is a simple tool I created that connects Hammerspoon with Cohere’s large language model. It lets you trigger useful text transformations — like rewriting, summarizing, or translating — with a hotkey.

It’s not a polished product, just a small helper I use myself. Maybe it’s useful to someone else too, or maybe you’ll want to tweak it to better suit your own needs.

## ✨ Why I Built This

As someone who’s dyslexic, I often find large language models incredibly useful when I need to clean up or clarify my writing.

That’s why I built this simple spoon for Hammerspoon: so I can quickly improve selected text with a single hotkey, right when I need it.

If you’re like me and occasionally need a little help tightening up your writing, this tool can make that process a lot smoother.

## 🛠 What It Can Do

The LLM Spoon includes a few basic actions:

- **Rewrite** – Improves grammar, spelling, and sentence structure
- **Summarize** – Condenses long passages into a shorter summary
- **Translate (EN ⇄ DA)** – Translates between English and Danish
- _(It’s easy to add more prompt types if you like)_

I use Cohere because it offers a free option that allows me to use its API. Other LLM's maybe superior. The Python code used to call the API is straightforward and can be easily modified to work with other LLMs.

## 🚀 Installation

1. Clone or download the repository
2. Double-click `AiHelper.spoon` — Hammerspoon will install it for you

## ⚙️ Configuration

Before using the spoon, you’ll need a Cohere API key. You can get one at [Cohere API Keys](https://dashboard.cohere.com/api-keys).

Then, add this to your Hammerspoon `init.lua` file:

```lua
hs.settings.set("AiHelper.apiKey", "<COHERE_API_KEY>")

-- Load the spoon
hs.loadSpoon("AiHelper")

-- Initialize the helper
spoon.AiHelper:init()

-- Set up hotkeys
spoon.AiHelper:bindHotkeys({
    rewrite = {{"cmd", "alt", "ctrl"}, "R"}
})
```

Now you can select some text, press your hotkey, and let the language model help out.

---

It’s just a small utility I built for myself — shared in case others find it helpful or want to modify it for their own workflows.

Let me know if you end up using it or improving it — I’d love to hear how you make it your own.

The source code can be found [here.](https://github.com/trolund/llm-spoon)
