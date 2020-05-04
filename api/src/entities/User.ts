export interface IUser {
    id: number;
    user_name: string;
    password: string;
}

class User implements IUser {

    public id: number;
    public user_name: string;
    public password: string;

    constructor(user_name: string | IUser, password?: string, id?: number) {
        if (typeof user_name === 'string') {
            this.user_name = user_name;
            this.password = password || '';
            this.id = id || -1;
        } else {
            this.user_name = user_name.user_name;
            this.password = user_name.password;
            this.id = user_name.id;
        }
    }
}

export default User;
