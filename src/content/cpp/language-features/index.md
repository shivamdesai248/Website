---
title: Classes and templates
description: The language features that cost nothing at runtime, the ones that cost a little, and how to use classes and templates to model hardware safely.
order: 4
tags: [Classes, Templates, constexpr]
---

> [!NOTE]
> Notes in progress. This page shows the layout; the content will grow.

## Classes

A class with non-virtual member functions is a struct plus functions that take a hidden `this` pointer. There is no runtime cost over the equivalent C.

**RAII** (resource acquisition is initialisation) is the most useful idea here: a constructor takes a resource and the destructor gives it back, so it can't be forgotten.

```cpp title="critical_section.hpp"
class CriticalSection {
public:
    CriticalSection()  { __disable_irq(); }
    ~CriticalSection() { __enable_irq(); }
};

void push(Queue& q, std::uint8_t byte) {
    CriticalSection lock;   // interrupts off
    q.push(byte);
}                           // interrupts back on, on every path out
```

## Virtual functions

Virtual functions do have a cost: each object gains a pointer to a vtable, and each call goes through an indirect branch that the compiler usually can't inline. That is often fine, but on a hot path templates are the alternative.

## Templates

Templates move decisions to compile time. A driver can take its pin as a template parameter, so every access compiles down to a single register write:

```cpp title="pin.hpp"
template <char Port, int Number>
struct Pin {
    static_assert(Number >= 0 && Number < 16, "pin out of range");
    static void high();
    static void low();
};

using StatusLed = Pin<'A', 5>;
StatusLed::high();
```

## Other free features

| Feature | Use |
|---|---|
| `constexpr` / `consteval` | Compute lookup tables and register values at compile time |
| `enum class` | Scoped, strongly typed enums: no mixing up register fields |
| `static_assert` | Check sizes, alignment and configuration at build time |
| Namespaces | Organise code without prefixing every name |
| References | Non-null pointers with cleaner syntax |
