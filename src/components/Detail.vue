<template>
  <div>
    <loading v-if="!mdHtml"></loading>
    <div v-html="mdHtml" class="md"></div>
  </div>
</template>

<script type="javascript">
  import Loading from './Loading.vue'
  import router from '../router'

  export default {
    props: ['diarys'],
    components: { Loading },
    created(){
      window.scrollTo(0, 0)
      this.$http.get('./static/path/' + this.$router.currentRoute.params.id + '.md').then(response => {
        let data = response.body
        if(/---[\r\n](.*[\r\n])+---/.test(response.body)) {
          data = data.replace(/---[\r\n](.*[\r\n])+---/, '')
        }
        this.renderHtml(data)
      }, err => {
        router.replace('/404')
      })
    },
    methods: {
      renderHtml(md) {
        this.mdHtml = Mdjs.md2html(md)
      }
    },
    data () {
      return {
        mdHtml: ''
      }
    }
  }
</script>

<style lang="stylus">
  .content-bg
    background: #fff
</style>