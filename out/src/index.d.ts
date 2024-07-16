export interface Allocation {
  size: number;
  count: number;
}
export interface AllocationProfileNode {
  name?: string;
  scriptName: string;
  scriptId: number;
  lineNumber: number;
  columnNumber: number;
  allocations: Allocation[];
  children: AllocationProfileNode[];
}
export declare function start(cfg?: {
  sampleIntervalBytes: number;
  stackDepth: number;
}): void;
export declare function stop(): void;
export declare function get(translate: true): DevToolsProfileNode;
export declare function get(translate?: false): AllocationProfileNode;
export interface Callback {
  (err: Error | null, filename?: string): void;
}
export declare function write(): Promise<string>;
export declare function write(filename: string): Promise<string>;
export declare function write(cb: Callback): void;
export declare function write(filename: string, cb: Callback): void;
export interface DevToolsProfileNode {
  functionName?: string;
  scriptId: number;
  lineNumber: number;
  columnNumber: number;
  url: string;
  selfSize: number;
  children: DevToolsProfileNode[];
}
