<template>
  <div class="article-list">
    <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
  </div>
</template>

<script setup lang="ts">
import { Article } from '@/fsd/entities/Article/model/article'
import ArticleCard from '@/fsd/entities/Article/ui/ArticleCard.vue'
import { defineProps } from 'vue'

interface Props {
  articles: Article[]
}

defineProps<Props>()
</script>
