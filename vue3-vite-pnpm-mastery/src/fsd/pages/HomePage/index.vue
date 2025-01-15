<template>
  <div class="home-page">
    <h1>Blog Articles</h1>
    <ArticleList :articles="articles" />
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/fsd/entities/Article/model/article'
import { fetchArticles } from '@/fsd/shared/api/articles'
import ArticleList from '@/fsd/widgets/ArticleList/index.vue'
import { onMounted, ref } from 'vue'
const articles = ref<Article[]>([])

onMounted(async () => {
  articles.value = await fetchArticles()
})
</script>
