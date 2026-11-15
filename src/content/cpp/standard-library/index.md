---
title: Standard library features
description: Which parts of the std library are safe on a microcontroller, from std::unique_ptr and std::array to std::string and std::function.
order: 6
tags: [STL, unique_ptr, std::string, Memory]
---

> [!NOTE]
> Notes in progress. This page shows the layout; the content will grow.

## The rule

For every feature, ask three questions: **does it allocate, can it throw, and how much code does it pull in?**

## std::unique_ptr

With the default deleter, `std::unique_ptr` is the same size as a raw pointer and compiles to the same code. It adds ownership rules for free. The catch is where the memory comes from: `std::make_unique` calls `new`, which uses the heap.

```cpp title="owner.cpp"
alignas(Driver) static std::byte storage[sizeof(Driver)];   // no heap

struct DestroyOnly {   // run the destructor, never call delete
    void operator()(Driver* d) const noexcept { d->~Driver(); }
};

std::unique_ptr<Driver, DestroyOnly> make_driver() {
    return std::unique_ptr<Driver, DestroyOnly>(new (storage) Driver{});
}
```

## std::string

`std::string` owns a heap buffer and grows it as needed. Short strings may fit in the small-string buffer inside the object, but its size depends on the library implementation, so you can't count on it. For fixed text use `std::string_view`, or a fixed-capacity string class.

## At a glance

| Feature | Allocates? | Verdict |
|---|---|---|
| `std::array` | No | Use freely |
| `std::span` (C++20) | No | Use freely: pointer and length in one |
| `std::string_view` | No | Use freely for read-only text |
| `std::optional`, `std::variant` | No | Use; watch `std::variant`'s size |
| `std::unique_ptr` | Only through `new` | Use, with care about where memory comes from |
| `std::function` | Can, for large captures | Prefer templates or function pointers |
| `std::vector`, `std::string`, `std::map` | Yes | Avoid, or give them a fixed allocator |
| `iostream` | Yes, and large | Avoid; use `printf`-style logging |

> [!WARNING]
> With `-fno-exceptions`, a library call that would normally throw (such as `std::vector::at` out of range) calls `std::abort()` instead. Check bounds yourself.
