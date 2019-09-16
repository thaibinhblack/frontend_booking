<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'DANH SÁCH CHI NHÁNH'" :link="'Danh sách chi nhánh'" />
        <v-card>
            <v-card-text>
                <v-data-table
                :headers="headers"
                :items="stores"> 
                <template v-slot:top>
                    <v-row style="padding:10px;">
                        <v-col cols="12" sm="4" md="3" style="text-align:center;">
                            <button class="btn-add-store"><router-link to="/manager/add-store">  <v-icon>mdi-plus</v-icon> Thêm mới chi nhánh </router-link></button>
                        </v-col>
                    </v-row>
                    
                </template>
                <template v-slot:item.ACTION="{item}">
                    <router-link :to="'/manager/store/' + item.UUID_STORE"><v-icon class="btn-action" title="Xem chi tiết">mdi-chevron-right</v-icon></router-link>
                </template>
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
               {text: 'TÊN CHI NHÁNH', value: 'NAME_STORE', sortable: true},
               {text: 'QUẬN / HUYỆN', value: 'NAME_COUNTRY', sortable: true},
               {text: 'ĐỊA CHỈ', value: 'ADDRESS_STORE', sortable: true},
               {text: 'SỐ LƯỢNG PHÒNG', value: 'NUMBER_ROOM', sortable: true, align: 'center'},
               {text: 'SĐT', value: 'PHONE_STORE', sortable: false, align: 'center'},
               {text: 'NGÀY TẠO', value: 'CREATED_AT', sortable: true},
               {text: 'TÁC VỤ', value: 'ACTION', sortable: false, align: 'center',width: '120px'}
            ],
            stores: [],
            // selected_service: []
        }
    },
    methods: {
        ApiGetStore()
        {
            this.$http.get(this.$store.state.API_URL + 'store').then((response) => {
                this.stores = response.data
            })
        }
    },
    created()
    {
        this.ApiGetStore()
    }
}
</script>

<style scoped>
a {text-decoration: none}
.btn-action {cursor: pointer; margin: 7px}
.btn-add-store {padding: 10px 15px;border:1px solid #e2e2e2;border-radius: 5px; color: #0082d0;background: #e6f3fa;border-color: #99cdec;outline: none}
.btn-add-store i {color:#0082d0}
.btn-add-store:hover a,.btn-add-store:hover i {color: #fff;}
.btn-add-store:hover {background: #0082d0;}
</style>