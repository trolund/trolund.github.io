---
title: 'Design of high-level programming language'
excerpt: 'This project consist of designing a high-level programming language and implement a compiler implemented in F#.'
coverImage: '/assets/blog/compiler/basic-compiler-phases.png'
date: '2023-06-06T05:35:07.322Z'
author:
  name: Troels Lund
  picture: '/assets/blog/authors/troels.png'
ogImage:
  url: '/assets/blog/compiler/basic-compiler-phases.png'
tags: ["post", "project"]
technologies: ["Compiler", "RISC-V", "F#", "Assembly language"]
language: "en"
---

This project consist of designing a high-level programming language called 'hygge' and implement a compiler (hyggec) implemented in F#. Hyggec compile hygge-prgrams to RISC-V Assembly. This project was part of the course 02247 Compiler Construction at DTU in the Spring of 2023. The course website can be found [here](https://courses.compute.dtu.dk/02247/f23/overview.html).

A skeleton of a compiler was supplied at the start of the course, the objective of the project was then to enhance the Hygge programming language by incorporating new structures and features, that would facilitate the development of intricate programs. To accomplish this, the team expanded upon the existing hyggec compiler.

The project was done in a group of three. In this Blog post i will write about some of the features i implemented as part of the weekly assignments. Code to handel both lexing, parsing, typechecking, code generation and optimisation was implemented, in this blog post i will focus on the code generation phase.

## Arrays

This section describes an extension of Hygge, that will allow Hygge programmers to use arrays. This includes an array constructor that will allocate the specified memory at run-time and fill the memory space allocated with an initialization value inputted by the programmer. Furthermore, operators for receiving the length of an array, reading from an index in the array as well as writing into a specific position have been added. 

<img src="/assets/blog/compiler/array.png"  width="60%" style="margin: auto;">

### Code Generation

We extend the function *doCodegen* in **RISCVCodegen.fs** by adding the following case to initialize the array. The code checks that the requested size is at least one, but this is not included in the code below, please see the source code. 

The main objective of this case is to allocate space for the array. It ends by leaving the memory address of the before mentioned *struct* in *target*.

Parts of the code could be rewritten to use already existing constructs of the compiler, but this was not done due to time constraints.

```fsharp
| Array(length, data) ->
        // 1) Code that check that length is bigger then 1 (see source code)
        // 2) Allocate space for the array struct on the heap
        let structAllocCode =
            (beforeSysCall [Reg.a0] [])
                .AddText([
                    (RV.LI(Reg.a0, 2 * 4), "Amount of memory to allocate for the array struct {data, length} (in bytes)")
                    (RV.LI(Reg.a7, 9), "RARS syscall: Sbrk")
                    (RV.ECALL, "")
                    (RV.MV(Reg.r(env.Target), Reg.a0), "Move syscall result (struct mem address) to target")
                ])
                ++ (afterSysCall [Reg.a0] [])

        // 3) Initialize the length field of the array struct
        let lengthCode = Asm(RV.MV(Reg.t6, Reg.r(env.Target)), "Move adrress to t6") ++ (doCodegen env length).AddText([
            RV.SW(Reg.r(env.Target), Imm12(4), Reg.t6), "Initialize array length field"
            RV.MV(Reg.t4, Reg.r(env.Target)), "Move length to t4"
        ])

        // 4) Allocate space for the array data on the heap
        let dataAllocCode =
            (beforeSysCall [Reg.a0] [])
                .AddText([
                    (RV.LI(Reg.a0, 4), "4 (bytes)") //  first load the size of the memory block we want to allocate into register a0, this is length * 4 (in bytes)
                    (RV.MUL(Reg.a0, Reg.a0, Reg.r(env.Target)), "Multiply length * 4 to get array size")
                    (RV.LI(Reg.a7, 9), "RARS syscall: Sbrk")
                    (RV.ECALL, "")
                    (RV.MV(Reg.r(env.Target + 2u), Reg.a0), "Move syscall result (array data mem address) to target+2")
                ])
                ++ (afterSysCall [Reg.a0] [])

        // 5) Store the array data pointer in the data field of the array struct
        let dataInitCode =
             Asm(RV.SW(Reg.r(env.Target + 2u), Imm12(0), Reg.t6), "Initialize array data field").AddText([
                RV.MV(Reg.t5, Reg.r(env.Target + 2u)), "Move array data address to t6"
             ])

        let beginLabel = Util.genSymbol "loop_begin"
        // 6) Store the array data in the allocated memory
        let codeGenData = 
            (doCodegen env data)
                .AddText([
                    RV.LI(Reg.a2, 4), "Load the size of each element in the array"
                    RV.LI(Reg.a3, 0), "Load the starting index"
                ])
                .AddText(RV.LABEL(beginLabel))
                .AddText([
                RV.MUL(Reg.r(env.Target + 2u), Reg.a2, Reg.a3), "Calculate the offset (index) from the base address"
                RV.ADD(Reg.r(env.Target + 3u), Reg.t5, Reg.r(env.Target + 2u)), "Calculate the address of the element"
                RV.SW(Reg.r(env.Target), Imm12(0), Reg.r(env.Target + 3u)), "Store the value in the element"
                RV.ADDI(Reg.a3, Reg.a3, Imm12(1)), "Increment the index"
                RV.BLT(Reg.a3, Reg.t4, beginLabel), "Loop if the index is less than the ending index"
                RV.MV(Reg.r(env.Target), Reg.t6), "Move array mem address to target register"
            ]).AddText(RV.COMMENT("Allocation done"))

        // Combine all the generated code
        checkSize ++ structAllocCode ++ lengthCode ++ dataAllocCode ++ dataInitCode ++ codeGenData
```

