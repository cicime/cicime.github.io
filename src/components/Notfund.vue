<template>
  <div class="no-data">
    <h1 class="no-data-title">404</h1>
    <p class="no-data-desc">(づ￣3￣)づ╭❤～ <br>肿么会跳到这个页面呢，哎呀，我也好奇怪。</p>
  </div>
</template>

<script type="javascript">
  export default {
    props: ['diarys'],
    created() {
      window.scrollTo(0, 0)
    }
  }
</script>

<style lang="stylus">
.no-data
  box-sizing border-box
  &-title
    font-size: 40px
    margin: 0
    color: #888
    border-bottom 1px solid #ddd
  &-desc
    line-height: 1.6
</style>