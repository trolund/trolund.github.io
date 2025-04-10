---
title: 'Lock Note – Secure Self-Destructing Notes'
excerpt: 'A small fun project built during parental leave to stay sharp with coding. Lock Note is a secure note-sharing app with one-time readability, optional password protection, and self-destructing storage – all deployed in Azure using Infrastructure as Code.'
coverImage: '/assets/blog/lock-note/fronpage.png'
date: '2025-04-10T10:00:00.000Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/lock-note/fronpage.png'
tags: ['project']
technologies: ['C#', '.NET 8', 'React', 'Azure', 'Bicep']
language: 'en'
---

While I was on parental leave, I wanted to keep my coding brain somewhat active (in between naps and diapers 😅), so I built this small side project called Lock Note.

It’s a simple app where you can write a note, get a unique link, and share it securely. The twist? The note can only be read once (or an predefine number of times), and then it’s gone forever. You can also add a password for extra security if you want.

# 🧪 What It Can Do

Write a note → Get a link → Share it

The note is deleted after it’s read (or after a set number of reads)

Optional password protection - In this case is the note also encrypted so no one without the password can read the note.

Notes expire automatically after 30 days if not read the note will self-destruct.

![alt text](/assets/blog/lock-note/createNote.png)

# 🧰 Tech Stack

- React 18 for the frontend (simple and minimal) and tailwind for styling.

- .NET 8 and C# for the backend with cosmosDB for storage.

- Azure Function App to async periodic events.

- Bicep to define and deploy the infrastructure.

- GitHub Actions for CI/CD pipelines.

# ⚙️ How It Works

You create a note, and the backend stores it, and encrypts if a password is provided. It generates you a unique link.

The recipient opens the link — the backend decrypts the note, shows it once, and then deletes it.

If the link has already been used or the note is expired, it just shows an error.

![alt text](/assets/blog/lock-note/created.png)

## 💡 Why I Made It

No big reason — just wanted to do something fun and small to stay sharp while being off work. It’s the kind of tool I’ve wished existed a few times, so I figured I’d just build it.

# 🛠 Maybe Later…

- A browser extension for quick note creation

- Making the UI a bit more mobile-friendly

That’s it! Just a cozy little project I had fun putting together. 🪩
