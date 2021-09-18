<template>
  <div class="category-create">
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
      @submit.prevent="save"
    >
      <el-tabs
        v-model="activeName"
        type="border-card"
        lazy="true"
        class="min-h-750 relative"
      >
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select
              v-model="form.categories"
              multiple
              clearable
              placeholder="请选择英雄类型"
            >
              <el-option
                v-for="item in categoryList"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="(res) => (form.avatar = res.url)"
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
              :on-success="(res) => (form.banner = res.url)"
            >
              <img v-if="form.banner" :src="form.banner" class="banner-img" />
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
        </el-tab-pane>
        <el-tab-pane label="技能装备" name="second">
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
              ></el-option>
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

          <el-form-item label="技能">
            <el-button @click="form.skills.push({})">
              <i class="el-icon-plus"></i>新增技能
            </el-button>
          </el-form-item>
          <el-row>
            <el-col :span="12" v-for="(item, i) in form.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="(res) => (item.imgUrl = res.url)"
                >
                  <img v-if="item.imgUrl" :src="item.imgUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.consume"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.desc" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button type="danger" @click="form.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="英雄关系" name="third">
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
        </el-tab-pane>
        <el-tab-pane label="进阶技巧" name="fourth">
          <el-form-item label="使用技巧" prop="useTips">
            <el-input type="textarea" v-model="form.useTips"></el-input>
          </el-form-item>
          <el-form-item label="战斗技巧" prop="fightTips">
            <el-input type="textarea" v-model="form.fightTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路" prop="TeamfightTips">
            <el-input type="textarea" v-model="form.teamfightTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-form-item>
          <el-button type="primary" native-type="submit"> 保存 </el-button>
          <el-button @click="router.push({ path: '/hero' })">取消</el-button>
        </el-form-item>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import request from '../../utils/request';
import { get, post, put } from '../../api/index.js';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()

    const data = reactive({
      form: {
        name: "",
        title: "",
        avatar: "",
        banner: "",
        categories: [],
        scores: {
          difficulty: 0,
          skill: 0,
          attack: 0,
          survive: 0
        },
        skills: [],// {name: "",imgUrl: "",coolingTime: "",consume: "",desc: ""}
        advantageEquipment: [],
        disadvantageEquipment: [],
        useTips: "",
        fightTips: "",
        TeamfightTips: "",
        partners: []
      },
      equipmentList: [],
      activeName: "first",
      categoryList: [],
      heroList: []
    })

    const rules = []
    const ID = route.params.id
    const uploadUrl = `${request.defaults.baseURL}upload`

    //获取列表数据
    const getList = async (list, url) => {
      const res = await get(url)
      data[list] = res
    }
    getList('categoryList', "rest/category")//分类列表
    getList('equipmentList', "rest/equipment")//装备列表
    getList('heroList', "rest/hero")//英雄列表

    //获取数据详情
    const getHeroInfo = async () => {
      const res = await get(`/rest/hero/${ID}`)
      data.form = res
    }
    ID && getHeroInfo()

    //更新数据
    const save = async () => {
      if (ID) {
        await put(`rest/hero/${ID}`, data.form)
      } else {
        await post('rest/hero/', data.form)
      }
      ElMessage.success('操作成功！')
      // router.push({ path: "/hero" })
    }

    const { form, equipmentList, categoryList, activeName } = toRefs(data)

    return {
      router,
      rules,
      form,
      equipmentList,
      categoryList,
      uploadUrl,
      activeName,
      save
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
  border-radius: 50%;
  display: block;
}
.banner-img {
  width: 300px;
  height: 200px;
  display: block;
}
</style>