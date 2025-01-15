<template>
  <div class="article-card">
    <h2>{{ article.title }}</h2>
    <p>{{ article.excerpt }}</p>
    <LikeButton :articleId="article.id" />
  </div>
</template>

<script setup lang="ts">
import LikeButton from '@/fsd/features/LikeArticle/ui/LikeButton.vue'
import { defineProps } from 'vue'
import type { Article } from '../model/article'

interface Props {
  article: Article
}

defineProps<Props>()
</script>
