import config from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email,password,fullname}){
        try {
            const userAccount = await this.account.create(ID.unique() ,email,password,fullname)
            
            if (userAccount) {
                // Call another method for user direct login   
                return await this.login({email,password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get()
            return user || null
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
            return true
        } catch (error) {
            console.log("Appwrite Service :: logout :: error",error);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;