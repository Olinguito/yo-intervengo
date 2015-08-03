import {inject} from 'aurelia-framework';
import {User} from 'lib/user';

@inject(User)
export class LoginDialog {
    data = {};
    loading = false;
    loginErrors = [];
    registerErrors = [];

    constructor(user) {
        this.user = user;
    }

    login() {
        this.loading = true;
        this.loginErrors.length = 0;

        this.user.login(this.data.username, this.data.password)
            .then(() => {
                this.loading = false;
                this.dialog.close();
            })
            .catch(res => {
                setLoginErrors(this.loginErrors, res.content.error.code);
                this.loading = false
            });
    }

    register() {
        this.loading = true;
        this.registerErrors.length = 0;

        this.user.register(this.data)
            .then(u => this.user.login(this.data.username, this.data.password))
            .then(() => {
                this.loading = false;
                this.dialog.close();
            })
            .catch(res => {
                this.loading = false
                setRegisterErrors(this.registerErrors, res.content.error);
            });
    }
}

function setLoginErrors(arr, code) {
    switch (code) {
        case 'LOGIN_FAILED':
            arr.push('Comprueba tus datos');
            break;
        case 'USERNAME_EMAIL_REQUIRED':
            arr.push('Campos requeridos');
    }
}

function setRegisterErrors(arr, error) {
    for (let type in error.details.codes) {
        arr.push(getMsg(type));
    }

    function getMsg(code) {
        switch (code) {
            case 'email': return 'Email invalido';
            case 'password': return 'Password invalido';
        }
    }
}
