export const sleep = (timeout: number) => {
  return new Promise((r) => setTimeout(r, timeout));
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
