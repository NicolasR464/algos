const { parentPort } = require("worker_threads");

parentPort.on("message", (task) => {
  // This is a simple example, where each worker thread just squares a number
  const result = task.number * task.number;
  parentPort.postMessage({ id: task.id, result });
});
