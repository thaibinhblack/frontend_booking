<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent light hide-overlay  max-width="800px" style="z-index: 99999">
      <v-card light>
        <v-card-title>
          <span class="headline">Câu hỏi khảo sát </span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <item-question v-for="(question,i) in questions" :key="i" :check="i" @updateCheck="updateCheck" :question="question"/>
          </v-container>
        
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="$emit('updateDialog',false)">Close</v-btn>
          <v-btn color="blue darken-1" text @click="SubmitQuestion()">Xác Nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ["dialog","UUID_BOOKING"],
    components:
    {
         'item-question': () => import('@/components/formbooking/stepdone/ItemQuestion.vue'),
    },
    data: () => ({
      questions: [],
      check: []
    }),
    methods: {
        ApiGetQuestion()
        {
            this.$http.get(this.$store.state.API_URL + 'question')
            .then((response) => {
                this.questions = response.data
                // console.log(response.data)
            })
        },
        updateCheck(i,value)
        {
            this.check[i] = value
            // console.log(this.check)
        },
        SubmitQuestion()
        {
          // console.log(this.getUUID, this.check)
          const data = new FormData()
          console.log(this.UUID_BOOKING)
          data.append("UUID_BOOKING",this.UUID_BOOKING)
          data.append("UUID_ANWSER",this.check)
          this.$http.post(this.$store.state.API_URL + 'user-question', data).then((response) => {
            // console.log(response.data)
            const data = new FormData()
            data.append("NOTE_BOOKING", "Khách hàng đã trả lời phiếu khảo xác!")
            this.$http.post(this.$store.state.API_URL + 'booking/update',data)
            .then(() => {
              this.$emit('updateDialog',false)
            })
            
          })

        }
    },
    created()
    {
        this.ApiGetQuestion()
    }
  }
</script>

<style>
.row.item-question>div {padding: 0 !important}
</style>