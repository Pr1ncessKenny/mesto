//отображение информации о пользователе на странице
export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._nameElem = document.querySelector(`.${this._nameSelector}`);
        this._jobElem = document.querySelector(`.${this._jobSelector}`);
    }

    //возвращает объект с данными пользователя
    getUserInfo = () => {
        return {
            title: this._nameElem.textContent,
            job: this._jobElem.textContent,
        };
    };
    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._nameElem.textContent = data.title || "";
        this._jobElem.textContent = data.job || "";
    }
}
