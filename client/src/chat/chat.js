class Chat {
  constructor(socket, ui) {
    this.socket = socket;
    this.ui = ui;
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    this.chatForm = document.querySelector('#chat-form');
    this.formInput = document.querySelector('#chat-form .form-input');

    this.chatForm.addEventListener('submit', (e) => this.handleSubmitEvent(e));
    this.socketListeners();
  }

  socketListeners() {
    // Fires when the user connect
    this.socket.on('connect', () => {
      this.socket.emit('set-user', this.currentUser);
      sessionStorage.setItem('user', JSON.stringify(this.currentUser));
    });
    // Fires when the user has send to the server the current user
    this.socket.on('get-users', (users) =>
      this.ui.showUsers(users, this.socket.id)
    );
    // Fires when the user has send to the server the current user
    this.socket.on('user-connect', (message) => this.ui.showMessage(message));
    // Fires when the user disconnect (refresh page, close tab etc..)
    this.socket.on('user-disconnect', (message) =>
      this.ui.showMessage(message)
    );
    // Fires when the message is not private
    this.socket.on('general-message', (message) =>
      this.ui.showMessage(message)
    );
    // Fires when the message is private
    this.socket.on('private-message', (message) => {
      this.ui.showMessage(message);
    });
    //
    this.socket.on('correct-private-message', (message) => {
      this.ui.showMessage(message);
    });
    //
    this.socket.on('incorrect-private-message', () => {
      return;
    });
  }

  handleSubmitEvent(e) {
    e.preventDefault();

    if (this.formInput.value.trim() === '') return;

    this.formInput.value.startsWith('@')
      ? this.handlePrivateMessage()
      : this.handleGeneralMessage();

    this.formInput.value = '';
  }

  handleGeneralMessage() {
    const message = {
      className: 'general-message',
      text: this.formInput.value,
      username: this.currentUser.username,
    };

    this.ui.showMessage(message);
    this.socket.emit('general-message', message);
  }

  // Private message
  // 1. @Kikh or @Kikhsels(only username)
  // 2. @Kikh (only space)
  // 3. @Kikhsl <message>
  // 4. @Kikh <message> (correct private message)

  handlePrivateMessage() {
    this.socket.emit('private-message', {
      className: 'private-message',
      text: this.formInput.value,
      username: this.currentUser.username,
    });
  }
}
