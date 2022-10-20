# Profiler-SMP
[![version][version_badge]][changelog]
[![CodeFactor][codefactor_badge]](https://www.codefactor.io/repository/github/regorxxx/Profiler-SMP/overview/main)
[![CodacyBadge][codacy_badge]](https://www.codacy.com/gh/regorxxx/Profiler-SMP/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=regorxxx/Profiler-SMP&amp;utm_campaign=Badge_Grade)
![GitHub](https://img.shields.io/github/license/regorxxx/Profiler-SMP)

JavaScript [Spider Monkey Panel](https://theqwertiest.github.io/foo_spider_monkey_panel) profiling tool and library of profiling modules and benchmarks for [foobar2000](https://www.foobar2000.org).  Profiler-SMP allows you to compare different techniques, operators and functions regarding execution speed and memory consumption. It reports results either in table text or JSON format.

![profiler3](https://user-images.githubusercontent.com/83307074/196931105-173baebe-5aaf-4a88-8d0d-07e90812eab7.gif)

## Features
- Report: average, max, minimum and total.
	- Execution time.
	- Memory.
- Built-in tests, easily expandable.
- Output:
	- JSON
	- TXT tables
	- Popups

![profiler2](https://user-images.githubusercontent.com/83307074/196931161-855827f8-3d0b-44ff-9d73-3c4fc1625ca8.gif)

## Available tests
- Arrays:
	- Array concatenation
	- Array copying
- Maps and objects:
	- Map:access
	- Map:creation
	- Object iteration
- Strings:
	- Split
- Functions:
	- Recursion
- Standard operations:
	- Loops
	- Comparison operators
	- Comparison statements
	- (De-)composition
	- Guards
- Foobar 2000 /SMP specifics:
	- Tags:retrieval:info
	- Tags:retrieval:tf

## Installation
Just load the the main file 'smp_profiler.js' into a blank panel.

[changelog]: CHANGELOG.md
[version_badge]: https://img.shields.io/github/release/regorxxx/Profiler-SMP.svg
[codacy_badge]: https://api.codacy.com/project/badge/Grade/e04be28637dd40d99fae7bd92f740677
[codefactor_badge]: https://www.codefactor.io/repository/github/regorxxx/Profiler-SMP/badge/main
