<template>
  <div class="upload">
    <!--<form id="signForm" enctype="multipart/form-data">-->
    <div>
      <label for="username">用户名</label>
      <input type="text" name="username" id="username" placeholder="用户名" v-model="users.username">
      <div v-if="judgeUser">请输入合适的用户名</div>
    </div>
    <div>
      <label for="password">密码</label>
      <input type="text" name="password" id="password" placeholder="密码" v-model="users.password">
      <div v-if="judgePas">请输入符合规范的密码</div>
    </div>
    <div>
      <label for="usernameReply">重复密码</label>
      <input type="text" name="usernameReply" id="usernameReply" placeholder="重复密码" v-model="users.passwords">
      <div v-if="judgePass">两次输入请保持一致</div>
    </div>
    <div>
      <label for="name">昵称</label>
      <input type="text" name="name" id="name" placeholder="昵称" v-model="users.name">
      <div v-if="judgeName">请输入昵称</div>
    </div>
    <div>
      <label for="sex">性别</label>
      <select name="" id="sex" v-model="users.sex">
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
    </div>
    <div>
      <label for="photo">头像</label>
      <input type="file" name="photo" id="photo" @change="onfilechange"> //通过change事件获取到用户所要上传的图片
    </div>
    <div>
      <label for="Pintroduction">个人介绍</label>
      <textarea name="Pintroduction" id="Pintroduction" cols="60" rows="8" v-model="users.Pintroduction"></textarea>
    </div>
  
    <input type="submit" value="注册" class="submit" @click="submit()">
    <!--</form>-->
  </div>
</template>

<script>
  export default {
    name: "upload"
  }
</script>

<style scoped>

</style>