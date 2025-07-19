<template>
  <div v-if="loading">Loading...</div>
  <div v-else :class="$style.query">{{ result }}</div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result, loading } = useQuery(gql`
  query ShowsData {
    shows {
      title
      releaseYear
    }
  }
`)
</script>

<style scoped module lang="scss">
.query {
  color: white;
}
</style>
