<template>
    <v-col cols="12" sm="12">
    <header-manager :title="'DANH SÁCH LỊCH SỬ NGƯỜI DÙNG'" link="Danh sách lịch sử người dùng" />
    <v-card style="padding:25px;">
    
        <v-card-text>
            <v-data-table
            :headers="headers"
            :items="historys">
            </v-data-table>
        </v-card-text>
    </v-card>
</v-col>
</template>
<script>
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue')
    },
    data()
    {
        return {
            headers: [
                {text: 'NHÓM CHỨC NĂNG', value: 'NAME_HISTORY',sortable: false,align: 'center'},
                {text: 'NỘI DUNG THAO TÁC', value: 'CONTENT_HISTORY', sortable: true},
                {text: 'NGÀY THAO TÁC', value: 'CREATED_AT', sortable: true},

            ],
            historys: []
        }
    },
    methods: {
        ApiHistory()
        {
            this.$http.get(this.$store.state.API_URL + 'history').then((response) => {
                this.historys = response.data
            })
        }
    },
    created()
    {
        this.ApiHistory()
    }
}
</script>

<style scoped>
a {text-decoration: none}
</style>