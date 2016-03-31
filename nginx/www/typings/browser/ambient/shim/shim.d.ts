// Compiled using typings@0.6.1
// Source: shim.d.ts
// shim.d.ts
// contains shim functions to make the TS compiler happy

// the require function is injected by webpack so we can require CSS/LESS files
declare function require(path:string): any;