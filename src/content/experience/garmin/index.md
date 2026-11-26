---
title: Embedded software at Garmin
org: Garmin
role: Embedded Software Engineer 1 · previously Software Engineering Intern
period: May 2024 – Present
summary: Firmware for wearables and sensors, from heart rate monitors and test frameworks as an intern to low level board bring up on the Sensor Core platform team.
order: 2
tags: [C++, Embedded protocols, Low level hardware bring-up, SPI / I²C / UART, GoogleTest]
cover: ./garmin-devices.jpg
coverOnPage: false  # source photos are small; card only
coverAlt: A Garmin HRM 600 heart-rate strap and the optical sensor on the back of a fēnix 7 Pro watch
# Product shots side by side at the top of the page
heroStrip:
  - image: ./hero-pedals.jpg
    alt: Garmin Rally XC 210 dual-sensing power meter pedals
  - image: ./hero-hrm600.jpg
    alt: Garmin HRM 600 heart rate monitor strap
  - image: ./hero-venu4.jpg
    alt: The back of a Garmin Venu 4 watch with its optical heart rate sensor lit green
stats:
  - { value: C++, label: Primary language }
  - { value: Sensor Core, label: Current team }
  - { value: '3', label: Teams worked with }
---

## Embedded Software Engineer 1 · Jul 2026 – Present

I joined the **Sensor Core** platform team full time. Sensor Core is a software platform that brings together low-level modules, the operating system and app features, so that product teams can integrate them without starting from scratch.

- **Board bring-up.** Low-level bring-up of a new product board: schematic review, and integration of communication protocol drivers (SPI, I²C, UART).
- **Firmware.** Primary development in C++ on the shared platform.
- **AI-assisted workflows.** Researching and building AI-integrated engineering workflows, including agents and skills that automate repetitive parts of the job.

## Software Engineering Intern · May 2024 – Aug 2025

### MultiSport Sensors

- Developed and debugged embedded C++ drivers for the **HRM 200** and **HRM 600** heart-rate monitors (BLE, buttons, LEDs), including API redesigns for usability and power savings.
- Brought automated testing into the HRM codebase with unit and integration tests in **GoogleTest**.
- Worked with software, electrical and technical services teams to debug legacy code and integrate speed and cadence algorithms.

### Optical Platform Technology

- Converted a legacy C codebase to a C++ architecture, and designed an extensible **C++ biosensor driver framework** for next-generation biosensors.
- Worked on next-generation biosensor features and PPG drivers, plus mechanical end-of-life testing and data-collection watch interfaces.
- Built **FARM** (Fake AFE Register Map), a mocking framework that enabled end-to-end testing of analog front-end driver code without physical hardware.
- Implemented and debugged a new C++ **manufacturing test framework**, working with manufacturing teams to resolve production sensor noise and test failures.
