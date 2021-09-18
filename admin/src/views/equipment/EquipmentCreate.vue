<template>
  <div class="equipment-create">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>装备管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ ID ? "编辑" : "新增" }}装备</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="equipment" label-width="80px" @submit.prevent="save">
      <el-form-item label="名称">
        <el-input
          v-model="equipment.name"
          placeholder="请输入装备名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="equipment.icon" :src="equipment.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="editEquipment">保存</el-button>
        <el-button @click="router.push({ path: '/equipment' })">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
import { defineComponent, reactive, toRefs } from 'vue'
import request from '../../utils/request';
import { useRoute, useRouter } from 'vue-router';
import { get, post, put } from '../../api/index';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()

    const data = reactive({
      equipment: {
        name: "",
        icon: ""
      }
    })
    const ID = route.params.id
    const uploadUrl = `${request.defaults.baseURL}upload`

    const afterUpload = (res) => {
      data.equipment.icon = res.url
    }

    //编辑
    const getEquipmentInfo = async () => {
      const res = await get(`/rest/equipment/${ID}`)
      data.equipment = res
    }
    ID && getEquipmentInfo()

    //更新数据
    const save = async () => {
      if (ID) {
        await put(`rest/equipment/${ID}`, data.equipment)//编辑
      } else {
        await post("rest/equipment", data.equipment)//新增
      }
      ElMessage.success('添加成功！')
      // router.push({ path: "/equipment" })
    }

    const { equipment } = toRefs(data)
    return {
      equipment,
      uploadUrl,
      ID,
      router,
      afterUpload,
      save
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