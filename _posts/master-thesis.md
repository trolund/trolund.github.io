---
title: 'A Compiler for Generating WebAssembly (WAT) from the Hygge programming language'
excerpt: 'This article gives a short overview of my master thesis. The primary goal of the thesis was to design and implement a compiler capable of generating valid WebAssembly (Wasm) code from the source language Hygge.'
coverImage: '/assets/blog/front1.jpeg'
date: '2024-02-25T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/front1.jpeg'
tags: ["post", "project", "DTU"]
technologies: ["F#", "Compilers"]
language: "en"
---

I recently completed my master thesis. This article gives a short overview of the thesis.

The primary goal of the thesis was to design and implement a compiler capable of generating valid WebAssembly (Wasm) code from the source language Hygge. Hygge is a statically and strongly typed language that offers a straightforward typing system with subtyping. The Hygge programming language was created by Alceste Scalas at DTU.

## Comprehensive Language Features

The implemented compiler supports a wide range of language features, making it versatile and powerful. These features include:

- Conditional statements
- Pattern matching
- Recursive functions
- Anonymous functions
- Closures (Supports shared mutable variables)
- Various types of loops

Additionally, the compiler allows for the use of advanced data types such as strings, arrays, and structs, on top of the primitive types like integers, floating points, and booleans.

### An example of a Hygge program

Below can a Hygge program that reads an integer input from the console and then computes the nth term of the Fibonacci sequence by using the function *fibRec*. The result is printed in the console.

```c
let n: int = readInt(); // read the input
// define a recursive function to calculate the nth term of the Fibonacci sequence
fun fibRec(n: int): int = { 
    if (n <= 1) then {
        n
    } 
    else {
        fibRec(n - 1) + fibRec(n - 2)
    }
};
// print the result
println("The term of the Fibonacci sequence is:");
println(fibRec(n))
```

## Innovative Memory Management

A significant part of the thesis was dedicated to exploring multiple ways of handling memory, resulting in several memory modes:

1. **Embedded Memory Management:** This mode embeds memory management code directly in the executable.
2. **External Runtime Memory Management:** This mode implements memory management logic in an external runtime.
3. **WasmGC Extension:** This mode uses the WasmGC extension to enable garbage collection in modern WebAssembly VM implementations.

## Flexible System Interfaces

The compiler also introduces two system interfaces to facilitate I/O operations between the running program and the host system:

1. **WASI (WebAssembly System Interface):** Enables universally executable binaries.
2. **Custom Interface:** A simpler, custom-built interface.

## Diverse WebAssembly Writing Styles

The compiler supports two different writing styles of WebAssembly:

- **Simple Linear Style:** A straightforward, linear approach to writing WebAssembly.
- **Nested Style:** A more complex, nested approach.

## Optimization Techniques for Efficient Executables

To ensure the generated executables are small and efficient, the thesis investigated and implemented various optimization techniques:

1. **Local Variable Read-and-Write Optimization**
2. **Dead-Code Elimination**
3. **Constant Folding**
4. **Branch-Level Tree Shaking**

These techniques were carefully examined to determine their effectiveness in improving the performance and size of the executables.

## Conclusion

The HyggeWasm compiler represents a significant advancement in the field of WebAssembly code generation. By supporting a comprehensive set of language features, offering innovative memory management modes, providing flexible system interfaces, and implementing effective optimization techniques, HyggeWasm paves the way for more efficient and versatile WebAssembly applications.

### Links

The entire thesis can be found [here.](/assets/docs/thesis.pdf) The source code of the *HyggeWasm* compiler can be found [here.](https://github.com/trolund/hyggeWasm)

The *Learning and Development tool* can be used to debug Wasm programs and implement the HyggeWasm runtime. The source code can be found [here.](https://github.com/trolund/Wasm-Debugger) and the tool it self can be found [here.](https://trolund.github.io/Wasm-Debugger)
