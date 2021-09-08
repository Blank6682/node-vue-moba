<template>
  <div class="add-categoire">
    <h1>新建分类</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCatery">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus'
import { post } from '../../api/index';

export default defineComponent({
  setup () {
    const data = reactive({
      form: {
        name: ""
      },
    })


    const addCatery = async () => {
      await post("category", data.form).then((res) => {
        if (res.status === 200) {
          ElMessage.success('添加成功！')
          // data.form.name = ""
        }

        // 
      }).catch((err) => {
        ElMessage.error('添加失败！')
        console.log(err)
      })
    }

    const { form } = toRefs(data)
    return {
      addCatery,
      form
    }
  }
})
</script>