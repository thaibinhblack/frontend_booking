<template>
  <v-card
    color="grey lighten-4"
    flat
    height="60px"
    tile
  >
    <v-toolbar extended extension-height="-3">

      <v-toolbar-title><router-link to="/">Booking</router-link></v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn icon @click="$router.push('/login')">
        <v-icon>mdi-login</v-icon>
      </v-btn>

    </v-toolbar>
  </v-card>
</template>