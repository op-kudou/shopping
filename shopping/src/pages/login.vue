<template>
    <div class="register">
    <el-input class="ipt" placeholder="用户名" @focus="userErr=''" v-model="userName">
      <i slot="prefix" class="el-input__icon el-icon-user"></i>
    </el-input>
    <span class="err" v-show="userErr">{{userErr}}</span>
    <el-input class="ipt" placeholder="密码" @focus="pwdErr=''" v-model="password" type="password">
      <i slot="prefix" class="el-input__icon el-icon-key"></i>
    </el-input>
    <span class="err" v-show="pwdErr">{{pwdErr}}</span>
    <el-button type="success" @click="login">登录</el-button>
  </div>
</template>
<script>
import $axios from "../plugin/axios";
export default {
  created() {},
  data() {
    return {
      userName: "",
      password: "",
      userErr: "",
      pwdErr: ""
    };
  },
    methods: {
    login() {
      var patt = /^[a-zA-Z0-9_\u4e00-\u9fa5]{6,12}$/;
      if (!patt.test(this.userName)) {
        this.userErr = "值包含数组字母下划线、汉字6-12位";
        return false;
      }
      var patt2 = /^\w{6,12}$/;
      if (!patt2.test(this.password)) {
        this.pwdErr = "只能输入6-12位数组字母下划线";
        return false;
      }

      var rst = $axios.get(
        "/login?userName=" +
          this.userName +
          "&" +
          "password=" +
          this.password
      );
      var p = Promise.all([rst]); // 触发所有的请求

      (async () => {
        let res = await p;
        let data = res[0].data;
        if (data.code === 0) 
        {
          // 用elementui
          this.$message({
            type: "warning",
            message: "用户名或密码错误"
          });
          // 清空输入框
          this.userName = this.password = "";
        } 
        else if (data.code == 1) 
        {
            this.$message(
            {
                type: "success",
                message: "登录成功"
            });
        //将token保存到本地vuex中data.token
        localStorage.setItem('token',data.token);
        this.$store.dispatch('update_tokens_async',data.token);

        setTimeout(() => 
        {
            this.$router.push('/');
        }, 1000);
        this.userName = this.password = "";
        }
      })();
    }
  }
}
</script>
<style scoped>
.register {
  width: 400px;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  padding: 20px 50px 30px 50px;
}
.register .ipt {
  margin-top: 20px;
}
.register button {
  margin: 0 auto;
  display: block;
  width: 100%;
  margin-top: 30px;
}
.err {
  color: red;
  font-size: 12px;
}
</style>

