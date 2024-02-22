# i-can-bench

A tiny set of utils to benchmark your JS that also cares about memory.

> No proper statistics behind it, it's as simple as it gets. 
> The memory measurement here is not a silver bullet, use devtools for memory profiling when convenience is not a priority.

## Features
- Runs your function many times and calculates average time it took
- Collects memory information while running, so you get the idea if you're trading performance for memory consumption


Each bench function has the same signature, differs only in sync/async behavior

- **Parameters**
  - `fn`: The function to benchmark.
  - `name`: The name of the benchmark.
  - `iterations`: The number of times to execute the function.
- **Returns**
  - An object containing the average execution time in miliseconds and the largest recorded diff in memory consumption for each memory space in V8 while the benchmark was running.

Memory spike info will only include the memory spaces that changed during the benchmark run.

```
MEMORY_SPIKE: {
    code_space: '+0.2349 MB',
    new_space: '+8.8414 MB',
    old_space: '+5.8182 MB',
},
name: 58.0426365,

```

|                 |                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `bench`         | runs your function synchronously, samples memory between runs                                                |
| `benchAsync`    | runs your async function in a for loop, awaits each call, samples memory between runs and every 10ms         |
| `benchAsyncAll` | runs your async function `iterations` times but concurently, awaits a Promise.all, samples memory every 10ms |

### Usage example

```
const { bench, benchAsync } = require('@naugtur/i-can-bench');

const syncResult = bench(() => {
  // Your synchronous code here
}, 'SyncTest', 1000);

console.log(syncResult);

const asyncResult = await benchAsync(async () => {
  // Your asynchronous code here
}, 'AsyncTest', 1000);

console.log(asyncResult);
```

### `recordMemorySpike(frequency = 10)`

Starts recording memory usage to detect spikes, based on a given frequency.

- **Parameters**
  - `frequency`: The interval in milliseconds to collect heap statistics.
- **Returns**
  - An object with methods to collect data and get the result.

#### Usage Example

```
const { recordMemorySpike } = require('@naugtur/i-can-bench');

const memorySpikeRecorder = recordMemorySpike(10);

// Perform operations...

const memorySpikeResult = memorySpikeRecorder.getResult();
console.log(memorySpikeResult);
```

These tools provide a straightforward way to measure and analyze the performance and memory usage of your JavaScript code, helping you to optimize and improve your applications.
