 // import pako from "pako";

// /** Compress data with gzip and return base64 string */
// export function gzipCompress(obj: any): string {
//   const jsonStr = JSON.stringify(obj);
//   const compressed = pako.gzip(jsonStr);
//   // Convert to base64 for easy transfer
//   return btoa(String.fromCharCode(...compressed));
// }

// /** Decompress base64 gzip string to JS object */
// export function gzipDecompress(base64: string): any {
//   const binaryString = atob(base64);
//   const byteArray = Uint8Array.from(binaryString, ch => ch.charCodeAt(0));
//   const decompressed = pako.ungzip(byteArray, { to: "string" });
//   return JSON.parse(decompressed);
// }