Below the code for accessing an element in an array can be seen. The target is evaluated to a memory address pointing to the *struct*, from this the data pointer and length are extracted.

```fsharp
| ArrayElement(target, index) ->
        /// Assembly code that computes the address of the array element at the
        /// given index. The address is computed by adding the index to the
        /// address of the first element of the array.
        let arrayAccessCode = (doCodegen env target).AddText([
                RV.LW(Reg.r(env.Target + 1u), Imm12(0), Reg.r(env.Target)), "Load array data pointer"
                RV.LW(Reg.r(env.Target + 4u), Imm12(4), Reg.r(env.Target)), "Copying array length to target register + 4"
            ])

        let indexCode = (doCodegen env index)

        // env.Target contains the index
        let checkLesThenLengthLabel = Util.genSymbol $"index_ok"
        let checkLesThenLength = Asm([
                    RV.BLT(Reg.r(env.Target), Reg.r(env.Target + 4u), checkLesThenLengthLabel), "Check if index less then length"
                    RV.LI(Reg.a7, 93), "RARS syscall: Exit2"
                    RV.LI(Reg.a0, assertExitCode), "Load exit code"
                    RV.ECALL, "Call exit"
                    RV.LABEL(checkLesThenLengthLabel), "Index is ok"
                ])

        // Check index >= 0
        let checkBiggerThenZeroLabel = Util.genSymbol $"index_ok"
        let checkBiggerThenZero = Asm([
                    RV.LI(Reg.a7, 0), "Set a7 to 0"
                    RV.BGE(Reg.r(env.Target), Reg.a7, checkBiggerThenZeroLabel), "Check if index >= 0"
                    RV.LI(Reg.a7, 93), "RARS syscall: Exit2"
                    RV.LI(Reg.a0, assertExitCode), "Load exit code"
                    RV.ECALL, "Call exit"
                    RV.LABEL(checkBiggerThenZeroLabel), "Index is ok"
                ])
        
        let readElment = Asm([
                (RV.LI(Reg.t3, 4), "Load the size of each element in the array")
                (RV.MUL(Reg.r(env.Target), Reg.r(env.Target), Reg.t3), "Calculate the offset (index) from the base address")
                // (RV.ADDI(Reg.r(env.Target), Reg.r(env.Target), Imm12(-4)), "Add the offset to the base address")
                (RV.ADD(Reg.r(env.Target), Reg.r(env.Target), Reg.r(env.Target + 1u)), "Compute array element address")
                (RV.LW(Reg.r(env.Target), Imm12(0), Reg.r(env.Target)), "Load array element")
            ])

        // Put everything together: compute array element address
        arrayAccessCode ++ indexCode ++ checkLesThenLength ++ checkBiggerThenZero ++ readElment
```

