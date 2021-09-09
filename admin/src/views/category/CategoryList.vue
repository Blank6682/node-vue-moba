<template>
  <div class="categoire-list">
    <el-button type="primary" @click="router.push({ path: '/category/create' })"
      ><i class="el-icon-plus"></i> 新增分类</el-button
    >
    <el-table :data="tableData" width="100%">
      <el-table-column prop="_id" label="Id"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button
            @click.prevent="editCategory(scope.row._id)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            @click.prevent="deleteCategory(scope.row._id)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { defineComponent, reactive, toRefs } from 'vue';
import { get, del } from '../../api/index';
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()
    const data = reactive({
      tableData: []
    })

    //获取列表数据
    const getCategoryList = async () => {
      await get("category").then((res) => {
        data.tableData = res.data
      }).catch(() => {
        ElMessage.warning("数据获取失败")
      })
    }
    getCategoryList()

    //编辑数据
    const editCategory = async (id) => {
      router.push({ path: `/category/edit/${id}` })
    }

    //删除数据
    const deleteCategory = async (id) => {
      await del(`category/${id}`).then(() => {
        ElMessage.success("删除成功")
        getCategoryList()
      }).catch(() => {
        ElMessage.warning("删除失败")
      })
    }

    const { tableData } = toRefs(data)

    console.log(tableData)
    return {
      tableData,
      editCategory,
      deleteCategory,
      router
    };
  },
});
</script>

<style>
</style>