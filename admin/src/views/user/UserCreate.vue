<template>
  <div class="user-create">
    <el-breadcrumb
      separator-class="el-password-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ ID ? "编辑" : "新增" }}管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="user" label-width="80px" @submit.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="user.username" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="editUser">保存</el-button>
        <el-button @click="router.push({ path: '/user' })">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { get, post, put } from '../../api/index';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()

    const data = reactive({
      user: {
        username: "",
        password: ""
      }
    })
    const ID = route.params.id

    //编辑
    const getUserInfo = async () => {
      const res = await get(`/rest/user/${ID}`)
      data.user = res
    }
    ID && getUserInfo()

    //更新数据
    const save = async () => {
      if (ID) {
        await put(`rest/user/${ID}`, data.user)//编辑
      } else {
        await post("rest/user", data.user)//新增
      }
      ElMessage.success('添加成功！')
      // router.push({ path: "/user" })
    }

    const { user } = toRefs(data)
    return {
      user,
      ID,
      router,
      save
    }
  },
})
</script>


<style>
</style>