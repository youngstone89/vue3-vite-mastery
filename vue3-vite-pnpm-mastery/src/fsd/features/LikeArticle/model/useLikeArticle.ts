import { computed, ref, type Ref } from 'vue'

export function useLikeArticle(articleId: number): {
  isLiked: Ref<boolean>
  toggleLike: () => void
} {
  const $isLiked = ref<boolean>(false)

  const toggleLike = (): void => {
    $isLiked.value = !$isLiked.value
    console.log(`toggleLike[${articleId}]:${$isLiked.value}`)
    // Here you would typically make an API call to update the like status
  }

  const isLiked = computed<boolean>(() => $isLiked.value)

  return {
    isLiked,
    toggleLike
  }
}
