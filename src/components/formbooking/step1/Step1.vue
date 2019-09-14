<template>
<v-stepper-content step="1">
    <step-1 />
</v-stepper-content>
</template>
<script>
export default {
    components:{
         'step-1': () => import('@/components/formbooking/step1/ListStore.vue'),
    }
}
</script>