import { IUser } from '@entities/User';
import jwt from 'jsonwebtoken'

export interface IUserDao {
    getOne: (email: string) => Promise<IUser | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
    database: any;
}

class UserDao implements IUserDao {
    constructor(database: any) {
        this.database = database
    }

    database: any;

    /**
     * @param email
     */
    public async getOne(user_id: string): Promise<IUser | null> {
        const result = await this.database.get(
            "SELECT user_name, password FROM user where user_name=?",
            user_id
        )
        if (result) {
            return result
        }
        return [] as any;
    }


    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        const result = await this.database.all("SELECT user_id, user_name FROM user;")
        if (result) {
            return result
        }
        return [] as any;
    }


    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<void> {
        // TODO
        const result = await this.database.run(
            'INSERT INTO user (user_name, password) values (?, ?);',
            user.user_name,
            user.password
        )
        if (result) {
            return result
        }
        return {} as any;
    }


    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }
}

export default UserDao;
