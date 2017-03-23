<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <span class="footer-min">仰望星空的CiCi · 京ICP备15062153号-1</span>
      </div>
    </div>
  </footer>
</template>

<script type="javascript">
  export default {
  }
</script>

<style lang="stylus">
  .footer
    position relative
    bottom 0
    clear both
    width 100%
    min-height: 40px
    color: #999
    background: #383c3f
    .container
      padding 14px
      &:after
        content: ''
        display block
        clear both
      .content
        min-height:0
        margin: 0
  .footer-min
    font-size: 12px
</style>