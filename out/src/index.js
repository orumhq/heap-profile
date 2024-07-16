"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const write_1 = require("./write");
const profiler = require("bindings")("sampling_heap_profiler");
let profiling = false;
function start(cfg) {
  if (!profiling) {
    if (cfg) {
      profiler.startSamplingHeapProfiler(
        cfg.sampleIntervalBytes,
        cfg.stackDepth
      );
    } else {
      profiler.startSamplingHeapProfiler();
    }
    profiling = true;
  }
}
exports.start = start;
function stop() {
  if (profiling) {
    profiler.stopSamplingHeapProfiler();
    profiling = false;
  }
}
exports.stop = stop;
function get(translate) {
  if (!profiling) {
    throw new Error("get can only be called after profiler has been started");
  }
  const profile = profiler.getAllocationProfile();
  return translate ? translateToDevtools(profile) : profile;
}
exports.get = get;
function write(filename, cb) {
  if (typeof filename === "function") {
    cb = filename;
    filename = undefined;
  }
  const promise = profiling
    ? write_1.writeAsync(translateToDevtools(get()), filename)
    : Promise.reject(new Error("profiler not running"));
  if (cb) {
    promise.then(cb.bind(null, null)).catch(cb);
  } else {
    return promise;
  }
}
exports.write = write;
function translateToDevtools(node) {
  return {
    functionName: node.name,
    scriptId: node.scriptId,
    lineNumber: node.lineNumber,
    columnNumber: node.columnNumber,
    url: node.scriptName,
    selfSize: node.allocations.reduce((sum, alloc) => {
      return sum + alloc.size * alloc.count;
    }, 0),
    children: node.children.map(translateToDevtools),
  };
}
//# sourceMappingURL=index.js.map
