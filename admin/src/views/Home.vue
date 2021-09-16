<template>
  <div class="container">
    <el-container style="height: 100vh; width: 100vw; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" router>
          <el-sub-menu index="1">
            <template #title><i class="el-icon-message"></i>内容管理</template>
            <el-menu-item-group>
              <template #title>分类管理</template>
              <el-menu-item index="/category/create">新增分类</el-menu-item>
              <el-menu-item index="/category">分类列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="英雄管理">
              <el-menu-item index="/hero/create">新增英雄</el-menu-item>
              <el-menu-item index="/hero">英雄列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="装备管理">
              <el-menu-item index="/equipment/create">新增装备</el-menu-item>
              <el-menu-item index="/equipment">装备列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="资讯管理">
              <el-menu-item index="/news/create">新增资讯</el-menu-item>
              <el-menu-item index="/news">资讯列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}
</style>