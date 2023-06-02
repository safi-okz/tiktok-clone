import { defineStore } from "pinia";
import axios from "~~/plugins/axios";

const $axios = axios().provide.axios;

export const useProfileStore = defineStore('profileStore', {
    state: () => ({
            id: '',
            name: '',
            bio: '',
            image: '',
            post: null,
            posts: null,
            allLikes: 0
    }),
    getters: {

    },
    actions: {
        async getProfile(id){
            this.resetUser();
            let respone = await $axios.get(`/api/profile/${id}`);
            this.id = await respone.data.user[0].id;
            this.name = await respone.data.user[0].name;
            this.bio = await respone.data.user[0].bio;
            this.image = await respone.data.user[0].image;
            this.posts = await respone.data.posts;

            this.allLikeCount();
        },

        allLikeCount(){
            this.allLikes = 0;
            for(let i = 0; i < this.posts.length; i++){
                const post = this.posts[i];

                for(let j = 0; j < post.likes.length; j++){
                    this.allLikes++;
                }
            }
        },
        resetUser(){
            this.id = '';
            this.name = '';
            this.email = '';
            this.bio = '';
            this.image = '';
            this.posts = '';

        }
    },
    persist: true
})