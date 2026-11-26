---
title: ARM GCC
description: The arm-none-eabi toolchain, what its name means, and the compiler flags that matter for Cortex-M firmware.
order: 1
tags: [Toolchain, GCC, Cortex-M]
# Also list this topic on the Blog page (needs a date). blogCover is the card image there.
# blog: true
# date: 2026-11-25
# blogCover: ./cover.jpg
# blogCoverAlt: Cutaway render of the AstroPulse Hall effect thruster
---

> [!NOTE]
> Notes in progress. This page shows the layout; the content will grow.

## The toolchain

Most Cortex-M firmware is built with the **Arm GNU Toolchain**: GCC, binutils (assembler, linker, `objcopy`, `size`), GDB and the newlib C library, all targeting bare-metal Arm. Every tool shares the prefix `arm-none-eabi-`.

## Reading the name

| Part | Meaning |
|---|---|
| `arm` | Target architecture |
| `none` | No operating system: bare metal |
| `eabi` | The Embedded Application Binary Interface, which fixes calling conventions and data layout so objects from different compilers link together |

## Compiling for a Cortex-M4

```bash title="build.sh"
arm-none-eabi-g++ -mcpu=cortex-m4 -mthumb -mfpu=fpv4-sp-d16 -mfloat-abi=hard \
  -Os -ffunction-sections -fdata-sections \
  -fno-exceptions -fno-rtti -fno-threadsafe-statics \
  -c main.cpp -o main.o
```

## Flags that matter

| Flag | Why |
|---|---|
| `-mcpu`, `-mthumb` | Generate Thumb-2 code for the exact core |
| `-mfpu`, `-mfloat-abi=hard` | Use the hardware FPU and pass floats in FPU registers |
| `-Os` / `-O2` | Optimise for size or speed; `-O0` code is far larger and slower |
| `-ffunction-sections -fdata-sections` | Put each function and object in its own section… |
| `-Wl,--gc-sections` | …so the linker can throw away anything unused |
| `-fno-exceptions -fno-rtti` | Drop exception tables and type information (see [Exceptions](/cpp/exceptions)) |
| `--specs=nano.specs` | Link newlib-nano, a much smaller C library |

## Checking the result

```bash
arm-none-eabi-size firmware.elf
#    text    data     bss     dec     hex filename
#   12844     120    2208   15172    3b44 firmware.elf
```

`text` is code and constants in flash, `data` is initialised variables (stored in flash, copied to RAM at startup) and `bss` is zero-initialised RAM.
