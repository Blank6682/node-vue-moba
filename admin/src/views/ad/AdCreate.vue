<template>
  <div class="ad-create">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>广告位管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ ID ? "编辑" : "新增" }}广告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ad" label-width="80px" @submit.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="ad.name" placeholder="请输入广告名称"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="mini" @click="ad.items.push({})">
          <i class="el-icon-plus"></i>
          添加广告
        </el-button>
        <el-row>
          <el-col :span="24" v-for="(item, i) in ad.items" :key="i">
            <el-form-item label="链接">
              <el-input
                v-model="item.url"
                placeholder="请输入广告链接"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="afterUpload"
              >
                <img v-if="item.img" :src="item.img" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="">
              <el-button type="danger" @click="ad.items.splice(i, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="editAd">保存</el-button>
        <el-button @click="router.push({ path: '/ad' })">取消</el-button>
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
      ad: {
        name: "",
        items: []
      }
    })
    const ID = route.params.id
    const uploadUrl = `${request.defaults.baseURL}upload`

    const afterUpload = (res) => {
      data.ad.icon = res.url
    }

    //编辑
    const getAdInfo = async () => {
      const res = await get(`/rest/ad/${ID}`)
      data.ad = res
    }
    ID && getAdInfo()

    //更新数据
    const save = async () => {
      if (ID) {
        await put(`rest/ad/${ID}`, data.ad)//编辑
      } else {
        await post("rest/ad", data.ad)//新增
      }
      ElMessage.success('添加成功！')
      // router.push({ path: "/ad" })
    }

    const { ad } = toRefs(data)
    return {
      ad,
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