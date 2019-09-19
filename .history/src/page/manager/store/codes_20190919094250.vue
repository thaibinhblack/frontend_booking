<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'DANH SÁCH CHI NHÁNH'" :link="'Danh sách chi nhánh'" />
        <v-card>
            <v-card-text>
            </v-card-text>
        </v-card>
    </v-col>
</template>
<script>
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue')
    },
}
</script>