<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'DANH SÁCH CHI NHÁNH'" :link="'Danh sách chi nhánh'"/>
        <v-card>
            <v-data-table
                :headers="headers"
                :items="items"
                show-select
                v-model="selected_service"
            > 
            <template v-slot:item.IMAGE_SERVICE="{item}">
                <img :src="PUBLIC_URL +item.IMAGE_SERVICE" />
            </template>
            </v-data-table>
        </v-card>
        <form-service />
    </v-col>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
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
                {text: 'NGÀY TẠO DỊCH VỤ', value: 'CREATED_AT'}
            ],
            items: [],
            selected_service: []
        }
    },
    computed:
    {
        ...mapGetters(["PUBLIC_URL", "BASE_URL"])
    },
    methods: {
        ApiGetService(){
            axios.get(this.BASE_URL +  'service')
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