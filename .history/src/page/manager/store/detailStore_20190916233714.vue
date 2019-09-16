<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'THÔNG TIN CHI TIẾT CHI NHÁNH'" :link="store.NAME_STORE" />
        <v-card style="padding:25px;">
            <v-row>
                <v-col cols="12" sm="12">
                    <h4>THÔNG TIN CHI TIẾT CHI NHÁNH: {{store.NAME_STORE}}</h4>
                    <v-alert v-if="message.text != null" :type="message.type" :value="true">
                        {{message.text}}
                    </v-alert>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="NAME_STORE"
                        label="TÊN CHI NHÁNH"
                        prepend-icon="mdi-store"
                        v-model="store.NAME_STORE"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="NAME_STORE"
                        label="SỐ LƯỢNG PHÒNG"
                        prepend-icon="mdi-store"
                        v-model="store.NUMBER_ROOM"
                        disabled
                        type="number"
                    ></v-text-field>
                </v-col>
                 <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="NAME_STORE"
                        label="SỐ ĐIỆN THOẠI CHI NHÁNH"
                        prepend-icon="mdi-phone"
                        v-model="store.PHONE_STORE"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="province"
                        item-text="NAME_PROVICE"
                        item-value="UUID_PROVINCE"
                        v-model="store.UUID_PROVINCE"
                        prepend-icon="mdi-map-marker"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="country"
                        item-text="NAME_COUNTRY"
                        item-value="UUID_COUNTRY"
                        v-model="store.UUID_COUNTRY"
                        prepend-icon="mdi-map-marker"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="ADDRESS_STORE"
                        label="ĐỊA CHỈ CHI NHÁNH"
                        prepend-icon="mdi-map-marker"
                        v-model="store.ADDRESS_STORE"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <button @click="updateStore()"  class="btn-add-store"><v-icon>mdi-update</v-icon> Cập nhật</button>
                </v-col>
            </v-row>
        </v-card>
        <v-card style="margin-top:15px;padding:25px;">
            <v-row>
                <v-col cols="12" sm="6">
                    <h4>DANH SÁCH PHÒNG</h4>
                    <small v-if="rooms.length == 0 " style="color:red"> Hiện chi nhánh vẫn chưa có phòng nào</small>
                </v-col>
                <v-col cols="12" sm="6" style="text-align:right">
                    <button @click="show_new= !show_new" class="btn-add-store"><v-icon>mdi-plus</v-icon> Thêm mới</button>
                </v-col>
                <item-room v-for="(room,i) in rooms" :key="i" :room="room" />
                <v-col cols="12" sm="12" v-if="show_new == true">
                    <v-text-field
                        name="ROOM"
                        label="THÊM PHÒNG MỚI"
                        placeholder="Nhập tên phòng mới"
                        v-model="room_new.NAME_ROOM"
                        prepend-icon="mdi-scale-bathroom"
                        append-icon="mdi-check"
                        :counter="20"
                        :loading="loading_new"
                        :success-messages="message_new"
                        :success="success_new"
                        @click:append="ApiAddRoom()"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
</template>

<script>
import uuid from 'uuid'
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue'),
        'item-room': () => import('@/components/manager/store/ItemRoom.vue')
    },
    data()
    {
        return {
            store: {},
            province: [],
            country: [],
            rooms: [],
            room_new: {
               
            },
            message_new: '',
            success_new: false,
            show_new: false,
            loading_new: false,
            message: {type: null, text: null}
        }
    },
    methods: {
        ApiGetStore()
        {
            this.$http.get(this.$store.state.API_URL + 'store/'+this.$route.params.uuid).then((response) => {
                this.store = response.data
                this.ApiGetCountry(response.data.UUID_PROVINCE)
                this.ApiGetRoom(response.data.UUID_STORE)
            })
        },
        ApiGetProvince()
        {
            this.$http.get(this.$store.state.API_URL + 'province').then((response) => {
                this.province = response.data
            })
        },
        ApiGetCountry(UUID_PROVINCE)
        {
            this.$http.get(this.$store.state.API_URL + 'country/'+UUID_PROVINCE + "?type=UUID_PROVINCE")
            .then((response) => {
                this.country = response.data
            })
        },
        ApiGetRoom(UUID_STORE)
        {
            this.$http.get(this.$store.state.API_URL + 'room?type=UUID_STORE&value='+UUID_STORE)
            .then((response) => {
                this.rooms = response.data
            })
        },
        ApiAddRoom()
        {
            this.room_new.UUID_ROOM = uuid.v4()
            this.room_new.UUID_STORE = this.store.UUID_STORE
            this.loading_new = true
            // console.log(this.room_new)
            if(this.store.NUMBER_ROOM <= this.country.length)
            {
                
            }
            this.$http.post(this.$store.state.API_URL + 'room', this.room_new)
            .then(() => {
                this.ApiGetRoom(this.store.UUID_STORE)
                this.message_new = 'Thêm mới thành công!'
                this.success_new = true
                this.store.NUMBER_ROOM = parseInt(this.store.NUMBER_ROOM) + 1
                this.$http.put(this.$store.state.API_URL + 'store/'+this.store.UUID_STORE +'?update=NUMBER_ROOM&value='+(this.rooms.length + 1))
                .then(() => {
                    this.loading_new = false
                    this.room_new = {}
                })
                
            })
        },
        updateStore()
        {
            console.log(this.store)
            this.$http.put(this.$store.state.API_URL+ 'store/'+this.store.UUID_STORE, this.store)
            .then(() => {
                this.message.type ='success'
                this.message.text = 'Cập nhật thành công!'
            })
        }
    },
    created()
    {
        this.ApiGetStore()
        this.ApiGetProvince()
        
    }
}
</script>

<style scoped>
.btn-add-store {padding: 10px 15px;border:1px solid #e2e2e2;border-radius: 5px; color: #0082d0;background: #e6f3fa;border-color: #99cdec;outline: none}
.btn-add-store i {color:#0082d0}
.btn-add-store:hover,.btn-add-store:hover i {color: #fff;}
.btn-add-store:hover {background: #0082d0;}
</style>