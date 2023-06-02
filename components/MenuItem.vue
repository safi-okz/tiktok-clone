<template>
    <div class="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
        <div class="flex items-center lg:mx-0 mx-auto">
            <Icon :name="icon" :color="colorString" :size="sizeString" />
            <span class="lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px]">
                {{ iconString }}
            </span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['iconString', 'colorString', 'sizeString']);

let icon = ref('');
if(props.iconString === 'For You') icon.value = 'mdi:home';
if(props.iconString === 'Following') icon.value = 'ci:group';
if(props.iconString === 'LIVE') icon.value = 'ri:live-line';

</script>
