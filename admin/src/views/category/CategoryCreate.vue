<template>
  <div class="categoire-create">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ ID ? "编辑" : "新建" }}分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="form"
      :rules="rules"
      label-width="80px"
      @submit.prevent="save"
    >
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
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="router.push({ path: '/category' })">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
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
    const ID = route.params.id

    //获取分类列表
    const getCategories = async () => {
      const res = await get("rest/category")
      data.categories = res.filter(item => !item.parent)
    }
    getCategories()

    //编辑
    const getCategoryInfo = async () => {
      const res = await get(`rest/category/${ID}`)
      data.form = res
    }
    ID && getCategoryInfo()

    const save = async () => {
      if (data.form.parent == "") {
        data.form.parent = null;
      }
      if (ID) {
        await put(`rest/category/${ID}`, data.form)//编辑
      } else {
        await post("rest/category", data.form)//新增
      }
      ElMessage.success('操作成功！')
      router.push({ path: "/category" })
    }

    const { form, categories } = toRefs(data)
    return {
      save,
      form,
      rules,
      ID,
      categories
    }
  }
})
</script>