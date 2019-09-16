<template> 
    <div class="col-sm-12">
        <header-manager :title="'THÊM CHI NHÁNH MỚI'" :link="'Thêm mới chi nhánh'"  :store="true" :add="add"/>
       
        <v-card id="add-store" :class="{active : add}">
            <form v-on:submit.prevent="addStore()">
                <v-row>
                    <v-col sm="6">
                        <v-text-field
                            name="name_store"
                            label="Tên Chi Nhánh"
                            prepend-icon="mdi-store"
                            :counter="30"
                            required
                            v-model="store.NAME_STORE"
                        ></v-text-field>
                        <v-text-field
                            name="phone"
                            label="Số điện thoại"
                            prepend-icon="mdi-phone"
                            :counter="10"
                            required
                            v-model="store.PHONE_STORE"
                        ></v-text-field>
                        <v-text-field
                            name="room"
                            label="Số lượng phòng"
                            type="number"
                            min="1"
                            prepend-icon="mdi-home"
                            required
                            v-model="store.NUMBER_ROOM"
                        ></v-text-field>
                    </v-col>
                    <v-col sm="6">
                        <v-select
                            :items="provinces"
                            item-value="UUID_PROVINCE"
                            item-text="NAME_PROVICE"
                            label="THÀNH PHỐ"
                            v-model="selectedProvince"
                            @change="FilterCountry()"
                            required
                            prepend-icon="mdi-map-marker"
                        ></v-select>
                        <v-select
                            :items="country"
                            item-value="UUID_COUNTRY"
                            item-text="NAME_COUNTRY"
                            label="QUẬN / HUYỆN"
                            v-model="store.UUID_COUNTRY"
                            required
                            prepend-icon="mdi-map-marker"
                        ></v-select>
                        <v-text-field
                            name="address"
                            label="ĐỊA CHỈ"
                            prepend-icon="mdi-map-marker"
                            required
                            v-model="store.ADDRESS_STORE"
                        ></v-text-field>
                        <v-btn color="primary" type="submit" style="float:right">Thêm</v-btn>
                    </v-col>
                </v-row>
            </form>
        </v-card>
       <h3 style="margin-top: 15px;">THÊM DANH SÁCH PHÒNG</h3>
        <v-card v-if="add == true" style="margin: 15px 0;">
            <v-row style="padding: 15px;">
                <add-room v-for="i in parseInt(store.NUMBER_ROOM)" :key="i" :UUID_STORE="store.UUID_STORE"/>
                <v-col cols="12" sm="12">
                    <button class="btn btn-add"><v-icon>mdi-update</v-icon> Clear</button>
                </v-col>
            </v-row>
        </v-card>
        
        <form-map :dialog="dialog" @closeDialog="dialog = $event" />
    </div>
</template>

<script>
import uuid from 'uuid'
import { mapActions, mapGetters } from 'vuex';
import { async } from 'q';
export default {
    data()
    {
        return{
            provinces: [],
            selectedProvince: 1,
            country: [
                {id: 1, name: 'Quận 1'}
            ],
            selectedCountry: 1,
            store: {
                UUID_STORE: uuid.v4(),
                NUMBER_ROOM: 1
            },
            dialog: false,
            data: [],
            add: false
        }
    },
    methods:{
        ...mapActions(["commitMessage"]),
        addStore(){
            console.log(this.store)
            this.$http.post(this.$store.state.API_URL + "store",this.store)
            .then((response) => {
                this.add = true
                this.commitMessage({type: 'success',text: 'Thêm chi nhánh mới thành công!'})
            }).catch((error) => {
                this.commitMessage({type: 'error',text: 'Lỗi! Xin vui lòng thử lại!'})
            })
            // this.addRoom()
            // console.log(this.store)
        },
        ApiGetProvince()
        {
            this.$http.get(this.$store.state.API_URL + "province").then((response) => {
                this.provinces = response.data
                this.selectedProvince= response.data[0].UUID_PROVINCE
                this.FilterCountry()
            }).catch((eror) => {

            })
        },
        FilterCountry()
        {
            this.$http.get(this.$store.state.API_URL + 'country/'+this.selectedProvince+'?type=UUID_PROVINCE')
            .then((response) => {
                this.country = response.data
            })
        }
        
    },
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager'),
        'form-map': () => import('@/components/dialog/FormMap.vue'),
        'add-room': () => import('@/components/manager/store/addRoomStore.vue')
    },
    created() {
        this.ApiGetProvince()
    }
}
</script>

<style scoped>
#add-store {padding: 50px;}
#add-store.active::before {content: '';position: absolute;top: 0;left: 0; width: 100%;height: 100%;background: #e2e2e25c;z-index: 999;}
</style>