import { readFileSync } from "node:fs";

const errorPage = readFileSync(new URL("../resources/error.html", import.meta.url), "utf8");

/**
 * Log a message to the console.
 * @param {string} message 
 */
export function log(message){
  console.log(`[DN-Reverse-Proxy] ${message}`);
}

/**
 * Return a HTML page with error message.
 * @param {string} error 
 * @return {string}
 */
export function generateErrorPage(error){
  return errorPage.replaceAll("{error}", error);
}