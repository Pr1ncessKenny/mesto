//отображение информации о пользователе на странице
export default class UserInfo {
    constructor({ userNameSelector, jobSelector, avatarSelector }) {
        this._userNameSelector = userNameSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
        this._userNameElement = document.querySelector(this._userNameSelector);
        this._jobElement = document.querySelector(this._jobSelector);
        this._avatarElement = document.querySelector(this._avatarSelector);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.setUserInfo = this.setUserInfo.bind(this);
    }
    
    //возвращает объект с данными пользователя
    getUserInfo = () => {
        return {
            title: this._userNameElement.textContent,
            job: this._jobElement.textContent,
        };
    };

    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({ name, about, avatar, _id }) {
        this._name = name;
        this._userNameElement.textContent = name || "";
        this._about = about;
        this._jobElement.textContent = about || "";
        this._avatar = avatar;
        this._avatarElement.style.backgroundImage = `url('${this._avatar}')`;
        this._id = _id;
    }

    // возвращает объект с данными аватара
    getUserAvatar = () => {
        return {
            avatar: this._avatar,
        };
    };

    // возвращает объект с данными id пользователя
    // getUserId = () => this._id;
    get id() {
        return this._id;
    }
}
