<template>
  <div class="bigbox">
    <p>正在加班加点开发中，敬请期待...<van-loading type="spinner" color="#1989fa" /></p>
    
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
p{
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  transform: translateY(-50%)

}
</style>