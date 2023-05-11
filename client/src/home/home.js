class Home {
  constructor(ui) {
    this.ui = ui;
    this.chatJoinForm = document.querySelector('#chat-join-form');
    this.formInput = document.querySelector('#chat-join-form .form-input');
    this.inputGroup = document.querySelector('#chat-join-form .input-group');
    this.chatJoinForm.addEventListener('submit', (e) =>
      this.handleSubmitEvent(e)
    );
  }

  handleSubmitEvent(e) {
    e.preventDefault();

    if (!userNameRegex().test(this.formInput.value)) {
      this.ui.showAlert(
        'Username should contain only letters and numbers!',
        'alert alert-danger',
        this.inputGroup
      );

      this.formInput.value = '';
      return;
    }

    sessionStorage.setItem(
      'user',
      JSON.stringify({ username: this.formInput.value, isRedirect: true })
    );

    this.formInput.value = '';
    location.replace(`${SERVER_URL}/chat`);
  }
}
