import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage } from "appwrite";



export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createpost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const response = await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
            return response;
        } catch (error) {
            console.log("Appwrite service :: createPost::error", error);
        }
    }

    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service:: updatePost::error", error);
        }

    }

    async deletepost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
            )
            return true
        } catch (error) {
            console.log("Appwrite service:: deletePost::error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug

            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                // queries,


            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //file upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite service:: uploadfile::error", error);
            return false;
        }
    }
    async deletefile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwritebucketid,
                fileId,
            )
            return true
        } catch (error) {
            console.log("Appwrite service:: deletefile::error", error);
            return false;
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwritebucketid,
            fileId,
        )
    }

}
const service = new Service();

export default service;