<template> 
  <user-detail :is-edit='true'></user-detail>
</template>
<script>
  import UserDetail from './components/UserDetail.vue'
  export default {
    name: 'updateUser',
    components: { UserDetail }
  }
</script>
<style>
</style>