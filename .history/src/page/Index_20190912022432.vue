<template>
<div id="wrap-main">
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
                <button class="btn-booking" @click="checkBooking()" style="width:100%">
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
export default {
    data()
    {
        return {
           booking: {
                PHONE_BOOKING: '',
                ACTION_BOOKING: 1
            },
            message: {
                text: null,
                type: null
            },
            rulePhone: [
                v => /((09|03|07|08|05|01)+([0-9]{8})\b)/.test(v) || 'Đây không phải là số điện thoại',
            ],
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