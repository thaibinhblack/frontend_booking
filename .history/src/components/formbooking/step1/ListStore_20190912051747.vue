<template>
<div>
    <div class="header-form">
    <v-icon>mdi-map-marker</v-icon> CHỌN TỈNH / THÀNH PHỐ
    </div>
    <div class="row pd0">
        <div class="col-xs-12 col-sm-6 pd15">
            <v-select
                :items="province"
                item-text="NAME_PROVICE"
                item-value="UUID_PROVINCE"
                v-model="checkProvince"
                @change="ApiGetCountry()"
                label="TỈNH / THÀNH PHỐ"
            ></v-select>
        </div>
        <div class="col-xs-12 col-sm-6 pd15">
            <v-select
                :items="country"
                item-text="NAME_COUNTRY"
                item-value="UUID_COUNTRY"
                v-model="checkCountry"
                @change="choseCountry()"
                label="QUẬN / HUYỆN"
            ></v-select>
        </div>
        <v-list row id="list-item">
            <item-data  v-for="(item,i) in stores" :key="i" :index="index"  :item="item" @activeClass="activeClass"/>
        </v-list>
    </div>
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
    data()
    {
        return {
            province: [],
            country: [],
            checkProvince: null,
            checkCountry: null,
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
                this.salons = response.data
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
    },
    created()
    {
        this.ApiGetProvince()
    }
}
</script>
<style scoped>
.pd0 {margin: 0 !important}

</style>