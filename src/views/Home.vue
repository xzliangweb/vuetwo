<template>
    <el-container>
        <el-header>
        <el-row>
            <el-col :span="23"><div style="font-size:20px; color:#fff;">电商后台管理系统</div></el-col>
            <el-col :span="1"><a class="logout" href="#">退出</a></el-col>
        </el-row>
    </el-header>
        <el-container>
            <!-- 导航侧边 uniquer-opened只开启一个导航菜单 -->
        <el-aside width="200px">
            <el-menu
                :unique-opened="true"
                :router="true"
                style="height:100%"
                default-active="1-1">
                <!-- 显示的是父菜单 -->
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                    </template>
                    <!-- 菜单项 -->
                    <el-menu-item index="/users">
                        <i class="el-icon-view"></i>
                        用户列表
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                    </template>
                    <!-- 菜单项 -->
                    <el-menu-item index="/roles">
                        <i class="el-icon-view"></i>
                        角色列表
                    </el-menu-item>
                    <el-menu-item index="/rights">
                        <i class="el-icon-view"></i>
                        权限列表
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品管理</span>
                    </template>
                    <!-- 菜单项 -->
                    <el-menu-item index="3-1">商品列表</el-menu-item>
                    <el-menu-item index="3-2">分类列表</el-menu-item>
                    <el-menu-item index="3-3">商品列表</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>订单管理</span>
                    </template>
                    <!-- 菜单项 -->
                    <el-menu-item index="4-1">订单列表</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据统计</span>
                    </template>
                    <!-- 菜单项 -->
                    <el-menu-item index="5-1">数据列表</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  // 判断是否登录了
};
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