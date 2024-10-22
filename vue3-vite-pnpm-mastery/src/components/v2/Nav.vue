<template>
  <nav>
    <a id="profile" href="/profile">My profile</a>
    <a v-if="admin" id="admin" href="/admin">Admin</a>
    <ul id="user-dropdown" v-show="shouldShowDropdown"></ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      admin: false,
      shouldShowDropdown: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
