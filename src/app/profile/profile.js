import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'lib/user';

@inject(User, Router)
export class Profile {
    constructor(user, router) {
        this.user = user;
        this.router = router;
    }

    activate() {
        return this.user.getProfile();
    }

    canActivate() {
        return this.user ? this.user.isLoggedIn : false;
    }

    open(report) {
        this.router.navigate(`reports/${report.id}`);
    }
}
