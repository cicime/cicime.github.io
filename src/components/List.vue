<template>
  <section>
    <h1 class="about-title">DIARY</h1>
    <hr class="about-line">
    <ul class="list">
      <router-link
              v-for="item in diarys"
              :to="'diary/v/'+item.id"
              :key="item.id"
              class="list-item"
              tag="li"><strong>[{{item.cate}}]</strong> {{item.title}} <span class="time">PHOTO {{item.time}}</span></router-link>
    </ul>
  </section>
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
  .list
    list-style none
    padding: 15px 0 0 15px
    margin: 0
    &-item
      cursor pointer
      margin-bottom: 14px
      .time
        font-size: 12px
        margin-left: 5px
</style>