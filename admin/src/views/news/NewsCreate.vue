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
        <el-select
          v-model="news.categories"
          multiple
          clearable
          placeholder="请选择分类"
        >
          <el-option
            v-for="itme in categoryList"
            :key="itme._id"
            :value="itme._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="news.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <div class="editor"></div>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="editNews" v-if="ID">保存</el-button>
        <el-button type="primary" @click="createNews" v-else>
          立即创建
        </el-button>
        <el-button @click="router.push({ path: '/news' })">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { get, post, put } from '../../api/index';
import { ElMessage } from 'element-plus';
import E from "wangeditor";

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()

    const data = reactive({
      news: {
        categories: {},
        title: "",
        content: "1"
      },
      categoryList: []
    })
    const ID = route.params.id

    //编辑
    const getNewsInfo = async () => {
      const res = await get(`/rest/news/${ID}`)
      data.news = res
    }
    ID && getNewsInfo()

    const getCategoryList = async () => {
      const res = await get('rest/category')
      data.categoryList = res
    }
    getCategoryList()
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


    onMounted(() => {
      //配置富文本编辑器
      const editor = new E(".editor")
      editor.create()
      editor.config.uploadImgServer = '/upload-img'
      editor.txt.html(data.news.content)
    })


    const { news, categoryList } = toRefs(data)
    return {
      router,
      news,
      ID,
      categoryList,
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