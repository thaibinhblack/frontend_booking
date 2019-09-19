<template>
    <v-text-field
        style="margin-top: 15px;"
        name="country"
        label="QUẬN / HUYỆN"
        prepend-icon="mdi-map-marker"
        :error="error"
        :error-messages="message_error"
        :success="success"
        :success-messages="message_success"
        append-icon="mdi-update"
        v-model="item.NAME_COUNTRY"
        @click:append="updateCountry(item)"
    ></v-text-field>
</template>

<script>
export default {
    props: ["item"],
    data()
    {
        return {
            error: false,
            success: false,
            message_error: "",
            message_success: ""
        }
    },
    methods: {
        updateCountry(item){
            const data = new FormData()
            data.append("NAME_COUNTRY", item.NAME_COUNTRY)
            this.$http.post(this.$store.state.API_URL + "country/" +item.UUID_COUNTRY+"/update?api_token="+this.$session.get("token"),data).then(() => {
                this.success = true
                this.message_success = "Cập nhật thành công!"
                this.error = false
                this.message_error = ""
            }).catch((error) => {
                this.error = true
                this.message_error = "Lôi! xin vui lòng thử lại!"
                this.success = false
                this.message_success = ""
            })
        }
    }
}
</script>