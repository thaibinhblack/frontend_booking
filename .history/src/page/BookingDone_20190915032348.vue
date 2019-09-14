<template>
    <div id="wrap-main">
        <div class="layout-main form-booking">
            <step-done :step="3" />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        'step-done': import('@/components/formbooking/StepDone.vue'),
    }
}
</script>