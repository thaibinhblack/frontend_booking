<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="650px">
        <v-card class="card-question">
            <v-form>
                <v-alert :type="message.type" v-if="message.text != null" :value="true" style="width: 100%">
                    {{message.text}}
                </v-alert>
                <v-card-title primary-title>
                    FORM CẬP NHẬT CÂU HỎI {{question.NAME_QUESTION}} 
                </v-card-title>
                <v-container>
                    <v-row>
                        <item-question v-for="i in numberQuestion" :key="i" />
                    </v-row>
                </v-container>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="$emit('closeDialog',false)">Close</v-btn>
                    <v-btn color="blue darken-1" text type="reset"  @click="numberQuestion = 0 ">Reset</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
        
    </v-dialog>
</template>

<script>
export default {
    props: ["dialog", "question"],
    data()
    {
        return {
            numberQuestion: 1,
            message: {
                type: null,
                text: null
            }
        }
    },
    components: {
        'item-question': () => import('@/components/dialog/ItemQuestion.vue')
    },
}
</script>

<style  scoped>
.card-question {padding: 25px;}
.btn-add-question {cursor: pointer;margin-left: 15px;padding: 5px;}
</style>