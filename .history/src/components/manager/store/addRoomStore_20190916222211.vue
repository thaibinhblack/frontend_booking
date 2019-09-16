<template>
    <v-col cols="12" sm="6">
        <v-text-field
            name="name_room"
            label="TÊN PHÒNG"
            append-icon="mdi-check"
            v-model="room.NAME_ROOM"
            :disabled="disabled"
            :error="room.error"
            :error-messages="room.message_error"
            :success="room.success"
            :success-messages="room.message_success"
            @click:append="addRoom()"
            required
        ></v-text-field>
    </v-col>
</template>

<script>
import uuid from 'uuid'
export default {
    props: ["UUID_STORE"],
    data()
    {
        return{
            room: {
                UUID_ROOM: uuid.v4(),
                UUID_STORE: this.UUID_STORE,
                NAME_ROOM: ''
            },
            disabled: false
        }
    },
    methods:
    {
         addRoom()
        {
            const data = new FormData()
            data.append("UUID_ROOM", this.room.UUID_ROOM)
            data.append("UUID_STORE",this.room.UUID_STORE)
            data.append("NAME_ROOM",this.room.NAME_ROOM)
            this.$http.post(this.$store.state.API_URL + "room",data)
            .then(() => {
                this.disabled = true
            })
            
        },
    }
}
</script>