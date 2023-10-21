export class UserInfo {
  constructor ({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userId = null;
  }

  getUserInfo() {
    return {
      name: this._name, 
      about: this._about,
      userId: this._userId
   };
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
    //console.log(this._userId);
  }

  setUserAvatar(url) {
    //console.log(this._avatar.src);
    this._avatar.src = url;
  }
}