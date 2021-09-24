<template>
  <div class="login">
    <el-form
      :model="user"
      :rules="rule"
      status-icon
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
      @submit.prevent="login"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="user.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="user.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          native-type="submit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../api'
import store from '../../store'

export default defineComponent({
  setup () {
    const router = useRouter()
    const data = reactive({
      user: {
        username: "",
        password: ""
      },
      loading: false,
      checked: false
    })
    const rule = {
      username: [{ required: true, message: '请输入你的用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入你的密码', trigger: 'blur' }]
    }

    const login = async () => {
      data.logining = true
      const res = await post("login", data.user)
      ElMessage.success("登录成功！")
      store.commit("login", res)
      router.push({ path: "/" })
      data.logining = false
    }
    const { user, logining, checked } = toRefs(data)
    return {
      user,
      rule,
      login,
      logining,
      checked
    }
  },
})
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(0deg, #c2fffa, #a3b1ff);
}
.login .title {
  margin-top: 0;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>