<template>
  <div class="categoire-list">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" width="100%">
      <el-table-column prop="_id" label="Id"> </el-table-column>
      <el-table-column prop="parent.name" label="上级分类"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
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
            @click.prevent="deleteCategory(scope.row)"
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
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus';
import { get, del } from '../../api/index';

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
    const deleteCategory = (row) => {
      ElMessageBox
        .confirm(`是否确定要删除分类 "${row.name}"?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          await del(`category/${row._id}`)
          ElMessage.success("删除成功")
          getCategoryList()
        })
        .catch(() => {
          // catch
        });
    }

    const { tableData } = toRefs(data)

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