<template>
    <MainLayout>
        <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
           <div v-for="post in $generalStore.posts" :key="post">
                <PostMain :post="post" />
           </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout';

const { $generalStore } = useNuxtApp();

onMounted( async () => {
    try{
        await $generalStore.getAllUsersAndPosts();
    } catch(error){
        console.log('all User error ', error.message);
    }
})
</script>
