<template>
  <div class="categoire-list">
    <el-button type="primary"><i class="el-icon-plus"></i> 新增分类</el-button>
    <el-table :data="tableData" width="100%">
      <el-table-column prop="date" label="日期" width="140"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button
            @click.prevent="eidtRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            @click.prevent="deleteRow(scope.$index, tableData)"
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
    };
    const tableData = ref(Array(20).fill(item));

    return {
      tableData,
    };
  },
});
</script>

<style>
</style>