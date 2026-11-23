---
title: "Aegis: from Figma to the launch rail"
description: "A last-minute livery for SOAR's Aegis rocket: a mythology-inspired wreath drawn in Figma, rough prototypes in Blender, and decals going on at competition."
date: 2026-11-23
tags: [design, Figma, Blender, SOAR]
experience: soar
cover: ./cover.jpg
coverAlt: "Aegis lying on the launch rail in the desert, with team members standing around it and flags behind"
documents:
  - title: Aegis team poster
    file: documents/aegis/aegis-team-707-poster.pdf
    description: The Team 707 poster session board covering the rocket, its motor, avionics, air brakes, payload and ground systems.
draft: false
---

Aegis was SOAR's Team 707 hybrid rocket, built as a test bed for a future 100,000 ft hybrid and aimed at 10,000 ft. Its livery was a last-minute assignment, but it mattered a lot to me that we showed up with a good-looking rocket. This is how a quick design went from a vector in Figma, through some rough prototypes in Blender, to decals going on at competition.

## The idea: a wreath

The design was inspired by the wreaths of classical mythology: gold leaves winding up a white body, around the **AEGIS** wordmark and the team motto *Principia Vincunt Omnia* (roughly "principles conquer all"). Around that sit the Alberta coat of arms, the SOAR and University of Calgary marks, a gold maple-leaf nose cone and a column of sponsor logos.

My original plan was more ambitious. I wanted to lay the wreath pattern out and paint over it, so the composite body tubes would show through the design. With last-minute constraints, the paint shop only had time for one solid base coat, so the wreath went on as decals over white instead. Something to keep in mind for future designs.

## 1. Figma: the rocket, unrolled

A decal for a tube is a flat rectangle: one side is the tube's circumference, the other is the length of that section. So in Figma every section of the airframe became its own panel, sized to the real part: fin can, lower plumbing, pressure vessel, air brakes, avionics bay, recovery and nose cone.

![The eight Aegis decal panels laid end to end on a grey sheet, from the fin can on the left to the nose cone on the right](./decal-panels.png "The final panels end to end, roughly fin can (left) to nose cone (right)")

The wreath itself is simple. It's one vector, with some careful shading in Figma to give the gold a soft glow. I then duplicated that same design across the panels and edited each copy by hand, so the vines blend from one section into the next and the whole thing has a bit more character than a repeated pattern.

![Three columns of decal panels in Figma: an early layout, a colour-blocked map of the sections, and the final panels](./figma-panels.png "An early layout, a colour-blocked map of the sections, and the final panels {width=55%}")

The Figma file became a running board for everything visual on Aegis: livery versions, rocket renders and several rounds of the team poster.

![A zoomed-out Figma board with livery strips, renders and many versions of the Aegis poster](./figma-board.png "The working Figma board: livery versions on the left, poster iterations on the right")

## 2. Blender: rough prototypes

The Blender prototypes were rough, and harder than they should have been. The rocket model came over from SolidWorks as a STEP file, and the mesh it generated broke every surface into long, thin triangles. Mapping a flat decal onto a tube means laying the tube's surface out flat in Blender's UV editor, and with that mesh the "unrolled" surface was a mess of slivers that didn't line up with the artwork.

![Blender's UV editor beside the 3D view: the avionics bay decal on the left with the tube's surface laid over it as dozens of thin orange slivers, and the rocket on the right with that section highlighted](./blender-uv-avionics.png "UV editing the avionics bay: the STEP mesh unrolls into thin triangular slivers")

![Blender's UV editor showing the recovery section's triangulated mesh laid over the AEGIS decal, with the section highlighted near the nose of the rocket](./blender-uv-recovery.png "The recovery section: the same triangulated mesh over the AEGIS decal")

In comparison, SolidWorks, which I used to render with, can wrap a picture straight onto a surface like a tube. In Blender each section had to be coaxed into place by hand.

Even rough, the renders were worth it. They showed the plan and the reality side by side: the raw composite look I'd hoped to keep under the wreath, the white base coat we actually got, and the decals on top.

![Four renders of Aegis stacked from top to bottom: a dark composite and brass look, a bare white rocket with a polished pressure vessel, a plain white base coat, and the first full set of decals](./render-iterations.png "Top to bottom: the raw composite look, raw pressure vessel, white base coat, first decals")

The first full set of decals, from both sides:

![Render of Aegis from the front with the gold vines, sponsor logos, AEGIS wordmark, Alberta crest, SOAR logo and maple-leaf nose cone](./render-final-front.png "Front")

![Render of Aegis from the back, showing the vines continuing around the body and the University of Calgary crest](./render-final-back.png "Back")

![Close-up render of the forward section: the end of the AEGIS wordmark, a gold band, the Alberta crest, the SOAR logo and the maple-leaf nose cone](./render-nose-detail.png "The forward section up close")

## 3. Real life

### Applying the decals

From here my friend and team captain, Andrew, took over the decals. With his work and the whole team's help, they went on while we were at competition, with the rocket laid across a hotel desk and every flat surface covered in tools.

![Aegis lying across a hotel desk with the AEGIS wordmark and University of Calgary decals applied, tools and tape around it](./decals-on-desk.jpg "Decals going on at competition")

![Close-up of the nose cone decals: University of Calgary, 707 and the SOAR logo](./decals-nose.jpg "Nose cone and recovery section") ![Close-up of the AEGIS wordmark and motto with gold vines on the white body tube](./decals-wordmark.jpg "The wordmark and motto")

### On the field

![The team carrying Aegis on their shoulders across a parking lot](/videos/aegis/aegis-carry.mp4#loop "Carrying Aegis out")

![Aegis's nose cone and SOAR logo against a cloudy sky](./nose-against-sky.jpg "Nose cone against the sky") ![Team members standing around Aegis, held upright on the grass under a cloudy sky](./team-with-aegis.jpg "The team with Aegis")

![A slow pan up the sponsor section of Aegis, held by two team members](/videos/aegis/aegis-sponsors.mp4#loop "The sponsor section up close")

### On the rail

![Aegis lying horizontally on the launch rail in the desert while team members prepare it](./on-the-rail.jpg "Loading Aegis onto the rail")

![Aegis standing vertically on the launch tower against a deep blue sky, with Canadian and Alberta flags](./vertical-on-tower.jpg "Vertical on the tower") ![Aegis standing on the rail with the tower's insulated panels swung open, showing the whole rocket from fins to nose cone](./rail-insulation-open.jpg "Insulation open, the whole rocket on the rail")

## The poster

The same visual language carried over to the team's poster: dark background, red accents from the SOAR mark, and a cutaway of the full rocket labelled by subsystem, with a panel for each major system underneath.

![The Aegis Team 707 poster: a cutaway of the rocket labelled by subsystem, with panels on the joints, filament-wound tubes, air brakes, payload, motor, ground systems and avionics](./poster.jpg "The Team 707 poster")

<!-- Idea for a closing section: what you'd do differently next time, e.g. planning the paint around the composite reveal earlier, or exporting the model with clean UVs instead of a triangulated STEP mesh. -->
