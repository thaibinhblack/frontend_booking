<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'DANH SÁCH CHI NHÁNH'" :link="'Danh sách chi nhánh'"/>
        <v-card>
            <v-data-table
                :headers="headers"
                :items="items"
                v-model="selected_service"
            > 
            <template v-slot:item.IMAGE_SERVICE="{item}">
                <img :src="$store.state.PUBLIC_URL +item.IMAGE_SERVICE" />
            </template>
            <template v-slot:item.ACTION="{item}">
                <button><v-icon>mdi-pencil</v-icon></button>
            </template>
            </v-data-table>
        </v-card>
        <form-service />
    </v-col>
</template>

<script>
import axios from 'axios'
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue'),
        'form-service': () => import('@/components/dialog/FormService.vue')
    },
    data()
    {
        return {
            headers: [
                {text: 'TÊN DỊCH VỤ', value: 'NAME_SERVICE'},
                {text: 'HÌNH ẢNH', value: 'IMAGE_SERVICE', align: 'center', sortable: false},
                {text: 'NGÀY TẠO DỊCH VỤ', value: 'CREATED_AT'},
                {text: 'TÁC VỤ', value: 'ACTION', sortable: false}
            ],
            items: [],
            selected_service: []
        }
    },
    methods: {
        ApiGetService(){
            axios.get(this.$store.state.API_URL +  'service')
            .then((response) => {
                this.items = response.data
            })
        }
    },
    created()
    {
        this.ApiGetService()
    }
}
</script>