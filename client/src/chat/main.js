const init = () => {
  const socket = io();
  new Chat(socket, new UI());
};

init();
