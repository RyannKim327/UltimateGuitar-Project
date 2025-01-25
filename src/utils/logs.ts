export function error_(from: string, message: string | object) {
  let msg = message;
  if (typeof message === "object") {
    msg = JSON.stringify(message, null, 2);
  }
  console.log(`\x1b[31mERROR [${from}]:\x1b[37m ${msg}`);
}

export function log_(from: string, message: string | object) {
  let msg = message;
  if (typeof message === "object") {
    msg = JSON.stringify(message, null, 2);
  }
  console.log(`\x1b[32mLOG [${from}]:\x1b[37m ${msg}`);
}
