<template>
    <el-container>
        <el-header>
        <el-row>
            <el-col :span="23"><div style="font-size:20px; color:#fff;">电商后台管理系统</div></el-col>
            <el-col :span="1"><a class="logout" href="#">退出</a></el-col>
        </el-row>
    </el-header>
        <el-container>
            <!-- 导航侧边 -->
        <el-aside width="200px">
            <el-menu
                default-active="1-1">
                <!-- 显示的是父菜单 -->
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                    </template>
                    <!-- 菜单项 -->
                    <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {};
</script>
<style>
.logout {
  text-decoration: none;
  color: black;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100%;
}
</style>