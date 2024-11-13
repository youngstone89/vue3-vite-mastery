<script>
import { defineComponent } from 'vue'
import { useCustomRenderFunction } from './customRenderFunction'

export default defineComponent({
  setup() {
    const { render } = useCustomRenderFunction()
    // Return the render function directly
    return render
  }
})
</script>

<style scoped>
.custom-render {
  font-family: Arial, sans-serif;
  color: #333;
}
</style>
