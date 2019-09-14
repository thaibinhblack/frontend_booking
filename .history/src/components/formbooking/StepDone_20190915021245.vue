<template>
<div v-if="step == 3">
        <v-row>
            <v-col md="12" class="image-done">
                <img src="https://30shine.com/images/ok.png" />
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
                    :value="infoBooking.NAME_STORE"
                    class="input-done"
                    
                ></v-text-field>
                 <v-text-field
                    v-if="infoStore.UUID_STYLIST != null"
                    name="stylist"
                    label="STYLIST"
                    v-model="getStylist.name"
                    prepend-icon="mdi-account-card-details"
                    class="input-done"
                    
                ></v-text-field>
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
    
    
</template>

<script>
export default {
    props: ["step"],
    watch:{
        step(newVal)
        {
            if(newVal == 3)
            {
                this.getInfoBookingByPhone()
                
            }
        },
        infoStore()
        {
            this.ApiSendMail()
        }
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
            this.$http.get(this.$store.state.API_URL + 'booking/'+ this.$route.params.phone).
            then( (response) => {
                console.log(response.data)
                this.infoBooking = response.data
                this.InffoService()
            })
        },
        InffoService()
        {
            this.$http.get(this.$store.state.API_URL+'detail-service/'+this.infoBooking.UUID_BOOKING).then((response) => {
                this.services = response.data
            })
        },
        deleteBooking()
        {
            this.$http.post(this.$store.state.API_URL+'booking/'+this.infoBooking.UUID_BOOKING+'/update',{
                type: 'delete'
            })
            .then((response) => {
                this.$router.push('/')
            })
        },
        PrveBooking()
        {
            this.$http.delete(this.$store.state.API_URL +'detail-service/'+this.infoBooking.UUID_BOOKING)
            .then((response) => {
                console.log(response.data)
                this.commitStep(1)
            })
        },
        ApiSendMail()
        {
            // this.$http.get(this.$store.state.API_URL + 'booking?phone='+this.$route.params.phone).then((response ) => {
            //     const email = {
            //         NAME_BOOKING: response.data.NAME_BOOKING,
            //         PHONE_BOOKING: response.data.PHONE_BOOKING,
            //         TIME_BOOK: response.data.TIME_BOOK,
            //         DATE_BOOK: response.data.DATE_BOOK,
            //         CREATED_AT: response.data.CREATED_AT,
            //         EMAIL_SEND: ''
            //     }
            //     this.$http.get(this.$store.state.API_URL + 'user?UUID_COUNTRY='+this.infoStore.UUID_COUNTRY).then((response) => {
            //         email.EMAIL_SEND = response.data.EMAIL
            //         console.log(email)
            //         this.$http.post(this.$store.state.API_URL + 'email',email)
            //     })
            // })
        }
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