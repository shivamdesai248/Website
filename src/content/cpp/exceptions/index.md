---
title: Exceptions in embedded
description: How C++ exceptions work underneath, why most firmware turns them off, and the error-handling patterns that replace them.
order: 5
tags: [Exceptions, Error handling]
---

> [!NOTE]
> Notes in progress. This page shows the layout; the content will grow.

## How they work

GCC uses **table-based** exceptions. The normal path runs at full speed, and the compiler emits unwind tables (`.ARM.exidx` and `.ARM.extab` on Arm) describing how to clean up each stack frame. When something throws, the runtime allocates the exception object, walks those tables to find a handler, and runs destructors on the way.

## Why firmware turns them off

1. **Code size.** The unwind tables and the unwinder itself add flash, often tens of kilobytes on a small part.
2. **Timing.** The cost of a throw depends on how deep the stack is and what has to be destroyed, so it isn't deterministic.
3. **Memory.** The exception object is usually allocated on the heap (`__cxa_allocate_exception`).
4. **Hidden control flow.** Any call might leave the function early, which makes worst-case paths hard to reason about.

Most embedded projects build with `-fno-exceptions`. Then `throw` is a compile error, and library code that would have thrown calls `std::abort()` instead.

## What to use instead

```cpp title="sensor.hpp"
enum class SensorError { Timeout, BadCrc, NotReady };

std::expected<float, SensorError> read_temperature();   // C++23

if (auto t = read_temperature()) {
    log(*t);
} else if (t.error() == SensorError::Timeout) {
    retry();
}
```

| Option | Notes |
|---|---|
| Error codes / `enum class` | Simple and explicit; easy to ignore by mistake |
| `[[nodiscard]]` | Makes ignoring a returned error a compiler warning |
| `std::optional<T>` (C++17) | "Value or nothing", no reason given |
| `std::expected<T, E>` (C++23) | "Value or error", the closest match to exceptions without the cost |

> [!TIP]
> Herb Sutter's proposal P0709, "Zero-overhead deterministic exceptions", is worth reading for where this might go next.
