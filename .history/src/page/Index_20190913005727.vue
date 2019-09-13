<template>
<div id="wrap-main">
    <header-top />
    <div class="check-booking layout-main">
       <v-alert :type="message.type" v-if="message.text != null">
            {{message.text}}
        </v-alert>
        <div class="layout-check row">
            <div class="col-md-12">
                <v-text-field
                name="phone"
                label="Số điện thoại đăng ký"
                placeholder="Nhập số điện thoại"
                v-model="booking.PHONE_BOOKING"
                prepend-icon="mdi-phone"
                :hint="'Nhập số điện thoại để kiểm tra đăng ký'"
                :counter="10"
                :rules="rulePhone"
                ></v-text-field>
            </div>
            <div class="col-md-7 col-sm-12">
                <button class="btn-booking" @click="ApiCreateBooking()" style="width:100%">
                    <h4>ĐẶT LỊCH GIỮ CHỖ NGAY! </h4>
                    <small>Hoặc liên hệ ngay: 0947164024</small>
                </button>
            </div>
            <div class="col-md-5 col-sm-12">
                <button class="btn-check" @click="check()">KIỂM TRA ĐẶT LỊCH</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import uuid from 'uuid'
export default {
    components: {
        'header-top': () => import('@/components/toolbar/HeaderTop.vue')
    },
    data()
    {
        return {
           booking: {
                PHONE_BOOKING: '',
                ACTION_BOOKING: 1,
                NOTE_BOOKING: 'Khách hàng đã nhập số điện thoại đăng ký'
            },
            message: {
                text: null,
                type: null
            },
            rulePhone: [
                v => /((09|03|07|08|05|01)+([0-9]{8})\b)/.test(v) || 'Đây không phải là số điện thoại',
            ],
        }
    },
    methods:{
        createBooking()
        {
            this.$http.get(this.$store.state.API_URL + 'booking?phone='+this.booking.PHONE_BOOKING)
            .then((response) => {
                if(response.data == false)
                {
                    this.message.type = 'warning'
                    this.message.text = 'Số điện thoại này đã được đăng ký!'
                }
                else
                {
                    this.ApiCreateBooking()
                }
            })
        },
        ApiCreateBooking()
        {
            this.booking.UUID_BOOKING = uuid.v4()
            const data = new FormData()
            data.append("UUID_BOOKING",this.booking.UUID_BOOKING)
            data.append("PHONE_BOOKING",this.booking.PHONE_BOOKING)
            data.append("NOTE_BOOKING",this.booking.NOTE_BOOKING)
            data.append("ACTION_BOOKING",this.booking.ACTION_BOOKING)
            console.log(this.booking)
            this.axios.post(this.$store.state.API_URL + 'booking',data,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            .then((response) => {
                this.$router.push('/booking')
            }).catch((error) => {
                console.log(error)
                this.message.type = 'error'
                this.message.text = 'Lôi! xin vui lòng thử lại!'
            })
        }
    }
}
</script>

<style lang="css">
a {text-decoration: none;color: #fff !important;}
.layout-check {margin: 0 !important}
.pd10 {padding: 10px;}
.btn-booking {text-align: center;border: 1px solid #e2e2e2;border-radius: 5px;background-color: #212121;color: #fff;padding: 15px;cursor: pointer;}
.btn-check {padding: 15px !important;height: 68px;background:#eee ;outline: none;height: 100%;width: 100%;}
</style>