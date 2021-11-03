import { RESTDataSource } from "apollo-datasource-rest";

class DemoAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://jsonplaceholder.typicode.com';
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.name);
    }

    async getPosts() {
        return await this.get('posts');
    }
    
    async getPost(id) {
        return await this.get(`posts/${id}`);
    }
}

export { DemoAPI };