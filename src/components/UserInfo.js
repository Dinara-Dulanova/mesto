export class UserInfo {
  constructor ({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name, 
      about: this._about 
   };
  }

  setUserInfo(name, about, url) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = url;
  }
}