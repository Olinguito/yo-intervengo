export class Citizen {
    static resName = 'citizen';
    static resNamePlural = 'citizens';

    username = '';
    email = '';
    name = '';
    reports = [];
    supported = [];
}

export class CitizenShort {
    constructor(uname = '', name = '') {
        this.username = uname;
        this.name = name;
    }
}
