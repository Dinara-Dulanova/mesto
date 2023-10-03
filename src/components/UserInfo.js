export class UserInfo {
  constructor ({nameSelector, aboutSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._name, 
      about: this._about 
   };
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}