---
title: Embedded engineering
summary: Flight software, avionics architecture and testing, and hardware bring up for SOAR's hybrid rockets, from the Ouroboros flight computer to a modular avionics system for Aegis and future rockets.
order: 1
tags: [C++, FreeRTOS, Protocol Buffers, Avionics architecture, PCB bring-up]
cover: ./cover-stack.png
coverAlt: Render of a stack of avionics circuit boards plugged into a backplane
coverFit: contain
coverOnPage: false  # card image only
stats:
  - { value: VP Software, label: Role }
  - { value: C++ | FreeRTOS, label: Flight software }
  - { value: '4', label: Years }
  - { value: '3', label: Rockets }
gallery:
  - image: ./avionics-architecture.png
    alt: Avionics system architecture diagram
    caption: Avionics system architecture
  - image: ./block-diagram.png
    alt: Avionics block diagram
    caption: Avionics block diagram
  - image: ./bench-testing.jpg
    alt: Shivam testing avionics hardware at a lab bench
    caption: Bench testing avionics hardware
  - image: ./board-stack.jpg
    alt: Stack of avionics circuit boards in a 3D-printed frame
    caption: Avionics board stack
  - image: ./pcb-red.png
    alt: Red avionics printed circuit board
    caption: Avionics PCB
  - image: ./pcb-blue.png
    alt: Blue avionics printed circuit board
    caption: Avionics PCB
---

## Overview

On SOAR's avionics team I worked on the software that flies the rocket and the hardware it runs on. That meant writing flight software, defining how the avionics fit together, and testing it all on the bench and on the pad.

## Flight software

- Worked on a real-time embedded operating system in **C++ and FreeRTOS**.
- For **Ouroboros**: software timers, state transitions, failure callbacks, and **Protocol Buffers** serialisation over UART.
- For the **Aegis flight control board**: OS-level messaging, sensor drivers and integration of safety-critical systems.

## Avionics architecture

- Led the integration and testing of the electrical and embedded avionics for **Ouroboros**.
- Defined the high-level architecture of a new **modular avionics system** for Aegis and Athena, covering both onboard and ground avionics.

## Hardware and testing

- Assembled and debugged PCBs from Altium designs, using reflow soldering, oscilloscopes, logic analysers, multimeters and bench supplies.
- Tested the main engine valve and onboard sensors: pressure transducers, thermocouples and infrared sensors.
