<template>
    <div class="flex hover:bg-gray-100 rounded-md w-full py-1.5 px-2">
        <img v-if="user.image" :src="user.image" width="35" alt="" class="rounded-full lg:mx-0 mx-auto" />
        <div class="lg:pl-2 lg:block hidden">
            <div class="flex items-center">
                <div class="font-bold text-[14px]">
                    {{ $generalStore.allLowerCaseNoCaps(user.name) }}
                </div>
                <div class="ml-1 rounded-full bg-[#58d5ec] h-[14px] relative">
                    <Icon name="teenyicons:tick-small-solid" class="relative -top-[7px] " color="#ffffff" size="15" />
                </div>
            </div>
            <div class="text-gray-600 text-[12px] font-light">
                {{ user.name }}
            </div>
        </div>
    </div>
</template>

<script setup>
const { $generalStore } = useNuxtApp();

const props = defineProps(['user']);
</script>

<style lang="scss" scoped>

</style>