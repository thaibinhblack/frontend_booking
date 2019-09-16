<template>
    <v-col cols="12" sm="12">
    <header-manager :title="'THÔNG TIN NHÂN VIÊN'" :link="user.EMAIL" :sublink="{name: 'Danh sách user', link: '/manager/users'}" />
    <v-card style="padding:25px;">
        <v-alert :type="message.type" v-if="message.text != null" :value="true">
            {{message.text}}
        </v-alert>
        <v-form @submit.prevent="updateUser()">
            <v-row >
                <v-col cols="12" sm="12" class="group-avatar">
                    
                        <v-avatar
                            size="180"
                            color="#e2e2e2"
                            class="avatar"
                        >
                        <!-- <input class="input-add-avatar" type="file" ref="MyAvatar" @change="renderAvatar()" required> -->
                            <img v-if="user.AVATAR != null && avatar == null" :src="PUBLIC_URL + user.AVATAR" alt="AVATAR" />
                            <img v-if="avatar != null"  :src="avatar" alt="AVATAR" />
                        </v-avatar>
                </v-col>
                 <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="email"
                        label="EMAIL"
                        disabled
                        prepend-icon="mdi-email"
                        placeholder="Nhập email cho người dùng"
                        v-model="user.EMAIL"
                        :counter="50"
                        required
                    ></v-text-field>
                </v-col>
                
                
               <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="username"
                        label="USERNAME"
                        
                        prepend-icon="mdi-account"
                        placeholder="Nhập tài khoản cho người dùng"
                        v-model="user.USERNAME"
                        required
                    ></v-text-field>
                    
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="phone"
                        label="SỐ ĐIỆN THOẠI"
                        prepend-icon="mdi-phone"
                        v-model="user.PHONE"
                        placeholder="Nhập số điện thoại người dùng"
                        :counter="10"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="dateFormatted"
                        label="Date"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-calendar-range"
                        @blur="date = parseDate(dateFormatted)"
                        required
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="gender"
                        item-value="value"
                        item-text="text"
                        label="GIỚI TÍNH"
                        prepend-icon="mdi-gender-male-female"
                        
                        v-model="user.GENDER"
                        required
                    ></v-select>
                </v-col>
                
                <v-col cols="12" sm="6" md="4">
                    
                    <v-select
                        :items="province"
                        item-value="UUID_PROVINCE"
                        item-text="NAME_PROVICE"
                        label="TỈNH / THÀNH PHỐ"
                        prepend-icon="mdi-map-marker"
                        v-model="user.UUID_PROVINCE"
                        required
                    ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="country"
                        item-value="UUID_COUNTRY"
                        item-text="NAME_COUNTRY"
                        label="QUẬN / HUYỆN"
                        prepend-icon="mdi-map-marker"
                        v-model="user.UUID_COUNTRY"
                        color="error"
                        required
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="rule"
                        item-value="UUID_RULE"
                        item-text="NAME_RULE"
                        label="QUYỀN"
                        prepend-icon="mdi-account-tie"
                        v-model="user.UUID_RULE"
                        required
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                   <v-btn color="primary" class="btn-add btn"> <v-icon>mdi-update</v-icon> Cập nhật</v-btn>
                    <v-btn @click="deleteUser(user.EMAIL)" color="warning" style="margin-left: 15px;" class="btn-add btn"><v-icon>mdi-delete</v-icon> Xóa</v-btn>
                    
                </v-col>
            </v-row>
        </v-form>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <label for="PASSWORD">Cập nhật lại mật khẩu mới</label>
                    <v-text-field
                        name="password"
                        label="PASSWORD"
                        :type="typePassword"
                        prepend-icon="mdi-key"
                        placeholder="Nhập password cho người dùng"
                        :append-icon="iconPassword"
                        @click:append="showPassword()"
                        v-model="PASSWORD"
                        :rules="rulePassword"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                    <button @click="updatePassword()" class="btn btn-add"><v-icon>mdi-update</v-icon> Cập nhật lại mật khẩu</button>
                </v-col>
        </v-row>
    </v-card>
