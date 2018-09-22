<template>
     <el-card class="card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
            border
            :data="tableData"
            stripe
            style="width: 100%; margin-top:20px;" >
            <el-table-column
            type="index"
            width="60px">
            </el-table-column>    
            <el-table-column
            prop="authName"
            label="权限名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="path"
            label="路径"
            width="180">
            </el-table-column>
            <el-table-column
            prop="level"
            label="层级">
         </el-table-column>
        </el-table>
     </el-card>    
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    //  加载权限列表数据
    async loadData() {
      const response = await this.$http.get("rights/list");
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.tableData = response.data.data;
      }
    }
  }
};
</script>
<style>
.card {
  height: 100%;
}
</style>


