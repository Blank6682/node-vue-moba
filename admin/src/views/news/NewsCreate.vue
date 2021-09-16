<template>
  <div class="news-create">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ ID ? "编辑" : "新增" }}资讯</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="news" label-width="80px">
      <el-form-item label="所属分类">
        <el-input v-model="news.categories" placeholder="请选择"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="news.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="news.content"></vue-editor>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="editNews" v-if="ID">保存</el-button>
        <el-button type="primary" @click="createNews" v-else>
          立即创建
        </el-button>
        <el-button @click="router.push({ path: '/news' })">取消</el-button>
      </el-form-item>
    </el-form>
    <vue-editor v-model="news.content"></vue-editor>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { get, post, put } from '../../api/index';
import { ElMessage } from 'element-plus';
import { VueEditor } from "vue2-editor";

export default defineComponent({
  components: {
    VueEditor
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    const data = reactive({
      news: {
        categories: [],
        title: "",
        content: " <h1>一些初始内容</h1> "
      }
    })
    const ID = route.params.id

    //编辑
    const getNewsInfo = async () => {
      const res = await get(`/rest/news/${ID}`)
      data.news = res
    }
    ID && getNewsInfo()

    //更新数据
    //新建
    const createNews = async () => {
      await post("rest/news", data.news)
      ElMessage.success('添加成功！')
      router.push({ path: "/news" })
    }

    //编辑
    const editNews = async () => {
      await put(`rest/news/${ID}`, data.news)
      ElMessage.success('编辑成功！')
      router.push({ path: "/news" })
    }

    const { news } = toRefs(data)
    return {
      router,
      news,
      ID,
      createNews,
      editNews
    }
  },
})
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>