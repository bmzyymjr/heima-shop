<template>
  <div>
    <div class="shopIn" v-if="shopsMsg.length!==0">
      <van-swipe-cell :before-close="beforeClose" :key="item.id" v-for="(item) in shopsMsg">
        <van-card
          :num="item.num"
          :price="item.price"
          :title="item.title"
          :thumb="item.imgurl"
          @click="slidCard"
        >
          <div slot="footer">
            <van-stepper v-model="item.num" @change="countChange(item)" />
          </div>
        </van-card>

        <template slot="right">
          <van-button square type="danger" text="删除" @click="deleteShop(item.id)" />
        </template>
      </van-swipe-cell>
      <van-divider>
        <van-button type="default" round to="/goods/list">继续添加商品</van-button>
      </van-divider>
    </div>
    <div class="shopNo" v-else>
      <p class="img">
        <img src="../../assets/cart_empty.9f725555.png" alt />
      </p>
      <p class="imgDsc">购物车空空如也</p>
      <p>
        <van-button type="info" class="guangguang" round to="/goods/list">去逛逛</van-button>
      </p>
    </div>
    <van-submit-bar :price="sumPrice" button-text="提交订单" @submit="onSubmit" />
    <!-- 提交订单弹出框 -->
    <van-dialog v-model="submitOrder" title="结账" :beforeClose="confirmOrders" show-cancel-button>
      <span class="sum">订单总价：{{sumPrice}}</span>
    </van-dialog>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      // 提交订单弹出框的显示与隐藏
      submitOrder: false,
      // 保存获取到的商品信息数组
      shopsMsg: [],
      // 保存商品的总价格
      sumPrice: 0,
      // 保存各个商品的数量
      percentNum: [],
      // 是否删除选中的商品
      isDeleteShop: false,
      msg: [],
      id: 0
    };
  },
  async created() {
    // 如果存在商品详情
    if (
      window.localStorage.getItem("shopsMsg") &&
      JSON.parse(window.localStorage.getItem("shopsMsg")).length !== 0
    ) {
      if (Array.isArray(JSON.parse(window.localStorage.getItem("shopsMsg")))) {
        this.percentNum = [];
        this.msg = JSON.parse(window.localStorage.getItem("shopsMsg"));
        var imgurl = window.localStorage.getItem("images");

        this.msg.forEach(item => {
          item.imgurl = imgurl;
        });
      }
      this.percentNum = [];
      const resNo = JSON.parse(window.localStorage.getItem("shopsNum"));
      this.msg.forEach((item, index) => {
        this.sumPrice += item.num * item.price * 100;
      });
      this.shopsMsg = this.msg;
    }
  },
  methods: {
    // 关闭前的回调函数
    async beforeClose({ position, instance }) {
      // this.isDeleteShop = false;
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          const result = await Dialog.confirm({
            message: "确定删除吗？"
          }).catch(err => err);
          if (result !== "confirm") return;
          this.isDeleteShop = true;
          this.sumPrice = 0;
          this.msg.forEach(item => {
            return (this.sumPrice += item.num * item.price * 100);
          });
          var index = this.msg.findIndex(item => {
            return item.id == this.id;
          });
          this.msg.splice(index, 1);
          window.localStorage.setItem("shopsMsg", JSON.stringify(this.msg));
          this.sumPrice = 0;
          this.msg.forEach(item => {
            this.sumPrice += item.num * item.price * 100;
          });
          break;
      }
    },
    // 点击删除商品时会触发
    async deleteShop(id) {
      this.id = id;
    },
    // 当商品数量发生变化时触发
    async countChange(i) {
      this.sumPrice = 0;
      this.msg.forEach(item => {
        const res = item.num * item.price;
        this.sumPrice += res * 100;
        this.percentNum.push(item.num);
      });
      // 将数据提交到后台
      window.localStorage.setItem("shopsMsg", JSON.stringify(this.msg));
    },
    // 点击提交订单时触发
    onSubmit() {
      this.submitOrder = true;
    },
    async confirmOrders(action, done) {
      done();
      if (action === "cancel") {
        const res = await Dialog.confirm({
          message: "确认要离开吗？"
        }).catch(err => err);
        if (res === "cancel") {
          this.onSubmit();
        }
      }
    },
    // 点击图片时触发
    slidCard() {
      // console.log("123");
    }
  }
};
</script>
<style lang="less" scoped>
.van-card__price {
  font-size: 12px;
  color: #f44;
  font-weight: 500;
}
.van-card__price-integer {
  font-size: 12px;
}
.van-field {
  display: inline-block;
  width: 32px;
  height: 28px;
  background-color: #f2f3f5;
  padding: 0;
}
.van-card__bottom {
  line-height: 70px;
}
.van-card__num {
  color: #000;
}
.van-button--mini {
  font-size: 22px;
}
.van-button {
  border-radius: 0;
  height: 100%;
}
.van-submit-bar__bar {
  padding: 0;
}
.img {
  width: 100%;
  height: 100px;
  img {
    width: 100px;
    height: 100px;
  }
}
.shopNo {
  p {
    text-align: center;
  }
  .imgDsc {
    color: #ccc;
  }
}
.van-button {
  line-height: 23px;
  padding: 0 6px;
  border-radius: 3px;
  font-size: 12px;
}
.sum {
  padding-left: 15px;
}
</style>