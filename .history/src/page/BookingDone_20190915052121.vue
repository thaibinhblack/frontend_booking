<template>
<div id="wrap-main">
    <div class="layout-main form-booking">
        <v-row>
            <v-col md="12" class="image-done">
                <img src="@/assets/bg/ok.png" />
            </v-col>
            <v-col md="12" class="image-done">
                <h3>Bạn vừa đặt lịch vào lúc {{infoBooking.TIME_BOOK}} giờ, ngày {{infoBooking.DATE_BOOK}}</h3>
                <small>Chúng tôi xin chân thành cảm ơn quý khách đã tin tưởng và ủng hộ dịch vụ của chúng tôi!</small>
            </v-col>
        </v-row>
        <div class="group-btn">
            <v-row>
                
                <v-col xs="12" sm="6"  class="btn">
                    <v-btn class="btn-booking" color="success" @click="PrveBooking()"> <v-icon>mdi-update</v-icon> Đặt lịch lại</v-btn>
                </v-col>
                <v-col xs="12" sm="6"  class="btn">
                    <v-btn class="btn-booking" color="warning" @click="deleteBooking()"><v-icon>mdi-delete</v-icon> Hủy đặt đặt lịch</v-btn>
                </v-col>
            </v-row>
        </div>
        <v-row>
            <v-col xs="12" sm="12">
                <span style="color:#333;"> <v-icon>mdi-account-check</v-icon> THÔNG TIN CỦA QUÝ KHÁCH</span>
            </v-col>
            <v-col xs="12" sm="6">
                <v-text-field
                    name="phone"
                    label="Số điện thoại"
                    :value="infoBooking.PHONE_BOOKING"
                    prepend-icon="mdi-phone"
                    class="input-done"
                ></v-text-field>
                 <v-text-field
                    name="phone"
                    label="HỌ VÀ TÊN KHÁCH HÀNG"
                    :value="infoBooking.NAME_BOOKING"
                    prepend-icon="mdi-account"
                    class="input-done"
                ></v-text-field>
                 <v-text-field
                    name="phone"
                    label="EMAIL KHÁCH HÀNG"
                    :value="infoBooking.EMAIL_BOOKING"
                    prepend-icon="mdi-email"
                    class="input-done"
                ></v-text-field>
                <v-text-field
                    name="store"
                    label="CHI NHÁNH"
                    prepend-icon="mdi-store"
                    :value="infoStore.NAME_STORE"
                    class="input-done"
                    
                ></v-text-field>
                 <!-- <v-text-field
                    v-if="infoBooking.UUID_STYLIST != null"
                    name="stylist"
                    label="STYLIST"
                    v-model="infoBooking.infoBooking"
                    prepend-icon="mdi-account-card-details"
                    class="input-done"
                    
                ></v-text-field> -->
            </v-col>
            <v-col xs="12" sm="6">
                <v-text-field
                    v-for="(service,i) in services"
                    :key="i"
                    name="service"
                    label="DỊCH VỤ"
                    prepend-icon="mdi-face-agent"
                    :value="service.NAME_SERVICE"
                    class="input-done"
                    
                ></v-text-field>
                <v-text-field
                    v-if="infoBooking.CODE != null"
                    name="code"
                    label="MÃ KHUYẾN MÃI"
                    v-model="infoBooking.CODE"
                    prepend-icon="mdi-gift-outline"
                    class="input-done"
                    
                ></v-text-field>
               
            </v-col>
            
        </v-row>
    </div>
    <form-question  :dialog="dialog"/>
</div>
    
    
</template>

<script>
export default {
    components:{
        'form-question': () => import('@/components/formbooking/stepdone/ForrmQuestion.vue')
    },
    data()
    {
        return {
            infoBooking: {},
            infoStore: {},
            services: [],
            overlay: false
        }
    },
    methods: 
    {
        getInfoBookingByPhone()
        {
            this.$http.get(this.$store.state.API_URL + 'booking/'+ this.$route.params.phone+'?type=done').
            then( (response) => {
              
                this.infoBooking = response.data
                this.InfoService()
                this.ApiInfoStore(response.data.UUID_ROOM)
                
            })
        },
        ApiInfoStore(UUID_ROOM)
        {
            this.$http.get(this.$store.state.API_URL + 'room/'+UUID_ROOM+'?store=1').
            then((response) => {
                // console.log(response.data)
                this.infoStore = response.data
            
            })
        },
        InfoService()
        {
            this.$http.get(this.$store.state.API_URL+'detail-service/'+this.infoBooking.UUID_BOOKING).then((response) => {
                this.services = response.data
            })
        },
        deleteBooking()
        {
            const data = new FormData()
            data.append("UUID_BOOKING",this.infoBooking.UUID_BOOKING)
            data.append("CHECK_BOOKING",2)
            data.append("NOTE_BOOKING", "Khách hàng đã hủy đặt lịch!")
            this.$http.post(this.$store.state.API_URL+'booking/update',data)
            .then(() => {
                this.$router.push('/')
            })
        },
        PrveBooking()
        {
             const data = new FormData()
            data.append("UUID_BOOKING",this.infoBooking.UUID_BOOKING)
            data.append("CHECK_BOOKING",2)
            data.append("NOTE_BOOKING", "Khách hàng đã đặt lịch lại!")
            this.$http.post(this.$store.state.API_URL+'booking/update',data)
            .then(() => {
                this.$router.push('/')
            })
        },
    },
    created()
    {
        this.getInfoBookingByPhone()
    }
}
</script>

<style scoped>
.image-done{text-align: center}
.image-done img {width: 50%;}
.input-done label, .input-done input {color: #333 !important}
.avatar {width: 60px;height: 60px;border-radius: 50%;;}
.item-stylist {text-align: center}
</style>