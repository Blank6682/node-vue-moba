<template>
  <div class="container">
    <div class="topbar d-flex jc-space-between ai-center">
      <div class="top-left d-flex">
        <div class="top-icon ml-15"></div>
        <div class="top-title ml-10">
          <p class="text-white">王者荣耀</p>
          <p class="text-gray fz-12 mt-2">团队成就更多</p>
        </div>
      </div>
      <div class="top-right mr-18"></div>
    </div>
    <div class="nav d-flex jc-space-around ai-center bg-primary">
      <div class="navitem m-12">
        <router-link class="text-white active" to="/">首页</router-link>
      </div>
      <div class="navitem">
        <router-link class="text-white" to="/">攻略中心</router-link>
      </div>
      <div class="navitem">
        <router-link class="text-white" to="/">赛事中心</router-link>
      </div>
      <div class="navitem">
        <router-link class="text-white" to="/">IP新游</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Main',
}
</script>

<style lang="scss" scoped>
.topbar {
  background: url("../assets/image/005.png") no-repeat 0 -357px;
  background-size: 375px 455px;
  width: 100%;
  height: 45px;
  .top-icon {
    background: url("../assets/image/005.png") no-repeat 0 -308px;
    background-size: 375px 455px;
    width: 30px;
    height: 30px;
  }
  .top-right {
    background: url("../assets/image/005.png") no-repeat -59px -309px;
    background-size: 375px 455px;
    width: 60px;
    height: 24px;
  }
}
.nav {
  .active {
    padding-bottom: 2px;
    border-bottom: 3px solid white;
  }
}
</style>