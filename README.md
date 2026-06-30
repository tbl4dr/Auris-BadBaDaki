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
- Point Settings [TOP,RIGHT] at an existing local OmniVoice model directory [app/model_backup/OmniVoice].

The model directory must contain the files OmniVoice expects, such as `config.json` and model weights.

## Usage

1. Import a book from the library page.
2. Open the book and start playback from any sentence.
3. Open Voice Studio from the reader sidebar.
4. Adjust character voices or the narrator voice, preview them, then save.
5. Export audio or subtitles if needed.


## Voice design caveats

OmniVoice does not produce clean output for every voice-design combination. The upstream docs note that some attribute mixes are unreliable, especially without reference audio.

The most fragile cases are youth voices with extreme pitch settings. For example, combinations like `male, teenager, very high pitch, american accent` can degrade into squeaks, bursts, or static instead of intelligible speech.

Auris now tries to stabilize some known-bad combinations during preview and playback by relaxing them to a nearby voice design, but this is still a model limitation, not something the UI can fully solve.

Best results:

- Prefer `young adult` over `teenager` when you do not have reference audio.
- Avoid `very high pitch` and `very low pitch` on `child` and `teenager` voices.
- Upload a clean WAV reference when you need a specific youthful voice.
- Preview before saving.

Reference: `https://github.com/k2-fsa/OmniVoice/blob/master/docs/voice-design.md`
