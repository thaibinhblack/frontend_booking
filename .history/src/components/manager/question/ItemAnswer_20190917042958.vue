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
                <button @click="updateAnswer()"><v-icon>mdi-update</v-icon></button>
                <button style="margin-left:5px;"><v-icon>mdi-delete</v-icon></button>
            </v-col>
        </v-row>
</template>

<script>
export default {
    props: ["question","answer"],
    data() {
        return{
            errror: false,
            message_error: null,
            success: false,
            message_success: null
        }
    },
    methods: {
        updateAnswer()
        {
            const data = new FormData()
            data.append("NAME_ANWSER",this.answer.NAME_ANWSER)
            this.$http.post(this.$store.state.API_URL + 'answer/'+this.answer.UUID_ANSWER+'/update',data).then(() => {

            })
        }
    }
}
</script>