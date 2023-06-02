import { defineStore } from "pinia";
import { useUserStore } from "./user";
import axios from '../plugins/axios';

const $axios = axios().provide.axios;

export const useGeneralStore = defineStore('generalStore', {
    state: () => ({
            isLoginOpen: false,
            isEditProfileOpen: false,
            selectedPost: null,
            ids: null,
            isBackUrl: '/',
            posts: null,
            suggested: null,
            following: null
    }),
    getters: {

    },
    actions: {
        bodySwitch(val){
            if(val){
                document.body.style.overflow = 'hidden';
                return;
            }
            document.body.style.overflow = 'visible';
        },

        allLowerCaseNoCaps(str){
            return str.split(' ').join('').toLowerCase();
        },

        setBackUrl(url){
            return this.isBackUrl = url;
        },
        async hasSessionExpired(){
            await $axios.interceptors.response.use((response) => {
                // Call was successful, continue
                return response;
            }, (error) => {
                switch (error.response.status){
                    case 401: // Not Logged in
                    case 419: // Session expire
                    case 503: // Down for maintenance
                        // Bounce the user to the login screen with a redirect back
                        useUserStore().resetUser();
                        window.location.href = '/';
                        break;
                    case 500: 
                        alert('Oops, something went wrong! The team has been notified');
                        break;
                    default: 
                        // Allow individual requests to handle other errors
                        return Promise.reject(error);
                }
            });
        },
        async getRandomUser(type){
            let res = await $axios.get(`/api/get-random-user`);

            if(type === 'suggested'){
                this.suggested = res.data.suggested;
            }

            if(type === 'following'){
                this.following = res.data.following;
            }
        },
        updateSideMenuImage(array, user){
            for(let i = 0; i < array.length; i++){
                const res = array[i];
                if(res.id == user.id){
                    res.image = user.image;
                }
            }
        },
        async getAllUsersAndPosts(){
            let res = await $axios.get('/api/home');
            this.posts = res.data;
        },
        async getPostById(id){
            let res = await $axios.get(`/api/posts/${id}`);

            this.selectedPost = await res.data.post[0];
            this.ids = await res.data.ids;
        }
    },
    persist: true
});