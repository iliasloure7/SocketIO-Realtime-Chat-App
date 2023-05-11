const userNameRegex = () => /^[a-zA-Z0-9]+$/;

const getTextFromPrivateMessage = (text) => {
  const index = text.indexOf(' ');

  if (index !== -1) return text.substring(index + 1, text.length);

  return '';
};
