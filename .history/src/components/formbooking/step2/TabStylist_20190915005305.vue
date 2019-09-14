<template>
<v-slide-group
    
    class="pa-4"
    active-class="success"
    show-arrows
    v-model="checkStylist"
    >
    <v-slide-item
        v-for="(stylist,i) in stylists"
        :key="i"
        :value="stylist.UUID_STYLIST"
        v-slot:default="{ active, toggle }"
    >
        <div class="item-stylist"> 
            <v-card
            class="ma-2 avtar-stlylist"
            height="90"
            width="90"
            @click="toggle ">
                <img :src="$store.state.PUBLIC_URL + stylist.URL_STYLIST" />
            </v-card>
            <span>{{stylist.NAME_STYLIST}}</span>
        </div>
    </v-slide-item>
</v-slide-group>
</template>

<script>
export default {
    props: ["tab_service"],
    data(){
        return {
            stylists: [],
            checkStylist: ""
        }
    },
    watch: {
        checkStylist(newVal)
        {
            this.$emit("chckedStylist",newVal)
        }
    },
    methods: 
    {
       ApiGetStylist()
       {
           this.$http.get(this.$store.state.API_URL + 'stylist').then((response) => {
               this.stylists = response.data
           })
       }
    },
    created()
    {
        this.ApiGetStylist()
    }
}
</script>

<style scoped>
.item-stylist {background: transparent !important;text-align: center;position: relative;margin: 7px;}
.item-stylist.success::after{content: '';position: absolute;width: 23px;height: 23px;background-image:url('https://image.shutterstock.com/image-vector/green-check-mark-icon-box-260nw-536858419.jpg');top: 0;left:0;background-size:cover; }
.item-stylist span {text-transform: uppercase}
.avtar-stlylist {border-radius: 50%; margin: 8px auto !important;}
.avtar-stlylist:focus {border:none}
.avtar-stlylist img{border-radius: 50%;width: 100%;height: 100%;}
</style>