<template>
    <v-row>
        <v-col cols="12" sm="5">
            <v-text-field
                name="NAME_ANSWER"
                label="TRẢ LỜI"
                append-icon="mdi-check"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ["question"],
    data(){
        return {
            answers: []
        }
    },
    created()
    {
        this.$http.get(this.$store.state.API_URL + 'answer?UUID_QUESTION='+this.question.UUID_QUESTION)
    }
}
</script>