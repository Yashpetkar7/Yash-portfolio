INTRO VIDEO — intro.mp4

The site plays /videos/intro.mp4 fullscreen as the opening sequence, then
transitions into the portfolio. If the file is missing or slow to load, the
site automatically falls back to the name/line splash — nothing breaks.

The current intro.mp4 is a generated 4.8s motion-graphics title card (name
scramble-decode, profile photo scanline reveal, site branding). To use real
footage of yourself instead, just overwrite this file — no code changes.

Recommendations for the file:
- Format: MP4 (H.264 + AAC) — safest for all browsers
- Length: 3–6 seconds (it plays once, and visitors can skip it)
- Resolution: 1920x1080 (landscape, it is displayed full-bleed)
- Size: under ~8 MB so it starts instantly (export at a lower bitrate or
  use HandBrake / ffmpeg:  ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -an intro.mp4)
- Audio is muted by browsers during autoplay, so design it to work silent