Then the input index is evaluated and checked that the index indeed is within the boundaries of the given array. Safeguards have been built into Hygge, so that at runtime it can determined if an index is out-of-bounds both when accessing an element or writing to a position in an array. Furthermore, it is ensured that all arrays will contain at least one element.

This is performed during runtime in order to enable the resolution of the array size dynamically, for example, through the utilization of **ReadInt** to allow the user to input the size in the console.

If the program encounters an error, because one of the before-mentioned rules are violated, a **Exit2** ($a7 = 93$) is performed with an exit code *42* to make sure that Hygge's test system can identify this as an error.

Below the code that allows $ArrayLength$ to function can be seen.

```fsharp
    | ArrayLength(target) ->
        /// Assembly code that computes the length of the given array. The
        /// length is stored in the first word of the array struct, so we
        /// simply load that word into the target register. 
        (doCodegen env target).AddText([
                (RV.LW(Reg.r(env.Target), Imm12(4), Reg.r(env.Target)), "Load array length")
            ])
```

Since the length is stored in the before mentioned *struct*, evaluating the length of an array is done simply doing code generation of the *target*, which results in the memory address of the *struct* and then we can just use that address with an offset of 4 to load the length into the *target* register. 

Furthermore a sub-case of **Assign** has been added to make sure that assigning values to an array is possible. This code is not included in the report, please see the source code. 

### Testing

A number of tests were added under the 'tests/' directory for the array \hyggec extension. A few examples of tests have been picked out and can be seen in the following section.
%
The test *030-array.hyg* contains the code given in the problem description. The only difference is that it does not take user input. The test is using all defined features of the array in one test.

The test *030-array-element-assign.hyg* can be seen below. This test is designed to test assigning values to positions in the array. It assigns new values to each position and asserts that the value has been updated correctly. The tests: *029-array-assign-element-out-of-lower-bound.hyg* and 
*029-array-assign-element-out-of-upper-bound.hyg* make sure that the logic that restricts the index value to be inside the boundaries of the array works correctly. 

```fsharp
let n: int = 5;
let arr: array {int} = array(n, 1);
arrayElem(arr, 0) <- arrayElem(arr, 0) + n;
arrayElem(arr, 1) <- arrayElem(arr, 1) + n + 1;
arrayElem(arr, 2) <- arrayElem(arr, 2) + n + 2;
arrayElem(arr, 3) <- arrayElem(arr, 3) + n + 3;
arrayElem(arr, 4) <- arrayElem(arr, 4) + n + 4;

assert(arrayElem(arr, 0) = 6);
assert(arrayElem(arr, 1) = 7);
assert(arrayElem(arr, 2) = 8);
assert(arrayElem(arr, 3) = 9);
assert(arrayElem(arr, 4) = 10);

arrayElem(arr, 1) <- arrayElem(arr, 4) + n + 5;

assert(arrayElem(arr, 1) = 20);

let sum: int = arrayElem(arr, 0) + arrayElem(arr, 1) + arrayElem(arr, 2) + arrayElem(arr, 3) + arrayElem(arr, 4);

assert(sum = 53)
```

In the test *027-array-simple-types.hyg* multiple arrays are allocated with different types. The *arr4* contains the function *f*, and the array essentially contains function references. This way it is possible to access and execute a stored function like shown in *line 14* of the test.

```fsharp
let arr: array {bool} = array(2 + 2, true);
let arr2: array {float} = array(2 + 2, 1.2f);

let s: string = "hygge";

let arr3: array {string} = array(2 + 2, s);
let len: int = arrayLength(arr);

fun f(x: int): int = x + 1;

let arr4: array {(int) -> int} = array(2 + 2, f);

assert(len = 4);
assert(f(3) = arrayElem(arr4, 0)(3));
assert(arrayLength(arr3) = 4)
```

In the case of a string being used for the array, it will be its address to the data segment that will be saved on the heap. Since Hygge at this point does not support string comparison or memory addresses comparison, it is difficult to test the $arrayElem$ operator with strings. Therefore there is no *assert* statement for this case.

<hr/>

*The picture showing the phases of the compiler was taken from the [course website](https://courses.compute.dtu.dk/02247/f23/overview.html).*



