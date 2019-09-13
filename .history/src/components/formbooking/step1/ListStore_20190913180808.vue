<template>
<div>
    <div class="header-form">
    <v-icon>mdi-map-marker</v-icon> CHỌN TỈNH / THÀNH PHỐ
    </div>
    <v-row>
        <v-alert :type="message.type" v-if="message.text != null" :value="true">
            {{message.text}}
        </v-alert>
        <v-col cols="12" sm="12" md="6">
            <v-select
                :items="province"
                item-text="NAME_PROVICE"
                item-value="UUID_PROVINCE"
                v-model="checkProvince"
                @change="ApiGetCountry()"
                label="TỈNH / THÀNH PHỐ"
            ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="6" >
            <v-select
                :items="country"
                item-text="NAME_COUNTRY"
                item-value="UUID_COUNTRY"
                v-model="checkCountry"
                @change="choseCountry()"
                label="QUẬN / HUYỆN"
            ></v-select>
        </v-col>
        <v-list row id="list-item">
            <item-store  v-for="(item,i) in stores" :key="i" :index="index"  :item="item" @selectedStore="stored = $event" @activeClass="index = $event"/>
        </v-list>
    </v-row>
    <div class="group-btn">
        <v-layout row>
            <v-flex xs12 sm6 class="btn">
                <v-btn class="btn-booking"> <v-icon>mdi-chevron-left</v-icon> Quay Lại</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="btn">
                <v-btn class="btn-booking" color="primary" @click="NextStep()">Tiếp Tục <v-icon>mdi-chevron-right</v-icon></v-btn>
            </v-flex>
        </v-layout>
    </div>
</div>
</template>
<script>
export default {
    components:{
        'item-store': () => import('@/components/formbooking/step1/ItemStore.vue')
    },
    data()
    {
        return {
            province: [],
            country: [],
            checkProvince: null,
            checkCountry: null,
            stores: [],
            index: null,
            stored: null,
            message: {
                type: null,
                text: null
            }
        }
    },
    methods:{
        ApiGetProvince(){     
            this.$http.get(this.$store.state.API_URL + "province").then((response) => {
                this.province = response.data
            })
        },
        ApiGetStore()
        {
            this.$http.get(this.$store.state.API_URL + "store")
            .then((response) => {
                this.stores = response.data
            })
        },
        ApiFilterStore(filter,value)
        {
            this.$http.get(this.$store.state.API_URL + "store?filter="+filter+"&value="+value)
            .then((response) => {
                this.stores = response.data
            })
        },
        ApiGetCountry()
        {   
            this.ApiFilterStore('UUID_PROVINCE',this.checkProvince)
           this.$http.get(this.$store.state.API_URL + 'country/'+this.checkProvince+'?type=UUID_PROVINCE')
           .then((response) => {
               this.country = response.data
           })
        },
        NextStep()
        {
            if(this.stored != null)
            {
                this.$http.post(this.$store.state.API_URL + 'booking/update',{
                UUID_STORE: this.stored.UUID_STORE,
                ACTION_BOOKING: 2,
                NOTE_BOOKING: 'Khách hàng chọn tới bước 2 và chọn chi nhánh '+ this.stored.NAME_STORE
                }).then(() => {
                    this.$emit("updateStep",2)
                })
            }   
            else
            {
                this.message.type = 'warning'
                this.message.text = 'Bạn chưa chọn chi nhánh!'
            }
        }
    },
    created()
    {
        this.ApiGetProvince()
        this.ApiGetStore()
    }
}
</script>
<style scoped>
.pd0 {margin: 0 !important}

</style>