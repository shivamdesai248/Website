---
# ─────────────────────────────────────────────────────────────────────────────
# EXAMPLE DESIGN ITEM: every option, explained. It never shows on the site
# (draft: true at the bottom). Copy this file, rename it (e.g. my-render.md),
# delete the options you don't need, and set draft to false.
# Lines starting with # are comments and are ignored.
# ─────────────────────────────────────────────────────────────────────────────

# REQUIRED ────────────────────────────────────────────────────────────────────

# Name shown under the tile.
title: Example render

# One of: Render, Poster, Presentation, Diagram, Livery
# Shown in the small label above the title ("RENDER · BLENDER").
kind: Render

# The picture. Path is relative to THIS file. Put images in a folder next to it,
# e.g. ./my-project/picture.png, or point at one already used elsewhere.
# For a video item (see `video` below) this is the still frame.
image: ./astropulse/astropulse-render-raw.png

# Description of the picture for screen readers and if it fails to load.
alt: Cutaway render of a Hall effect thruster on a black background

# Used for sorting when two items have no `order` (newest first). YYYY-MM-DD.
date: 2026-11-24

# OPTIONAL: PLACEMENT AND SIZE ────────────────────────────────────────────────

# Position on the page. 1 is first, then 2, 3... Items without a number come
# after all numbered ones, newest date first.
order: 99

# Fix the tile's shape as width/height. Leave out to use the picture's own shape.
#   1/1 = square, 4/3 = wider, 3/4 = taller, 16/9 = wide.
# Use it to shrink very tall or very wide pictures.
aspect: 4/3

# How the picture sits in the tile:
#   cover   = fills the tile edge to edge, may crop (default)
#   contain = whole picture visible with a little padding; best for renders
#             with transparent or plain backgrounds
fit: contain

# OPTIONAL: LABEL ─────────────────────────────────────────────────────────────

# Tools listed after the kind: "RENDER · BLENDER, FIGMA". Leave out for none.
tools: [Blender, Figma]

# OPTIONAL: LINKS ─────────────────────────────────────────────────────────────

# Adds "Related experience ↗". Must be an experience folder name:
#   astropulse, soar, garmin
experience: astropulse

# Adds "Read the write-up ↗". Must be a blog post folder name, e.g. aegis-livery.
post: aegis-livery

# What clicking the picture opens. Leave out to open the full-size picture.
# Use for a PDF or deck in public/, e.g. /documents/astropulse/report.pdf
href: /documents/astropulse/astropulse-final-design-report.pdf

# OPTIONAL: VIDEO ─────────────────────────────────────────────────────────────

# A short MP4 in public/videos/ that plays muted and looping in the tile,
# like a GIF. `image` above becomes its still frame. Remove the # to use it.
# video: /videos/aegis/aegis-sponsors.mp4

# VISIBILITY ──────────────────────────────────────────────────────────────────

# true = hidden from the site. Set to false (or delete the line) to publish.
draft: true
---
