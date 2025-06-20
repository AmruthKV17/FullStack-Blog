import config from "../config/config";
import { Client,ID, Databases, Storage, Query } from "appwrite";


export class DatabaseService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);

        this.storage = new Storage(this.client);


    }

    async createPost({title, slug, content, featuredimage, userId, status}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId,
                }
            )           
        } catch (error) {
            console.log("Appwrite :: createPost :: error",error);
            
        }
    }

    async updatePost(slug,{title,content, featuredimage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite :: updatePost :: error ",error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug){    
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite :: getPost :: error",error);
            return false;
        }
    }

    async listPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite :: listPost :: error ",error);
            return false
        }
    }

    // File upload method

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error",error);
            return false
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: deletefile :: error",error);
            return false
            
        }
    }

    filePreview(fileId){
        return this.storage.getFileView(
            config.appwriteBucketId,
            fileId
        );
    }
}

const databaseService = new DatabaseService();

export default databaseService;
