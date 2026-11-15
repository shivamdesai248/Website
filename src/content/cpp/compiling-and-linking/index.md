---
title: Compiling and linking
description: How source files become a flashable image, from preprocessing to the linker script and the startup code that runs before main.
order: 2
tags: [Build, Linker, Startup]
---

> [!NOTE]
> Notes in progress. This page shows the layout; the content will grow.

## The four stages

1. **Preprocess.** `#include` and `#define` are expanded into one translation unit per source file.
2. **Compile.** Each translation unit becomes assembly for the target core.
3. **Assemble.** The assembly becomes an object file (`.o`) with machine code split into sections.
4. **Link.** The linker combines every object file and library, resolves symbols, and places each section at a real address.

## Sections

| Section | Contents | Lives in |
|---|---|---|
| `.text` | Code | Flash |
| `.rodata` | Constants, string literals | Flash |
| `.data` | Initialised globals | Flash, copied to RAM at startup |
| `.bss` | Zero-initialised globals | RAM, cleared at startup |

## The linker script

On a desktop the operating system decides where a program goes. On a microcontroller the linker script does:

```ld title="stm32f4.ld"
MEMORY
{
  FLASH (rx)  : ORIGIN = 0x08000000, LENGTH = 512K
  RAM   (rwx) : ORIGIN = 0x20000000, LENGTH = 128K
}

SECTIONS
{
  .text : { KEEP(*(.isr_vector)) *(.text*) *(.rodata*) } > FLASH
  .data : { *(.data*) } > RAM AT > FLASH
  .bss  : { *(.bss*) *(COMMON) } > RAM
}
```

## Before main

The reset handler runs first. It:

1. Copies `.data` from flash into RAM.
2. Zeroes `.bss`.
3. Runs static constructors for global C++ objects (`__libc_init_array`).
4. Calls `main()`.

> [!WARNING]
> Global objects with constructors run before `main`, before clocks and peripherals are set up. Keep them trivial, or construct hardware drivers explicitly inside `main`.
