<template>
        <v-row>
            <v-col cols="12" sm="8">
                <v-text-field
                    name="NAME_ANSWER"
                    label="TRẢ LỜI"
                    v-model="answer.NAME_ANWSER"
                    :error="error"
                    :error-messages="message_error"
                    :success="success"
                    :success-messages="message_success"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" style="line-height:70px;">
                <button @click="updateAnswer(answer.UUID_ANSWER)"><v-icon>mdi-update</v-icon></button>
                <button style="margin-left:5px;"><v-icon>mdi-delete</v-icon></button>
            </v-col>
        </v-row>
</template>

<script>
export default {
    props: ["question","answer"],
    data() {
        return{
            error: false,
            message_error: '',
            success: false,
            message_success: ''
        }
    },
    methods: {
        updateAnswer(UUID_ANSWER)
        {
            const data = new FormData()
            data.append("NAME_ANWSER",this.answer.NAME_ANWSER)
            this.$http.post(this.$store.state.API_URL + 'answer/'+UUID_ANSWER+'/update?api_token='+this.$sesssion.get("token"),data).then(() => {
                this.success = true
                this.errror = false
                this.message_success = 'Cập nhật thành công'
                this.message_error = ''
            }).catch(() => {
                 this.success = false
                this.errror = true
                this.message_success = ''
                this.message_error = 'Cập nhật thất bại!'
            })
        }
    },
}
</script>