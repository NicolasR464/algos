const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const numberOfThreads = 4;
const workers = [];
const tasks = [];
const results = [];

// Create workers
for (let i = 0; i < numberOfThreads; i++) {
  const worker = new Worker("./worker.js");
  worker.on("message", (result) => {
    console.log(result);
    results[result.id] = result.result;
    if (tasks.length > 0) {
      const task = tasks.pop();
      worker.postMessage(task);
    }
  });
  workers.push(worker);
}

// Submit tasks to the thread pool
for (let i = 0; i < 10; i++) {
  const task = { id: i, number: i };
  if (i < numberOfThreads) {
    workers[i].postMessage(task);
  } else {
    tasks.push(task);
  }
}

// Wait and print results
setTimeout(() => {
  console.log("Results:", results);
}, 1000);
