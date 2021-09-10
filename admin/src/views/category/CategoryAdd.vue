<template>
  <div class="add-categoire">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item
        >{{ categoryId ? "编辑" : "新建" }}分类</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-form :model="form" :rules="rules" label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="form.parent" clearable placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editCategory" v-if="categoryId"
          >保存</el-button
        >
        <el-button type="primary" @click="addCategory" v-else
          >立即创建</el-button
        >
        <el-button @click="router.push({ path: '/category' })">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus'
import { post, get, put } from '../../api/index';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()

    const data = reactive({
      form: { name: "", parent: null },
      categories: []
    })
    const rules = {
      name: [{ required: true, message: "请输入名称", tirgger: "blur" }]
    }
    const categoryId = route.params.id

    //获取分类列表
    const getCategories = async () => {
      const res = await get("category")
      data.categories = res.data.filter(item => !item.parent)
    }
    getCategories()

    //编辑
    if (categoryId) {
      const getCategoryInfo = async () => {
        const res = await get(`category/${categoryId}`)
        data.form = res.data
      }
      getCategoryInfo()
    }

    //添加
    const addCategory = async () => {
      if (data.form.parent == "") {
        data.form.parent = null;
      }
      await post("category", data.form)
      ElMessage.success('添加成功！')
      router.push({ path: "/category" })
    }

    //编辑
    const editCategory = async () => {
      if (data.form.parent == "") {
        data.form.parent = null;
      }
      await put(`category/${categoryId}`, data.form)
      ElMessage.success('编辑成功！')
      router.push({ path: "/category" })

    }
    const { form, categories } = toRefs(data)
    return {
      addCategory,
      editCategory,
      form,
      rules,
      categoryId,
      categories
    }
  }
})
</script>