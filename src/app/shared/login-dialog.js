import {inject} from 'aurelia-framework';
import {User} from 'lib/user';

const STATUS_CONFLICT = 409;

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
                if (res.content.error) {
                    setLoginErrors(this.loginErrors, res.content.error);
                }
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
                if (res.statusCode == STATUS_CONFLICT) {
                    this.registerErrors.push('Usuario ya existe');
                } else {
                    setRegisterErrors(this.registerErrors, res.content);
                }
            });
    }
}

function setLoginErrors(arr, err) {
    switch (err) {
        case 'access_denied':
            arr.push('Comprueba tus datos');
            break;
    }
}

function setRegisterErrors(arr, resContent) {
    var codes = resContent.errors ? Object.keys(resContent.errors) : [];
    for (let type of codes) {
        arr.push(getMsg(type));
    }

    function getMsg(code) {
        switch (code) {
            case 'username': return 'Nombre de usuario invalido';
            case 'email': return 'Email invalido';
            case 'password': return 'Password invalido';
        }
    }
}
