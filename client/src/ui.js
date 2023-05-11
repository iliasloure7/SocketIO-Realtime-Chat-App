class UI {
  constructor() {
    this.messageList = document.querySelector('#message-list');
    this.totalUsers = document.querySelector('#total-users');
    this.userList = document.querySelector('#user-list');
  }

  showMessage({ className, text, username }) {
    const messageItem = `<li class="message-item ${className}">
      <p><b>${username}:</b> ${text}</p>
    </li>`;
    this.messageList.innerHTML += messageItem;
  }

  showUsers(users, socketId) {
    let html = '';
    let totalUsers = users.length - 1;

    users.forEach(([id, username]) => {
      if (id === socketId) return;
      html += `<li>${username}</li>`;
    });

    this.totalUsers.textContent = `(${totalUsers})`;
    this.userList.innerHTML = html;
  }

  showAlert(message, className, parentElem) {
    const div = document.createElement('div');
    div.className = className;
    div.textContent = message;
    parentElem.appendChild(div);

    setTimeout(() => {
      parentElem.removeChild(div);
    }, 3000);
  }
}
