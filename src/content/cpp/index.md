---
title: Embedded C++
intro: A space for me to gather and share what I know about using C++ for firmware development. The notes draw on textbooks, conference talks such as CppCon, and other sources across the web.
description: Notes on using modern C++ for firmware, from the toolchain and the build to the language and library features that are safe to use on a microcontroller.
---

<!-- Draft overview. Rewrite in your own words; the structure is the point for now. -->

## Where C came from

C was created by Dennis Ritchie at Bell Labs in the early 1970s, largely so Unix could be rewritten in something higher level than assembly. It stayed close to the machine on purpose. Pointers map directly onto addresses, structs map onto memory layouts, and the code a compiler produces is easy to predict from the source.

Those same properties made C the default language for bare-metal firmware. With no operating system underneath, the code talks to the hardware directly, usually by reading and writing memory-mapped peripheral registers:

```c title="gpio.c"
#define GPIOA_ODR (*(volatile uint32_t *)0x40020014u)

void led_on(void) {
    GPIOA_ODR |= (1u << 5);   // set pin PA5 high
}
```

Decades of vendor headers, HALs, RTOSes and application notes are written this way, and most embedded engineers learned on it.

## C with Classes

In 1979 Bjarne Stroustrup, also at Bell Labs, started work on "C with Classes". He wanted the program organisation he had used in Simula without giving up the speed and hardware access of C. The language was renamed C++ in 1983 and first released commercially in 1985.

It has been standardised by ISO since 1998, and a new version now arrives every three years:

| Standard | Highlights for embedded |
|---|---|
| C++98 | First ISO standard: templates, namespaces, the standard library |
| C++11 | `constexpr`, `enum class`, `static_assert`, move semantics, `std::unique_ptr`, `std::array` |
| C++14 | Relaxed `constexpr`, generic lambdas |
| C++17 | `if constexpr`, `std::optional`, `std::string_view`, inline variables |
| C++20 | Concepts, `std::span`, `consteval`, designated initialisers |
| C++23 | `std::expected`, `std::to_underlying` |

## Why embedded said no

For a long time C++ had a bad reputation in embedded. The usual complaints were that it was:

1. **Too big.** Templates instantiated many copies of the same code, and pulling in `iostream` could add tens of kilobytes of flash.
2. **Too slow.** Virtual functions, runtime type information and exceptions all seemed to add hidden work.
3. **Unpredictable.** `new`, exceptions and parts of the standard library allocate from the heap behind your back, which is a problem on a part with a few kilobytes of RAM and no tolerance for fragmentation.

Compilers of the 1990s often backed those complaints up. An industry group even defined **Embedded C++** (EC++), a cut-down subset that removed templates, exceptions, RTTI, namespaces and multiple inheritance.

## What changed

Modern compilers such as GCC and Clang changed the picture. Aggressive inlining, `constexpr` evaluation, dead-code removal and link-time optimisation mean that well-written C++ usually compiles to the same instructions as the equivalent C, and sometimes to fewer.

```cpp title="gpio.hpp"
template <std::uintptr_t Address>
struct Register {
    static void set(std::uint32_t mask) {
        *reinterpret_cast<volatile std::uint32_t*>(Address) |= mask;
    }
};

using GpioA_Odr = Register<0x4002'0014>;

inline void led_on() { GpioA_Odr::set(1u << 5); }
```

> [!TIP]
> Paste both versions into [Compiler Explorer](https://godbolt.org) with `arm-none-eabi-gcc -O2` and compare the output. The type-safe C++ version costs nothing extra.

## Zero-overhead abstraction

C++ is designed around the **zero-overhead principle**. In Stroustrup's words, "What you don't use, you don't pay for", and what you do use should be as efficient as anything you could reasonably write by hand.

Most of the overhead people blame on C++ doesn't come from the language. It comes from **standard library features**: `std::string` and `std::vector` allocate on the heap, `std::function` can allocate to store what it wraps, and `iostream` drags in locales and formatting machinery. Classes, templates, namespaces, references, `constexpr` and `enum class` cost nothing at runtime.

> [!IMPORTANT]
> Before using a standard library feature in firmware, understand what it does underneath: whether it allocates, whether it can throw, and how much code it pulls in. That is the thread running through every topic below.
