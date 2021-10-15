export class User {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public loginDateDisplay!: Date;
    public joinDate: any;
    public profileImageUrl!: string;
    public active: boolean;
    public unlocked: boolean;
    public role: string;
    public authorities: [];

    constructor() {
        this.userId = '';
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.email = '';
        this.loginDateDisplay = null;
        this.joinDate = null;
        this.profileImageUrl = '';
        this.active = false;
        this.unlocked = false;
        this.role = '';
        this.authorities = [];
    }

}