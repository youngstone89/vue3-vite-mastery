<template>
  <BaseButton @click="toggleLike" :class="{ liked: isLiked }">
    {{ isLiked ? 'Unlike' : 'Like' }}
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/fsd/shared/ui/BaseButton.vue'
import { defineProps } from 'vue'
import { useLikeArticle } from '../model/useLikeArticle'

const props = defineProps({
  articleId: {
    type: Number,
    required: true
  }
})

const { isLiked, toggleLike } = useLikeArticle(props.articleId)
</script>

<style scoped>
.liked {
  background-color: #ff69b4;
}
</style>
