<template>
    <v-toolbar no-gutters dense height="60px" style="width:100%;height:60px;padding: 0 15px;">
            <v-app-bar-nav-icon @click="$emit('closeOpenSidebar',!classActive)"></v-app-bar-nav-icon>
            <!-- <v-toolbar-title>Title</v-toolbar-title> -->

            <div class="flex-grow-1"></div>

            <!-- <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn> -->

            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>

            <v-btn icon @click="logout()">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
            </v-toolbar>
</template>

<script>
export default {
    props: ["classActive"],
    methods:{
        logout()
        {
            this.$http.get(this.$store.state.API_URL + 'user/logout?api_token='+this.$session.get('token')).then(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>