import { Image } from "image-js";

// Embed message using LSB
export const embedMessage = async (imageData, message) => {
  const image = await Image.load(imageData);
  const binaryMessage = message
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("") + "00000000"; // Null terminator

  let bitIndex = 0;

  for (let i = 0; i < image.data.length && bitIndex < binaryMessage.length; i += 4) {
    const bit = binaryMessage[bitIndex];
    image.data[i] = (image.data[i] & 0xfe) | parseInt(bit, 10); // Modify LSB
    bitIndex++;
  }

  return image.toDataURL();
};

// Extract message from image
export const extractMessage = async (stegoImage) => {
  const image = await Image.load(stegoImage);
  let binaryMessage = "";

  for (let i = 0; i < image.data.length; i += 4) {
    const lsb = image.data[i] & 1; // Extract LSB
    binaryMessage += lsb;
    if (binaryMessage.endsWith("00000000")) break; // Null terminator
  }

  const chars = binaryMessage
    .match(/.{8}/g)
    .map((binary) => String.fromCharCode(parseInt(binary, 2)));
  return chars.join("").replace(/\0/g, ""); // Remove null terminator
};
