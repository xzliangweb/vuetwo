<template>
    <!-- 卡片 -->
    <el-card class="card">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <el-row class="row">
            <el-col :span="24">
                <el-input
                  style="width:300px"
                  placeholder="请输入内容">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                 <el-button type="success" plain>成功按钮</el-button>
            </el-col>
        </el-row>
        <!--  表格  -->
        <el-table
            border
            v-loading="loading"
            :data="tableData"
            :stripe="true"
            style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <!-- prop 绑定对象的属性，当前的列的数据 -->
            <el-table-column
            prop="username"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
                <el-table-column
            prop="mobile"
            label="电话">
            </el-table-column>
            <el-table-column
            prop="create_time"
            label="时间">
            <!-- 设置时间样式 -->
            <template slot-scope="scope">
                {{scope.row.create_time | fmtDate('YYYY-MM-DD')}}
            </template>
            </el-table-column>
                <el-table-column
            prop="mg_state"
            label="用户状态">
            <template slot-scope="scope">
                <!-- 让开关绑定当前的用户scope 是template模板的里面内部数据 mg-state
                    scope.row.是当前用户的数据.mg-state是绑定的用户数据
                    -->
                <el-switch
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </template>
            </el-table-column>
                <el-table-column
            label="操作">
            <template slot-scope="scope">
                <!-- {{scope.row}}  当前一行所绑定的数据对象
                    scope.$index  可以获取到当前行的索引
                    给el-table-column  添加按钮需要使用模板列 scope 需要使用添加删除数据从scope里面来
                -->
                <el-row>
                    <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                </el-row>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!--  事件
             size-change 页容量发生改变的时候执行
             current-change 页码改变的时候执行
            属性
            current-page 当前页面页码
            page-sizes 分页选择器 里显示的内容
            page-size 默认当前的页容量
            layout 布局
            total 总条数 
              -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

    </el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      value2: true,
      //   加载提示
      loading: true,
      //   分页数据
      pagenum: 1,
      //   页容量
      pagesize: 10,
      //   总数据量
      total: 100
    };
  },
  //   mounted 这里要是使用mounted 的时候 页面加上上来会显示空白所以会晚
  created() {
    this.loadData();
  },
  methods: {
    //   因为除了登录之外所有的都要设置token
    async loadData() {
      // 设置token
      const token = sessionStorage.getItem("token");
      //   所有的地址都需要请求头授权
      this.$http.defaults.headers.common["Authorization"] = token;

      const response = await this.$http.get("users?pagenum=1&pagesize=10");

      this.$http
        .get("users?pagenum=1&pagesize=10")
        .then(response => {
          // 设置正在加载完成之后页面loading 结束
          this.loading = false;
          // 请求成功了拿到服务器返回的数据
          const { meta: { msg, status } } = response.data;
          //   判断获取的数据是否成功
          if (status === 200) {
            this.tableData = response.data.data.users;
          } else {
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页相关的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style>
.card {
  height: 100%;
}
.row {
  margin: 15px;
}
</style>