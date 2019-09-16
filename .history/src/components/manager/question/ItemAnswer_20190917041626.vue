<template>
        <v-row>
            <v-col cols="12" sm="8">
                <v-text-field
                    name="NAME_ANSWER"
                    label="TRẢ LỜI"
                    v-model="answer.NAME_ANSWER"
                    single-line
                ></v-text-field>
            </v-col>
        </v-row>
</template>

<script>
export default {
    props: ["question","answer"],
    data(){
        return {
            answers: []
        }
    },
    created()
    {
       
    }
}
</script>