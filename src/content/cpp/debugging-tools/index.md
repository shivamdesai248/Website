---
title: Embedded tools
description: Compiler Explorer for seeing what the compiler really generates, plus GDB, debug probes and the Cortex-Debug extension for stepping through code on real hardware.
order: 3
tags: [Compiler Explorer, GDB, Cortex-Debug, OpenOCD, SWD]
---

> [!NOTE]
> Notes in progress. This page shows the layout; the content will grow.

## Compiler Explorer (Godbolt)

[Compiler Explorer](https://godbolt.org), usually just called Godbolt after its creator Matt Godbolt, compiles code in the browser and shows the generated assembly next to the source, with each line colour-matched to the instructions it produced. It's the quickest way to settle "does this abstraction cost anything?" without building a whole project.

For embedded work:

1. Pick an **ARM GCC (none)** compiler, the bare-metal `arm-none-eabi` build.
2. Add the same flags as the real build, e.g. `-O2 -mcpu=cortex-m4 -mthumb -fno-exceptions -fno-rtti`.
3. Open a second compiler pane to compare two versions, such as C against C++ or `-Os` against `-O2`.

```cpp title="Try it on godbolt.org"
#include <array>
#include <cstdint>

std::uint32_t sum(const std::array<std::uint32_t, 4>& a) {
    std::uint32_t total = 0;
    for (auto v : a) total += v;   // compare the -O0 and -O2 output
    return total;
}
```

> [!TIP]
> Every editor state has a short share link. Paste it into a code review or a note to show exactly what you're seeing.

## How the pieces connect

Once code runs on a board, debugging it is a chain:

1. **Editor:** VS Code with the Cortex-Debug extension, which drives…
2. **GDB:** `arm-none-eabi-gdb` (or `gdb-multiarch`), which talks over TCP to…
3. **A GDB server:** OpenOCD, the SEGGER J-Link GDB server or pyOCD, which drives…
4. **A debug probe:** ST-LINK, J-Link or CMSIS-DAP, connected over **SWD** to the chip's debug port.

## Cortex-Debug setup

```json title=".vscode/launch.json"
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug (OpenOCD)",
      "type": "cortex-debug",
      "request": "launch",
      "servertype": "openocd",
      "executable": "build/firmware.elf",
      "configFiles": ["interface/stlink.cfg", "target/stm32f4x.cfg"],
      "svdFile": "STM32F407.svd",
      "runToEntryPoint": "main"
    }
  ]
}
```

The **SVD file** describes every peripheral register on the chip, so Cortex-Debug can show them by name instead of as raw addresses.

## GDB commands I use most

| Command | What it does |
|---|---|
| `break file.cpp:42` | Stop at a line |
| `continue` / `next` / `step` | Run, step over, step into |
| `info registers` | Core registers, including `pc`, `sp`, `lr` |
| `x/8wx 0x20000000` | Dump eight words of memory |
| `print/x variable` | Print a variable in hex |
| `monitor reset halt` | Reset the chip through the GDB server |
| `bt` | Backtrace, essential after a HardFault |

> [!TIP]
> When a HardFault hits, check the fault status registers (`CFSR`, `HFSR`) and the stacked `pc` before anything else. They usually point straight at the faulting instruction.
