<template>
<v-col cols="12" sm="6" md="4">
    <v-text-field
        name="ROOM"
        label="TÊN PHÒNG"
        v-model="room.NAME_ROOM"
        :append-icon="iconRoom"
        :success-messages="message"
        prepend-icon="mdi-scale-bathroom"
        @click:append="updateRoom()"
    ></v-text-field>
</v-col>
</template>

<script>

export default {
    props: ["room"],
    data()
    {
        return {
            disable: true,
            iconRoom: 'mdi-update',
            message: ''
        }
    },
    methods: {
        updateRoom()
        {   if(this.iconRoom == 'mdi-update')
            {
                this.iconRoom = 'mdi-check'
                this.disable = false
                this.$http.put(this.$store.state.API_URL + 'room',this.room)
                .then(() => {
                    this.disable = true
                    this.iconRoom = 'mdi-update'
                    this.message = 'Cập nhật thành công'
                })
            }
            
        }
    }
}
</script>