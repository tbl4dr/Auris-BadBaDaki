const fs = require('fs')
const path = require('path')

module.exports = {
  version: "0.4",
  title: "Auris BadBaDaki",
  "description": "Auris-BadBaDaki is Offline audiobook reader for EPUB, PDF, and TXT with local OmniVoice TTS, character-aware voices, per-book narrator control, and synced text highlighting.\nEverything runs locally after setup. No API keys. No hosted TTS dependency.",
  icon: "icon.png",
  menu: async (kernel, info) => {
    // Check running states
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      reset: info.running("reset.js"),
      update: info.running("update.js")
    }

    // Check file existence states
    let installed = info.exists("app/env")

    // Handle running states first
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js"
      }]
    }

    if (running.start) {
      let local = info.local("start.js")
      if (local && local.url) {
        return [{
          default: true,
          icon: "fa-solid fa-rocket",
          text: "Open Web UI",
          href: local.url,
        }, {
          icon: "fa-solid fa-terminal",
          text: "Terminal",
          href: "start.js",
        }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Starting",
          href: "start.js",
        }]
      }
    }

    if (running.reset) {
      return [{
        default: true,
        icon: "fa-solid fa-rotate-left",
        text: "Resetting",
        href: "reset.js"
      }]
    }

    if (running.update) {
      return [{
        default: true,
        icon: "fa-solid fa-arrows-rotate",
        text: "Updating",
        href: "update.js"
      }]
    }

    // STATE: NOT_INSTALLED - auto-run install
    if (!installed) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }]
    }

    // STATE: INSTALLED
    return [{
      default: true,
      icon: "fa-solid fa-power-off",
      text: "Start",
      href: "start.js"
    }, {
      icon: "fa-solid fa-folder-open",
      text: "models",
      href: "app/model_backup"
    }, {
      icon: "fa-solid fa-folder-open",
      text: "uploads",
      href: "app/uploads"
    }, {
      icon: "fa-solid fa-folder-open",
      text: "audio_cache",
      href: "app/audio_cache"
    }, {
      icon: "fa-solid fa-arrows-rotate",
      text: "Update",
      href: "update.js"
    }, {
      icon: "fa-solid fa-plug",
      text: "Reinstall",
      href: "install.js"
    }, {
      icon: "fa-solid fa-rotate-left",
      text: "Reset",
      href: "reset.js"
    }]
  }
}
