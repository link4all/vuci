<template>
  <mu-container>
    <mu-card class="login" @keydown.enter="submit">
      <mu-card-header title="Authorization Required"></mu-card-header>
      <mu-card-text>
        <mu-form ref="form" :model="validateForm">
          <mu-form-item label="Username" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="Password" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="primary" @click="submit">Login</mu-button>
            <mu-button @click="clear">Reset</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-card-text>
    </mu-card>
  </mu-container>
</template>
<script>
export default {
  data () {
    return {
      usernameRules: [
        {validate: (val) => !!val, message: 'Required'}
      ],
      passwordRules: [
        {validate: (val) => !!val, message: 'Required'}
      ],
      validateForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.$session.login(this.validateForm.username, this.validateForm.password).then((r) => {
            console.log(r);
          }).catch((r) => {
            console.log('Login Fail! username or password wrong.')
          });
        }
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: ''
      };
    }
  }
};
</script>

<style>
  .login {
    position: absolute;
    top: 50%;
    width: 400px;
    left: 50%;
    margin-left: -200px;
    margin-top: -220px;
  }
</style>
