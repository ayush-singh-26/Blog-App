import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                await this.login({ email, password }); // Automatically log in the user after account creation
                return userAccount;
            } else {
                return null; // Handle if userAccount creation failed
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
            throw error; // Re-throw the error to handle it in the caller
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
            throw error;
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions();
        }
        catch (error) {
            console.log("Appwrite service::logout::Error", error);
        }
        
    }
}

const authService = new AuthService();


export default authService