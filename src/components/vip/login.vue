<template>
  <div class="loginBox">
    <!-- 加入顶部弹出层 -->
    <van-popup v-model="showSlider" position="top" :style="{ height: '20%' }">
      <span class="tanchu">您的验证码为:123456</span>
    </van-popup>
    <div class="logo">
      <img src="../../assets/heima.png" alt />
    </div>
    <van-field
      readonly
      clickable
      :value="inpValue"
      placeholder="手机号"
      @touchstart.native.stop="touchInp()"
    >
      <van-button
        slot="button"
        size="mini"
        type="default"
        :disabled="isDisabled"
        @click="sendCode"
      >发送验证码</van-button>
    </van-field>
    <!-- 一号键盘 -->
    <van-number-keyboard
      v-model="inpValue"
      :show="showKeyboard"
      extra-key="."
      close-button-text="完成"
      @blur="showKeyboard = false"
      @input="onInput"
      @delete="onDelete"
    />
    <van-field
      readonly
      clickable
      :value="inpValue1"
      placeholder="验证码"
      @touchstart.native.stop="touchInp1()"
    ></van-field>
    <!-- 二号键盘 -->
    <van-number-keyboard
      v-model="inpValue1"
      :show="showKeyboard1"
      extra-key="."
      close-button-text="完成"
      @blur="showKeyboard1 = false"
      @input="onInput1"
      @delete="onDelete1"
    />
    <div class="bottom">
      <van-button type="primary" class="loginConfirm" @click="userLogin">登陆</van-button>
      <van-button type="default" class="loginConfirm guanyu" @click="guanyu">关于我们</van-button>
    </div>
  </div>
</template>
<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      // 键盘弹出与隐藏
      showKeyboard: false,
      showKeyboard1: false,
      //   保存手机号输入框的值
      inpValue: "",
      //   保存验证码输入框的值
      inpValue1: "",
      //   是否禁用
      isDisabled: true,
      //   顶部弹出层的显示与隐藏
      showSlider: false
    };
  },
  methods: {
    onInput() {
      const inpNumber = this.inpValue.split("");
      if (inpNumber.length == 10) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    onDelete() {
      const inpNumber = this.inpValue.split("");
      console.log(inpNumber);
      if (inpNumber.length == 12) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    onInput1() {},
    onDelete1() {},
    touchInp() {
      this.showKeyboard = true;
    },
    touchInp1() {
      this.showKeyboard1 = true;
    },
    // 点击关于我们时触发
    guanyu() {
      this.$router.push("/member");
    },
    // 点击发送验证码时触发
    sendCode() {
      setTimeout(() => {
        this.showSlider = true;
      }, 1000);
    },
    // 点击登陆按钮时触发
    userLogin() {
      if (this.inpValue1 === "123456") {
        // 保存用户登陆状态
        window.localStorage.setItem("loginStatus", "1");
        this.$router.push("/member");
      } else if(this.inpValue.length!==11) {
        Notify({ type: "danger", message: "请输入正确的手机号" });
      }else{
        Notify({ type: "danger", message: "请输入正确的验证码" });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.loginBox {
  padding: 0 50px;
}
.van-field {
  position: relative;
  margin-top: 20px;
  border: solid 1px #1989fa;
  border-radius: 5px;
}
.loginConfirm {
  margin-top: 20px;
  width: 100%;
  height: 42px;
  border-radius: 5px;
}
.guanyu {
  color: #ccc;
}
.bottom {
  text-align: center;
}
.van-button--default {
  border: none;
}
.logo {
  text-align: center;
  margin-top: 15px;
  img {
    width: 80px;
    height: 80px;
  }
}
.tanchu{
  margin-left: 60px;
  font-size: 25px;
}
</style>