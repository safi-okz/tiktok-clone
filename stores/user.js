import { defineStore } from "pinia";
import axios from "~~/plugins/axios";
import { useGeneralStore } from "./general";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('userStore', {
    state: () => ({
            id: '',
            name: '',
            bio: '',
            image: ''
    }),
    getters: {

    },
    actions: {
        async getToken(){
            await $axios.get('/sanctum/csrf-cookie');
        },
        async login(email, password){
            await $axios.post('/login', {email: email, password: password});
        },
        async register(name, email, password, confirmPassword){
                await $axios.post('http://localhost:8000/register', {
                    name: name,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                });
        },
        async getUser(){
            // let res = await $axios.get('/api/user');
            let res = await $axios.get('http://localhost:8000/api/logged-in-user');

            this.id = res.data[0].id;
            this.name = res.data[0].name;
            this.bio = res.data[0].bio;
            this.image = res.data[0].image;
        },
        async updateUserImage(data){
                return await $axios.post('/api/update-user-image', data);
        },
        async updateUser(name, bio){
                return await $axios.patch('/api/update-user', {
                    name: name,
                    bio: bio
                });
        },
        async logout(){
            await $axios.post('/logout');
            this.resetUser();
        },
        async createPost(data){
            return await $axios.post('/api/posts', data);
        },

        async deletePost(post){
            return await $axios.delete(`/api/posts/${post.id}`);
        },
              
        async likePost(post, isPostPage){
                let res = await $axios.post('/api/likes', {
                    post_id: post.id,
                            
                });
        
                console.log('like post response ', res);
        
                let singlePost = null;
                if(isPostPage){
                    singlePost = post;
                } else {
                    singlePost = useGeneralStore().posts.find(p => p.id === post.id);
                }
                console.log('single post gett ', singlePost);
                singlePost.likes.push(res.data.like);
        },

        async unlikePost(post, isPostPage){
            let deleteLike = null;
            let singlePost = null;

            if(isPostPage){
                singlePost = post;
            } else {
                singlePost = useGeneralStore().posts.find(p => p.id === post.id);
            }
            singlePost.likes.forEach(like => {
                if(like.user_id === this.id){ deleteLike = like}
            });

            let res = await $axios.delete('/api/likes' + deleteLike.id);

            for(let i = 0; i < singlePost.likes.length; i++){
                const element = singlePost.likes[i];
                if(like.id === res.data.like.id) { singlePost.likes.splice(i, 1); }
            }
    },

    async addComment(post, comment){
        console.log('postttttt ', post.id);
        let res = await $axios.post('/api/comments', {
            post_id: post.id,
            comment: comment
        });

        if(res.status === 200){
            await this.updateComments(post);
        }
    },

    async updateComments(post){
        let res = await $axios.get(`/api/profile/${post.user.id}`);

        for(let i = 0; i < res.data.posts.length; i++){
            let updatePost = res.data.posts[i];

            if(post.id == updatePost.id){
                useGeneralStore().selectedPost.comments = updatePost.comments;
            }
        }
    },

    async deleteComment(post, commentId){
            let res = await $axios.delete(`api/comments/${commentId}`, {
                post_id: post.id
            });

            if(res.status === 200){
                await this.updateComments(post);
            }
    },
        resetUser(){
            this.id = '';
            this.name = '';
            this.email = '';
            this.bio = '';
            this.image = '';
        }
    },
    persist: true
})