<template>
  <div style="margin-bottom: 60px;">
    <van-tabs @change="changetab">
      <van-tab :name="item.id" :key="item.id" v-for="item in imgcategory" :title="item.title">
        <template>
          <div
            :key="item.id"
            v-for="item in img"
            class="imgbox"
            @click="$router.push('/photo/Info/'+item.id)"
          >
            <van-image width="100%" :src="item.img_url" v-lazy="item.img_url" />
            <div class="mtk">
              <p>{{item.title}}</p>
              <p>{{item.zhaiyao}}</p>
            </div>
          </div>
        </template>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分类数据
      imgcategory: [],
      // 图片数据列表
      img: []
    }
  },
  created () {
    this.getimgcategory()
    this.getimg(0)
  },
  methods: {
    async getimgcategory () {
      const { data: res } = await this.$http.get('/api/getimgcategory')
      this.imgcategory = res.message
      this.imgcategory.unshift({ title: '全部', id: 0 })
    },
    async getimg (id) {
      const { data: res } = await this.$http.get('/api/getimages/' + id)
      this.img = res.message
      console.log(res)
    },
    // 切换tab栏时
    changetab (name) {
      this.getimg(name)
    }
  }
}
</script>

<style lang="less" scoped>
  .van-tab__pane{
    padding: 5px 10px;
  }
  .imgbox{
    width: 100%;
    position: relative;
  }
  .mtk{
    overflow: hidden;
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    height: 75px;
    background-color: rgba(0,0,0,.4);
    color: #fff;
    font-size: 12px;
    p{
      padding-left: 10px;
    }
  }
</style>
