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
                  clearable
                  v-model="searchValue"
                  style="width:300px"
                  placeholder="请输入内容">
                  <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                 <el-button @click="addUserDialogFormVisible = true" type="success" plain>添加用户</el-button>
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
                    @change="handleChange(scope.row)"
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
                    <el-button @click="handleDelete(scope.row.id)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
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
            :page-sizes="[2, 3, 4, 5]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <!-- 添加新用户的对话框 -->
        <el-dialog
            title="添加用户"
            :visible.sync="addUserDialogFormVisible"
            @close="handleClose">
            <el-form
                ref="form"
                :rules="rules"
                label-width="80px"
                :model="formData">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="formData.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>   
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUserDialogFormVisible = false">取 消</el-button> 
                <el-button type="primary" @click="handadd">确 定</el-button>
            </div>
        </el-dialog>
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
      total: 0,
      //   绑定搜索文本框
      searchValue: "",
      //   控制添加用户对话框的显示或隐藏
      addUserDialogFormVisible: false,
      formData: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
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

      const response = await this.$http.get(
        `user?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${
          this.searchValue
        }`
      );

      this.$http
        .get("users?pagenum=1&pagesize=10")
        .then(response => {
          // 设置正在加载完成之后页面loading 结束
          this.loading = false;
          // 请求成功了拿到服务器返回的数据
          const { meta: { msg, status } } = response.data;
          //   判断获取的数据是否成功
          if (status === 200) {
            this.total = response.data.data.total;
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
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 搜索功能
    handleSearch() {
      this.loadData();
    },
    // 删除用户
    handleDelete(id) {
      this.$confirm("确定删除该用户嘛", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 点击确定时候
          const response = await this.$http.delete(`users/${id}`);
          const { meta: { status, msg } } = response.data;
          if (status === 200) {
            if (this.pagenum > 1 && this.tableData.length === 1) {
              this.pagenum--;
              this.$message.success(msg);
              //刷新表格
              this.loadData();
            }
          } else {
            this.$message.error(msg);
          }
        })
        .catch(() => {
          // 点击删除时候
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改用户状态
    async handleChange(user) {
      console.log(user);
      //   拼接模板字符串
      const response = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 点击获取表单内容进行数据发送
    handadd() {
      // 表单验证
      this.$refs.form.validate(async valid => {
        if (!valid) {
          this.$message.warning("验证失败");
          return;
        }
        // 验证异步请求
        const response = await this.$http.post("users", this.formData);
        console.log(response.status);
        // 获取数据，判断添加的是否成功
        const { meta: { status, msg } } = response.data;
        if (status === 201) {
          //   成功
          //  消息提示
          this.$message.success(msg);
          // 刷新表格
          this.loadData();
          this.addUserDialogFormVisible = false;
          // 清空的两种方式 容易造成内存泄漏，只有在浏览器关闭的时候才真正的清空
          // this.formData = "";
          // this.formData = {};
          // 遍历对象的所有属性 确定的时候清空
          for (let key in this.formData) {
            this.formData[key] = "";
          }
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 关闭对话框的时候清空文本框
    handleClose() {
      // 点击对话框清空 内容 里面
      for (let key in this.formData) {
        this.formData[key] = "";
      }
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