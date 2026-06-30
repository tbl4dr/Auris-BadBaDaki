# Auris-BadBaDaki
[Auris](https://github.com/nikhilprasanth/Auris)-BadBaDaki is Offline audiobook reader for EPUB, PDF, and TXT with local OmniVoice TTS, character-aware voices, per-book narrator control, and synced text highlighting On [Pinokio](https://github.com/pinokiocomputer/pinokio)

## Installation
One-click (Pinokio) installer:

Get started instantly with [Pinokio App](https://pinokio.computer/)

1. Open Pinokio
2. Click **Explorer** and Search this:
   ```
   Auris-BadBaDaki
   ```
3. Then Click **Install** to set up 


## Model setup

The OmniVoice weights are not bundled with this repository.

You can either:

- Download them from the Settings page using the built-in Hugging Face downloader.
- Point Settings at an existing local OmniVoice model directory [app/model_backup/OmniVoice].

The model directory must contain the files OmniVoice expects, such as `config.json` and model weights.

## Usage

1. Import a book from the library page.
2. Open the book and start playback from any sentence.
3. Open Voice Studio from the reader sidebar.
4. Adjust character voices or the narrator voice, preview them, then save.
5. Export audio or subtitles if needed.