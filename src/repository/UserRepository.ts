import { Collection, Db } from "mongodb";
import { User } from "@entities/User";
import { PFTException } from "@exceptions/PFTException";
const dbConnection = require("@middlewares/db-config");

/**
 * User repository
 */
export class UserRepository {

    private db: Db;
    private collection: Collection;

    public constructor() {
        this.db = dbConnection.db("pft-db");
        this.collection = this.db.collection("user");
    }

    public async save(username: string, email: string, hashedUserPwd: string): Promise<void> {
        const user: User = {
            username: username,
            email: email,
            pwd: hashedUserPwd,
        };
        try {
            await this.collection.insertOne(user);
        } catch (e) {
            throw new PFTException("Error occurred when saving a user to db", e as Error);
        }
    }

    public async findByEmail(email: string): Promise<User | null> {
        try {
            const response = await this.collection.findOne({ email: email });
            if (!response) return null;
            const { _id, ...user } = response;
            return user as User;
        } catch (e) {
            throw new PFTException("Error occurred when finding user by email from db", e as Error);
        }
    }
}