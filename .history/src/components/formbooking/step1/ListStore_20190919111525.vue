<template>
<div>
    <div class="header-form">
    
    </div>
    <v-row>
        <v-col cols="12" sm="12">
            <v-alert :type="message.type" v-if="message.text != null" :value="true">
            {{message.text}}
        </v-alert>
        <v-icon>mdi-map-marker</v-icon> CHỌN TỈNH / THÀNH PHỐ
        </v-col>
        <v-col cols="12" xs="6" sm="6" md="6">
            <v-select
                :items="province"
                item-text="NAME_PROVICE"
                item-value="UUID_PROVINCE"
                v-model="checkProvince"
                @change="ApiGetCountry()"
                label="TỈNH / THÀNH PHỐ"
            ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="6" >
            <v-select
                :items="country"
                item-text="NAME_COUNTRY"
                item-value="UUID_COUNTRY"
                v-model="checkCountry"
                @change="choseCountry()"
                label="QUẬN / HUYỆN"
            ></v-select>
        </v-col>
        <v-list class="row" id="list-item">
            <item-store  v-for="(item,i) in stores" :key="i" :index="index"  :item="item" @activeClass="index = $event"/>
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
            stores_tmp: [],
            index: null,
            message: {
                type: null,
                text: null
            },
            booking: {}
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
            const header = {
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'GET',
                'Access-Control-Allow-Headers':'application/json',
            }
            this.$http.get(this.$store.state.API_URL + "store",header)
            .then((response) => {
                this.stores = response.data
            })
        },
        ApiGetCountry()
        {   
           this.stores = this.stores_tmp
           this.stores.filter((value,index,array) => {
               return array[index].UUID_PROVINCE == this.checkProvince
           })
           this.$http.get(this.$store.state.API_URL + 'country/'+this.checkProvince+'?type=UUID_PROVINCE')
           .then((response) => {
               this.country = response.data
           })
        },
        GetInfoBooking()
        {   
            this.$http.get(this.$store.state.API_URL + 'booking/'+this.$route.params.phone).then((response) => {
                
                this.booking = response.data
            })
        },
        NextStep()
        {
            if(this.index != null)
            {
                // const data = {
                //     UUID_STORE: this.index.UUID_STORE,
                //     ACTION_BOOKING: 2,
                //     NOTE_BOOKING: 'Khách hàng chọn tới bước 2 và chọn chi nhánh '+ this.index.NAME_STORE,
                //     UUID_BOOKING: this.booking.UUID_BOOKING
                // }

                 const data = new FormData()
                data.append("UUID_BOOKING",this.booking.UUID_BOOKING)
                data.append("UUID_STORE",this.index.UUID_STORE)
                data.append("NOTE_BOOKING",'Khách hàng chọn tới bước 2 và chọn chi nhánh '+ this.index.NAME_STORE)
                data.append("ACTION_BOOKING",2)

                this.$http.post(this.$store.state.API_URL + 'booking/update',data).then(() => {
                    // console.log(response.data)
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
        this.GetInfoBooking()
    }
}
</script>
<style scoped>
.pd0 {margin: 0 !important}
#list-item {width: 100%;}
</style>