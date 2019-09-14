<template>

        <div style="padding:15px;">
            <div class="list-service">
                <v-alert :type="message.type" :value="true" v-if="message.text != null">
                    {{message.text}}
                </v-alert>
                <v-tabs v-model="tab_service">
                    <v-tab>
                        DỊCH VỤ
                    </v-tab>
                    <v-tab>
                        STYLE LIST 
                    </v-tab>
                    <v-tab>
                        MÃ KHUYẾN MÃI
                    </v-tab>
                    <v-tab>
                        THÔNG TIN KHÁCH HÀNG
                    </v-tab>
                    <v-tab-item>
                        <tab-service :services="services" @updateCheckService="checkedService = $event" />
                    </v-tab-item>
                    <v-tab-item>
                        <tab-stylist :tab_service="tab_service" @chckedStylist="booking.UUID_STYLIST = $event"/>
                    </v-tab-item>
                    <v-tab-item>
                        <tab-code @checkCode="booking.CODE = $event"/>
                    </v-tab-item>
                    <v-tab-item>
                        <v-text-field
                            name="phone"
                            label="HỌ VÀ TÊN CỦA QUÝ KHÁCH"
                            v-model="booking.NAME_BOOKING"
                            prepend-icon="mdi-account"
                            ></v-text-field>
                        <v-text-field
                            name="phone"
                            label="EMAIL CỦA QUÝ KHÁCH"
                            v-model="booking.EMAIL_BOOKING"
                            :counter="50"
                            :rules="ruleEmail"
                            prepend-icon="mdi-email"
                        ></v-text-field>
                    </v-tab-item>
                </v-tabs>
                
            </div>
            <div class="check-time">
            <v-tabs v-model="tabs">
                <v-tab class="item-tab"><h4 style="width:100%;">CHỦ NHẬT</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 2</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 3</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 4</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 5</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 6</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 7</h4></v-tab>
                    
                    <v-tab-item v-for="i in 7" :key="i">
                        <tab-time :rooms="rooms" :tabs="tabs" :tab="i-1" @checkRoom="booking.UUID_ROOM = $event" @checkedTime="booking.TIME_BOOK = $event" @checkDate="booking.DATE_BOOK = $event"/>
                    </v-tab-item>
                    
                    
                    
                </v-tabs>
                
            
            </div> 
            <div class="group-btn">
                
                <v-layout row>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking"  @click="$emit('updateStep',1)"> <v-icon>mdi-chevron-left</v-icon> Quay Lại</v-btn>
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
    props: ["step"],
    components: {
        'tab-service': () => import('@/components/formbooking/step2/TabService.vue'),
        'tab-time': () => import('@/components/formbooking/step2/TabTime.vue'),
        'tab-stylist': () => import('@/components/formbooking/step2/TabStylist.vue'),
        'tab-code': () => import('@/components/formbooking/step2/TabCode.vue'),
    },
    data()
    {
        return {
            message: {
                type: null,
                text: null
            },
            tabs: new Date().getDay(),
            booking: {},
            CODE: null,
            ruleEmail: [
            v => !!v || 'Bạn chưa nhập Email',
            v => /.+@.+\..+/.test(v) || 'Đây không phải là email!',
            ],
            services: [],
            checkedService: [],
            rooms: [],
            checkedRoom: null,
            tab_service: 0,
        }
    },
    watch:{
        step(newVal)
        {
            if(newVal == 2)
            {
                this.ApiGetService()
                this.ApiGetBooking()
            }
            else
            {
                this.services = []
            }
        }
    },
    methods:
    {
        ApiGetService()
        {
            this.$http.get(this.$store.state.API_URL + 'service')
            .then((response) => {
                this.services = response.data
            })
        },
        ApiGetBooking()
        {
            this.$http.get(this.$store.state.API_URL + 'booking/'+this.$route.params.phone)
            .then((response) => {
                this.booking = response.data
                // this.$store.BookingModule.state.booking = response.data
                this.$http.get(this.$store.state.API_URL + "room?type=UUID_STORE&value="+response.data.UUID_STORE).then((response) => {
                    this.rooms = response.data
                    this.booking.UUID_ROOM = response.data[0].UUID_ROOM
                    // console.log(response.data)
                })
            })
        },
        NextStep()
        {
            if(this.booking.NAME_BOOKING == null || this.booking.EMAIL_BOOKING == null || this.checkedService.length == 0 || this.booking.TIME_BOOK == null )
            {
                this.message.type = 'warning'
                if(this.booking.NAME_BOOKING == null && this.booking.EMAIL_BOOKING == null)
                {
                    this.message.text = 'Bạn chưa nhập đầy đủ thông tin các nhân!'
                }
                else if(this.checkedService.length == 0)
                {
                    this.message.text = 'Bạn chưa chọn dịch vụ nào?'
                }
                else
                {
                    this.message.text = 'Bạn vẫn chưa chọn lịch hẹn!'
                }
                
            }
            else
            {
                const data = new FormData()
                if(this.booking.DATE_BOOK == null)
                {
                    this.booking.DATE_BOOK = new Date()
                }
                data.append("UUID_BOOKING",this.booking.UUID_BOOKING)
                data.append("UUID_ROOM",this.booking.UUID_ROOM)
                data.append("EMAIL_BOOKING",this.booking.EMAIL_BOOKING)
                data.append("NAME_BOOKING",this.booking.NAME_BOOKING)
                data.append("DATE_BOOK",this.booking.DATE_BOOK.getFullYear()+'-'+this.booking.DATE_BOOK.getMonth()+-'-'+this.booking.DATE_BOOK.getDate())
                data.append("TIME_BOOK",this.booking.TIME_BOOK)
                data.append("ACTION_BOOKING", 3)
                data.append("NOTE_BOOKING", 'Khách hàng đã đăng ký tới bước 3')
                data.append("UUID_STYLIST",this.booking.UUID_STYLIST)
                data.append("CODE",this.booking.CODE)
                data.append("SERVICE",this.checkedService)
                this.$http.post(this.$store.state.API_URL + 'booking/update',data)
                .then(() => {
                    
                })
                this.$http.post(this.$store.state.API_URL + 'detail_service_booking',data).then(() => {
                        this.$emit("updateStep",3)
                    })
                
            }
            
        }
    }
}
</script>

<style scoped>
.item-tab {display: block;padding: 15px;text-align: center}

</style>