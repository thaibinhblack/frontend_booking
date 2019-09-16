<template>
<v-col cols="12" sm="12">
    <header-manager :title="'CHI TIẾT BOOKING'" :link="'Danh sách stylist'" />
    <v-card style="padding: 25px;">
        <v-data-table
            :headers="headers"
            :items="stylists"
            show-select
            
        >
            <template v-slot:top>
                <button class="btn-form-stylist" @click="addStylist()"> <v-icon>mdi-plus</v-icon>  THÊM MỚI STYLIST</button>
            </template>
            <template v-slot:item.URL_STYLIST="{item}">
                <v-avatar
                    size="80"
                    color="#e2e2e2"
                >
                    <img v-if="item.URL_STYLIST != null" :src="PUBLIC_URL + item.URL_STYLIST" alt="alt">
                    <img v-else :src="item.AVATAR" alt="alt">
                </v-avatar>
            </template>
            <template v-slot:item.ACTION="{item}">
                <button @click="updateItemStylist(item)"><v-icon>mdi-pencil</v-icon></button>
            </template>
        </v-data-table>
        
    </v-card>
    <v-row>
           <item-stylist v-if="show == true" :stylist="stylist" @updateStylist="add = $event" :update="update" />
    </v-row>
</v-col>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue'),
        'item-stylist': () => import('@/components/manager/stylist/ItemStylist.vue')
    },
    data()
    {
        return {
            headers: [
                {text: 'AVATAR STYLIST', value: 'URL_STYLIST', sortable: false},
                {text: 'HỌ VÀ TÊN', value: 'NAME_STYLIST', sortable: true},
                {text: 'NGÀY TẠO', value: 'CREATED_AT', sortable: true},
                {text: 'TÁC VỤ', value: 'ACTION', sortable: false, align: 'center'},
            ],
            stylist: {},
            stylists: [],
            add: false,
            show: false,
            update: false
        }
    },
    watch:
    {
        add(newVal){
            if(newVal == true)
            {
                this.ApiGetStylist()
                this.stylist = {}
                this.add = false
            }
        }
    },
    computed:{
        ...mapGetters(["PUBLIC_URL", "BASE_URL"])
    },
    methods: {
        addStylist()
        {
            this.show = true
            this.stylist = {}
            this.update = false
        },
        ApiGetStylist()
        {
            this.$http.get(this.BASE_URL + 'stylist').then((response) => {
                this.stylists = response.data
            })
        },
        updateItemStylist(item){
            this.stylist = {}
            this.stylist = item
            this.update = true
            this.show = true
        }
       
    },
    created()
    {
        this.ApiGetStylist()
    },
    
}
</script>
<style scoped>
.group-avatar {text-align: center}
.btn-form-stylist {padding: 7px 15px;border: 1px solid #e2e2e2; border-radius: 5px;}
.avatar {position: relative;border: 1px solid #e2e2e2;}
.input-add-avatar {position: absolute;width: 100%;height: 100%;top: 0;left: 0;opacity: 0;}

</style>
