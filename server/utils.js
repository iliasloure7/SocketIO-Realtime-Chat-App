export const getUsername = (text) => {
  const index = text.indexOf(' ');
  const message = text.substring(index).trim();
  if (index === -1 || message.length === 0) return '';
  return text.substring(1, index);
};

export const getTextFromPrivateMessage = (text) => {
  const index = text.indexOf(' ');
  return text.substring(index + 1, text.length);
};

export const getKeyByValue = (map, searchValue) => {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
};
