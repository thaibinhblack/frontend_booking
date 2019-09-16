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
                <button @click="updateService(item)"><v-icon>mdi-pencil</v-icon></button>
            </template>
            </v-data-table>
        </v-card>
        <form-service :dialog="dialog" :update="update" :item_service="item_service" @closeDialog="dialog = $event"/>
    </v-col>
</template>

<script>
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
            selected_service: [],
            dialog: true,
            item: {},
            update: false,
            item_service: {}
        }
    },
    methods: {
        ApiGetService(){
            this.$http.get(this.$store.state.API_URL +  'service')
            .then((response) => {
                this.items = response.data
            })
        },
        updateService(item)
        {
            this.dialog = true
            this.update = true
            this.item_service = item
        }
    },
    created()
    {
        this.ApiGetService()
    }
}
</script>