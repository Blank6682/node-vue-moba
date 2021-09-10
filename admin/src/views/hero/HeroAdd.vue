<template>
  <div class="hero-add">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 20px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>英雄管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑英雄</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="form"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="Banner图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleBannerSuccess"
          :before-upload="beforeBnanerUpload"
        >
          <img v-if="form.banner" :src="form.banner" class="banner" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="难度">
        <el-rate
          v-model="form.scores.difficulty"
          style="margin-top: 10px"
          :max="10"
          show-score
        />
      </el-form-item>
      <el-form-item label="技能">
        <el-rate
          v-model="form.scores.skill"
          style="margin-top: 10px"
          :max="10"
          show-score
        />
      </el-form-item>
      <el-form-item label="攻击">
        <el-rate
          v-model="form.scores.attack"
          :max="10"
          style="margin-top: 10px"
          show-score
        />
      </el-form-item>
      <el-form-item label="生存">
        <el-rate
          v-model="form.scores.survive"
          :max="10"
          style="margin-top: 10px"
          show-score
        />
      </el-form-item>
      <el-form-item label="顺风装备">
        <el-select
          v-model="form.advantageEquipment"
          placeholder="请选择装备"
          multiple
          clearable
        >
          <el-option
            v-for="item in equipmentList"
            :label="item.name"
            :value="item._id"
            :key="item._id"
          ></el-option
          >e
        </el-select>
      </el-form-item>
      <el-form-item label="逆风装备">
        <el-select
          v-model="form.disadvantageEquipment"
          placeholder="请选择装备"
          multiple
          clearable
        >
          <el-option
            v-for="item in equipmentList"
            :label="item.name"
            :value="item._id"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="英雄关系">
        <el-select
          v-model="form.partners"
          placeholder="请选择英雄"
          multiple
          clearable
        >
          <el-option
            v-for="item in heroList"
            :label="item.name"
            :value="item._id"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用技巧" prop="useTips">
        <el-input type="textarea" v-model="form.useTips"></el-input>
      </el-form-item>
      <el-form-item label="战斗技巧" prop="fightTips">
        <el-input type="textarea" v-model="form.fightTips"></el-input>
      </el-form-item>
      <el-form-item label="团战思路" prop="TeamfightTips">
        <el-input type="textarea" v-model="form.teamfightTips"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
// import { get } from '../../api/index.js';

export default defineComponent({
  setup () {
    const router = useRouter()
    
    const data = reactive({
      form: {
        name: "",
        title: "",
        avatar: "",
        banner:"",
        categories:[],
        scores: {
          difficulty: 0,
          skill: 0,
          attack: 0,
          survive: 0
        },
        skills: [{
          name: "",
          imgUrl: "",
          coolingTime: 0,
          consume: 0,
          desc: ""
        }],
        advantageEquipment:[],
        disadvantageEquipment:[],
        useTips: "",
        fightTips: "",
        TeamfightTips: "",
        partners:[]
      },
      equipmentList:[]
    })

    const rules = []

    //获取列表数据
    const getEquipmentList = async ()=>{
        // const res =  await get("equipment")
        // data.equipmentList = res.data
    }
    getEquipmentList()

    const getHeroList = async ()=>{
        // const res =  await get("hero")
        // data.herotList = res.data
    }
    getHeroList()

    //头像上传
    const  handleAvatarSuccess = (res, file)=> {
        data.form.avatar = URL.createObjectURL(file.raw)
      }
    const beforeAvatarUpload = (file) => {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
    }
    //banner上传
    const handleBannerSuccess = (res, file) => {
        data.form.banner = URL.createObjectURL(file.raw)
    }
    const beforeBannerUpload = (file) => {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
            this.$message.error('上传banner图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
            this.$message.error('上传banne图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
    }

    const { form,equipmentList,heroList } = toRefs(data)
    return {
      router,
      form,
      rules,
      equipmentList,
      heroList,
      handleAvatarSuccess,
      beforeAvatarUpload,
      handleBannerSuccess,
      beforeBannerUpload
    }
  }

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