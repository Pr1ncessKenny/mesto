import { profileConfiguration } from "../pages/index.js";

export class UserInfo {
  constructor({titleSelector, jobSelector}){
    this._titleSelector = titleSelector;
    this._jobSelector = jobSelector;
    this._titleElem = document.querySelector(`.${this._titleSelector}`);
    this._jobElem = document.querySelector(`.${this._jobSelector}`);
  }

  setUserInfo = (data) => {
    this._titleElem.textContent = data.title || '';
    this._jobElem.textContent = data.job || '';
  }

  getUserInfo = () => {
    return {title: this._titleElem.textContent, job: this._jobElem.textContent};
  }
}



/* export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
      this._name = document.querySelector(nameSelector);
      this._description = document.querySelector(descriptionSelector);
      this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
      return {
          name: this._name.textContent,
          description: this._description.textContent,
          avatar: this._avatar
      };
  }

  setUserInfo(userInfo) {
      this._name.textContent = userInfo.name;
      this._description.textContent = userInfo.description;
  }

  setAvatar(userInfo) {
      this._avatar.src = userInfo.avatar;
  }
} */
