<template>
    <div class="login-wrap">
        <el-form
            class="login-form"
            label-position="top"
            label-width="80px"
            :model="formData">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input @keyup.enter.native="handleLogin" v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                  <el-button @click="handleLogin" class="login-btn" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// 1、绑定文本框 ✔️
// 2、给按钮注册事件
// 3、登录成功跳转，提示告诉用户登录成功
// 4、记录token 把获取到的token 保存到session 中
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin() {
      this.$http
        .post("login", this.formData)
        .then(response => {
          // 打印响应看里面是否有响应数据
          console.log(response);
          // 要是不使用解构的方式写法的时候
          //   const status = response.data.meta.status;
          //   const msg = response.data.meta.msg
          const { meta: { msg, status } } = response.data;
          if (status === 200) {
            //   成功 消息提示
            this.$message.success(msg);
            // 记录token
            // sessionStorage;记录在服务器内存中
            // localStorage; 记录在文件中
            sessionStorage.setItem("token", response.data.data.token);
            this.$router.push("/"); //点击进行跳转的路由
          } else {
            //   失败消息提示
            this.$message.error(msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 400px;
  padding: 30px;
  border-radius: 5px;
  background-color: #fff;
}
.login-btn {
  width: 100%;
}
</style>
