import {inject} from 'aurelia-framework';
import {User} from 'lib/user';

@inject(User)
export class Profile {
    constructor(user) {
        this.user = user.profile;
    }

    canActivate() {
        return this.user.isLoggedIn;
    }
}
