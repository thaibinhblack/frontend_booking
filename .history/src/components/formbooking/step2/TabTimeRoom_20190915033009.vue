<template>
    <v-list class="list-time row">
        <v-list-item v-for="(time,i) in times" :key="i" class="col-xs-4 col-sm-3 col-md-2 item-time">
            <v-list-item-content class="content-time" :class="{active: time.slot}" @click="booking(time)">
                <v-list-item-title class="title-time" > 
                    {{time.time}}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{time.slot == false ? 'Chưa đặt phòng' : 'Đã đặt phòng' }} 
                </v-list-item-subtitle>
            </v-list-item-content>
            
        </v-list-item>
        
    </v-list>
</template>

<script>
import moment from 'moment'
export default {
props: ["tab", "id", "date", "tab_room"],
  data()
  {
      return {
        times: [
                {time: '8:00', slot: false, value: 8},
                {time: '9:00', slot: false, value: 9},
                {time: '10:00', slot: false, value: 10},
                {time: '11:00', slot: false, value: 11},
                {time: '12:00', slot: false, value: 12},
                {time: '13:00', slot: false, value: 13},
                {time: '14:00', slot: false, value: 14},
                {time: '15:00', slot: false, value: 15},
                {time: '16:00', slot: false, value: 16},
                {time: '17:00', slot: false, value: 17},
                {time: '18:00', slot: false, value: 18},
                {time: '19:00', slot: false, value: 19},
                {time: '20:00', slot: false, value: 20},
                {time: '21:00', slot: false, value: 21}
            ],
        time_tmp: null,
        date_local: null
      }
  },
  watch:{
      tab_room(newVal)
      {
          if(newVal == this.tab)
          {
              this.times = [{time: '8:00', slot: false, value: 8},
                {time: '9:00', slot: false, value: 9},
                {time: '10:00', slot: false, value: 10},
                {time: '11:00', slot: false, value: 11},
                {time: '12:00', slot: false, value: 12},
                {time: '13:00', slot: false, value: 13},
                {time: '14:00', slot: false, value: 14},
                {time: '15:00', slot: false, value: 15},
                {time: '16:00', slot: false, value: 16},
                {time: '17:00', slot: false, value: 17},
                {time: '18:00', slot: false, value: 18},
                {time: '19:00', slot: false, value: 19},
                {time: '20:00', slot: false, value: 20},
                {time: '21:00', slot: false, value: 21}]
              this.ApiGetDataRoom()
          }
      }
  },
  methods: {
      booking(time)
      {
          this.$emit("checkTime",time)
          if(time.slot != true)
          {
            if(this.time_tmp == null)
                {
                    this.times.filter((value,index,array) => {
                        if(array[index].value == time.value)
                        {
                            array[index].slot = true
                            this.time_tmp = time
                        }
                    })
                }
            else
            {
              if(this.time_tmp.value != time.value)
              {
                this.times.filter((value,index,array) => {
                    if(array[index].value == time.value)
                    {
                        array[index].slot = true 
                    }
                    if(array[index].value == this.time_tmp.value)
                    {
                        array[index].slot = false
                    }
                })
                this.time_tmp = time
                
              }

            }
            // this.commitTimeBooking(time)
            
            
        }
          
        },
        ApiGetDataRoom(uuid)
        {
            const date = this.$store.state.date
            const result = date.getFullYear() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getDate()
            // console.log(result)
            this.$http.get(this.$store.state.API_URL + "booking/"+this.id+'?date='+result)
                .then((response) => {
                     const now = new Date()
                     if(date.getDay() == now.getDay()){
                        
                        this.times.forEach((time) => {
                            if(time.value <= date.getHours())
                            {
                                time.slot = true
                            }
                        })
                     }
                    
                    //  console.log('get tody',this.getTodayRoom)
                    this.times.filter((value,index,array) => {
                        response.data.forEach(time => {
                        
                            if(array[index].value == parseInt(time.TIME_BOOK))
                            {
                                array[index].slot = true
                            }
                            
                            
                        })
                        // console.log('get tody',this.getTodayRoom)
                        if(this.getTodayRoom == true)
                            {
                                const date = new Date()
                                if(array[index].value <= date.getHours())
                                {
                                    array[index].slot = true
                                }
                            }
                    });
                } )
        },
    },

    created()
    {   
        this.ApiGetDataRoom(this.id)
       
    },
}
</script>