</v-col>
</template>
<script>
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue')
    },
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      avatar: null,
      gender: [
          {text: 'NAM', value: 0},
          {text: 'NỮ', value: 1}
      ],
      rule: [
          {UUID_RULE: 'manager-2019', NAME_RULE: 'Quản lý'},
          {UUID_RULE: 'user-2019', NAME_RULE: 'Nhân viên'}
      ],
      user: {
          UUID_RULE: 'user-2019',
          GENDER: 0,
          BIRTH_DAY: new Date().toISOString().substr(0, 10),
          UUID_COUNTRY: ''
      },
      message: {
          type: null,
          text: null
      },
      province: [],
      country: [],
       checkEmail: false,
       rulePassword: [
           v => !!v || 'Chưa nhập password',
           v => v.length >= 8 || 'Password ít nhất 8 ký tự!'
       ],
       ruleEmail: [
            v => !!v || 'Bạn chưa nhập Email',
            v => /.+@.+\..+/.test(v) || 'Đây không phải là email!',
       ],
       rulePhone: [
            v => /((09|03|07|08|05|01)+([0-9]{8})\b)/.test(v) || 'Đây không phải là số điện thoại',
       ],
       iconPassword: 'mdi-eye',
       typePassword: 'password',
       UUID_PROVINCE: '',
       change_password: false,
       PASSWORD: ''
    }),
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
     watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
        renderAvatar()
        {
            var reader  = new FileReader()
            const file = this.$refs.MyAvatar.files[0]
            this.user.AVATAR = file
            this.avatar  = URL.createObjectURL(file)
            // console.log(file)
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        updateUser()
        {
            const data = {
               EMAIL: this.user.EMAIL,
               PHONE: this.user.PHONE,
               BIRTH_DAY: this.date,
               GENDER: this.user.GENDER,
               UUID_RULE: this.user.UUID_RULE,
               UUID_COUNTRY: this.user.UUID_COUNTRY
                
            }
            if(this.change_password == true)
            {
                data.PASSWORD = this.user.PASSWORD
            }
            this.$http.put(this.$store.state.API_URL + 'user/'+this.user.UUID_USER,data)
            .then((response) => {
                console.log('data',response.data)
                this.message.type = 'success'
                this.message.text = 'Cập nhật thành công!'
                this.ApiGetInfoUser()
            }).catch(() => {
            })
        },
        ApiCheckEmail()
        {
            this.$http.get(this.$store.state.API_URL + 'user?check=email&value='+this.user.EMAIL).then((response) => {
                // console.log(response.data)
                if(response.data)
                {
                    this.message.type = 'warning'
                    this.message.text = 'Email đã tồn tại!'
                    this.checkEmail = true
                }
                else
                {
                    this.message.text = null
                    this.checkEmail = false
                }
            }) 
        },
        ApiGetInfoUser()
        {
            
            this.$http.get(this.$store.state.API_URL + 'user/'+this.$route.params.uuid+'?api_token='+this.$session.get('token')).then((response) => {
                // console.log(response.data)
                this.date = response.data.BIRTH_DAY
                this.user = response.data
                // console.log(response.data)
                this.ApiGetCountry(response.data.UUID_PROVINCE, 'UUID_PROVINCE')
                
            })
        },
        showPassword()
        {
            if(this.typePassword == 'password')
            {
                this.typePassword = 'text'
                this.iconPassword = 'mdi-eye-off'
            }
            else
            {
                this.typePassword = 'password'
                this.iconPassword = 'mdi-eye'
            }
        },
        ApiGetProvince()
        {
            this.$http.get(this.$store.state.API_URL + 'province')
            .then((response) => {
                this.province = response.data
            })
        },
        ApiGetCountry(UUID_PROVINCE,TYPE)
        {
            this.$http.get(this.$store.state.API_URL + 'country/'+UUID_PROVINCE+'?type=' + TYPE)
            .then((response) => {
                this.UUID_PROVINCE = response.data[0].UUID_PROVINCE
                this.DisplayCountry(response.data[0].UUID_PROVINCE)
            })
        },
        DisplayCountry(UUID_PROVINCE)
        {
            this.$http.get(this.$store.state.API_URL + 'country/'+UUID_PROVINCE+'?type=UUID_PROVINCE')
            .then((response) => {
                this.country = response.data
            })
        },
        deleteUser(email)
        {
            this.$http.delete(this.$store.state.API_URL + 'user/'+this.$route.params.uuid+'?api_token='+this.$session.get('token')+'&email='+email).then(() => {
                this.$router.push('/manager/users')
            })
        },
        updatePassword()
        {
            if(this.PASSWORD.length >=8)
            {
                this.$http.get(this.$store.state.API_URL + 'user/'+this.$route.params.uuid+'?api_token='+this.$session.get('token')+'&PASSWORD='+ this.PASSWORD+'/update').then(() => {
                    this.message.type = 'success'
                    this.message.text = 'Cập nhật mật khẩu thành công!'
                })
            }
            
        }
    },
    created()
    {
        this.ApiGetProvince()
        this.ApiGetInfoUser()
    }
}
</script>

<style scoped>
.group-avatar {text-align: center}
.avatar {position: relative;border: 1px solid #e2e2e2;}
.input-add-avatar {position: absolute;width: 100%;height: 100%;top: 0;left: 0;opacity: 0;}
</style>