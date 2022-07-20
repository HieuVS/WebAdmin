export const imageToBase64 = (image) => btoa(new Uint8Array(image).reduce(function (data, byte) {
    return data + String.fromCharCode(byte);
  }, ''));