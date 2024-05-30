<script lang="ts">
import { h, ref } from 'vue';
function Hello() {
    return 'hello world!'
}
function renderInvalid() {
    const p = h('p', 'hi')
    return h('div', [
        // Yikes - duplicate vnodes!
        p,
        p
    ])
}
function render() {
    return h(
        'div',
        Array.from({ length: 20 }).map(() => {
            return h('p', 'hi')
        })
    )
}
export default {
    props: {
        msg: String
    },
    setup(props) {
        const count = ref(1)

        // return the render function
        // return () => h('div', props.msg + count.value)
        // return () => 'hello world!'
        // use an array to return multiple root nodes
        // return () => [
        //     h('div', 'hello world!'),
        //     h('div', 'hello world!'),
        //     h('div', 'hello world!')
        // ]
        // return Hello
        // return renderInvalid
        return render

    }
}
</script>