import CryptoJS from "crypto-js";

const SECRET_KEY = "f222222222222222222277777777777777777777777777777777";  

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(cipherText: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8) || "";
  } catch {
    return "";
  }
}