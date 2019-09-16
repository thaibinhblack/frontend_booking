<template>
        <v-row>
            <v-col cols="12" sm="8">
                <v-text-field
                    name="NAME_ANSWER"
                    label="TRẢ LỜI"
                    v-model="answer.NAME_ANWSER"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
                <button><v-icon>mdi-update</v-icon></button>
                <button><v-icon>mdi-delete</v-icon></button>
            </v-col>
        </v-row>
</template>

<script>
export default {
    props: ["question","answer"],
}
</script>