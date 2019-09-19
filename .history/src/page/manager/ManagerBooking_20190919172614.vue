<template>
    <div id="wrap-manager">
        <v-row class="layout-manager">         
            <nav-bar :classActive="classActive"/>
            <v-row class="layout-content">
                <tool-bar  @closeOpenSidebar="classActive = $event" :classActive="classActive"/>

                 <div class="pd15" style="width:100%;padding-top: 0 !importtant;">
                     <router-view></router-view>
                 </div>
                
            </v-row>
        </v-row>
    </div>
</template>

<script>
export default {
    components: {
        'nav-bar': () => import('@/components/NavSidebar.vue'),
        'tool-bar': () => import('@/components/manager/ToolBar.vue')
    },
    data()
    {
        return {
            classActive: true,

        }
    },
    created()
    {
        if(!this.$session.has('token'))
        {
            this.$router.push('/login')
        }
        else
        {
            if(this.$session.get('token') == '')
            {
                this.$router.push('/login')
            }
        }
    }

}
</script>

<style scoped>
#wrap-manager,.layout-manager {height: 100%;}
.layout-content {width: calc(100% - 250px);margin: 0 !important}
.pd15 {padding: 15px;}
.title-content h3{text-transform: uppercase}
</style>