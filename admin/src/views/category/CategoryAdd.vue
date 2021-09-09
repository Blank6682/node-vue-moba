<template>
  <div class="add-categoire">
    <h1>{{ categoryId ? "编辑" : "新建" }}分类</h1>
    <el-form ref="formsss" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="value" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
import { defineComponent, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { post, get, put } from '../../api/index';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()

    const formsss = ref(null)
    const form = reactive({ name: "" })
    const rules = {
      name: [{ required: true, message: "请输入名称", tirgger: "blur" }]
    }
    const categoryId = route.params.id


    //编辑
    if (categoryId) {
      const getCategoryInfo = async () => {
        const res = await get(`category/${categoryId}`)
        form.name = res.data.name
      }
      getCategoryInfo()
    }

    //添加
    const addCategory = async () => {
      await post("category", form)
      ElMessage.success('添加成功！')
      router.push({ path: "/category" })
    }

    //编辑
    const editCategory = async () => {
      await put(`category/${categoryId}`, form)
      ElMessage.success('编辑成功！')
      router.push({ path: "/category" })

    }

    return {
      addCategory,
      editCategory,
      form,
      formsss,
      rules,
      categoryId
    }
  }
})
</script>