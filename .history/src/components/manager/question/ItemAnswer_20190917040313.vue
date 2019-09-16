<template>
    <div>
        <v-col cols="12" sm="5">
            <v-text-field
                name="NAME_ANSWER"
                label="TRẢ LỜI"
                value=""
                append-icon="mdi-check"
            ></v-text-field>
        </v-col>
    </div>
        
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