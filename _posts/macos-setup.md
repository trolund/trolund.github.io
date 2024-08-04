---
title: 'Automating my macOS Setup'
excerpt: 'A walk trough of how i have streamlined my macOS setup process with automation scripts for system customization and enhanced productivity.'
coverImage: '/assets/blog/macos-setup/automation.jpg'
date: '2024-08-03T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/macos-setup/automation.jpg'
tags: ["automation", "macOS", "productivity", "post"]
technologies: ["Bash", "Shell Scripting", "Zsh", "macOS"]
language: "en"
---

## Introduction 🧑‍🔬

Setting up a new macOS environment can be a daunting task, especially if you have specific preferences and a suite of applications you rely on daily. Luckily, automation can significantly streamline this process. In this post, I'll walk you through how i setup my mac with a series of scripts to tailor the macOS experience to my liking, focusing on efficiency, customization, and productivity.

I have been using *macOS* for 10 years+ but this setup script is quit new and by no means perfect. My focus is primarily to set it up my system for software development, your focus my be vastly different. The scripts evolve over time as i find new ways of working.

### Why Automate Your macOS Setup? 🤔

Automating your macOS setup has several benefits:

- **Time-saving**: Quickly configure settings and install applications with minimal manual intervention.
- **Consistency**: Ensure that your setup remains consistent across multiple devices.
- **Customization**: Easily apply personalized settings that fit your workflow.

In this guide, I'll explain how the scripts I developed can help you achieve these goals, making your macOS experience more enjoyable and tailored to your needs.

## Overview of the Scripts 🗒️

Before diving into the step-by-step instructions, let’s take a look at the scripts that power this setup:

1. **Setup-macos.sh**: This script orchestrates the entire setup process, calling other scripts to apply settings and install applications.

2. **Settings-macos.sh**: Handles macOS-specific settings, including system preferences, dock configurations, keyboard and trackpad settings, and more.

3. **Utils.sh**: Provides utility functions for managing the *Zsh* configuration, backing up important files, and checking for software installations.

4. **Shell-setup.sh**: Customizes the shell environment, focusing on *Zsh*, and installs helpful plugins for an enhanced command-line experience.

5. **Manual-steps.md**: A guide detailing any manual steps needed to complete the setup that the scripts can't yet handle automatically.

6. **Readme.md**: Documentation explaining how to use the scripts, including prerequisites and detailed instructions.

## Step-by-Step Setup Guide 🪜

Let's dive into the setup process. Follow these steps to automate your macOS environment:

### Step 1: Preparing Your System 🙏

Before executing any scripts, ensure that your macOS system is up-to-date. This step will help prevent any compatibility issues during the setup process. The scripts have been tested on *macOS Sonoma 14.5 (23F79)*. When running the *install-apps-macos.sh* it asks if you want to update macOS. Orherwise you can update macOS my going to to **System Preferences > Software Update** and install any available updates.

### Step 2: Clone the Repository 🤟

Start by cloning the repository containing the scripts to your local machine. Use the following command in Terminal:

```bash
git clone https://github.com/trolund/macos-setup-scripts.git
cd macos-setup-scripts
```

### Step 3: Run the Setup Script 🏃‍♂️

The `setup-macos.sh` script is your main entry point. It orchestrates the setup process by calling other scripts to configure system settings and install applications.

**Please review the scripts carefully before running them on your system.**

Run the following command to start the setup:

```bash
./setup-macos.sh
```

This script performs the following tasks:

- **Configures macOS Settings**: Calls `settings-macos.sh` to apply system preferences, such as:

  - Automatically switching between light and dark mode
  - Customizing dock size and behavior
  - Customizing the Finder
  - Removing all apps from the dock
  - Disabling the Dashboard
  - Hide desktop icons
  
  and mush more...

- **Installs Applications**: Executes a separate script to install essential applications using Homebrew. This includes tools like Git, Node.js, and more.
- **Sets Up the Shell**: Invokes `shell-setup.sh` to configure *Zsh*, setting up plugins and themes for an enhanced terminal experience.

### Step 4: Customize macOS Settings 🛠

The `settings-macos.sh` script focuses on personalizing macOS settings to improve your workflow. Here are some highlights:

- **Appearance and Behavior**:
  - Automatically switch between light and dark mode based on ambient light.
  - Customize dock settings, including size and magnification.
  - Configure Finder preferences to show hidden files and file extensions.

- **Keyboard and Trackpad**:
  - Adjust keyboard repeat rate for faster typing.
  - Enable tap-to-click on the trackpad for quicker navigation.

- **Dock and Mission Control**:
  - Set up the dock to hide and show automatically.
  - Disable dashboard features for a cleaner experience.

### Step 5: Enhance Your Shell Experience 🐚

The `shell-setup.sh` script customizes your Zsh environment, providing a powerful and flexible command-line experience. Here's what it does:

- **Oh My Zsh Installation**: Automatically installs Oh My Zsh, a popular framework for managing Zsh configurations.
- **Plugin Management**: Clones essential plugins and themes to enhance Zsh, including syntax highlighting and auto-suggestions.
- **Zsh Configuration**: Adds custom aliases, functions, and environment variables to streamline your terminal usage.

### Step 6: Manual Steps 😓

While the scripts automate most of the setup, a few manual steps are necessary to complete the process:

- **System Preferences Adjustments**: Fine-tune settings like notification preferences and privacy options.
- **Application Configuration**: Manually configure applications that require user input during setup, such as email clients or IDEs.

Refer to the `Manual-steps.md` file for detailed instructions on completing these tasks.

### Step 7: Verify Your Setup ✅

After running the scripts and completing manual steps, verify that everything is set up correctly:

- **Test Applications**: Open installed applications to ensure they function as expected.
- **Check System Settings**: Go through system preferences to confirm that your customizations are applied.
- **Explore the Terminal**: Launch a terminal window and explore the new features of your *Zsh* environment.

## Conclusion 🏁

Congratulations! You've successfully automated your macOS setup, creating a customized environment tailored to your needs. By leveraging the power of scripting, you can now enjoy a seamless experience every time you set up a new machine or refresh your existing one.

To learn more go to the [Github repo](https://github.com/trolund/macos-setup-scripts). Happy computing! 👨‍💻
