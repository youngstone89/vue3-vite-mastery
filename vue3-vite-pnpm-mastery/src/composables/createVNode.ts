import { h } from 'vue'

const vnode = h(
    'div', { id: 'foo', class: 'bar' },
    [
        // children
    ]
)

console.log(vnode.type)
console.log(vnode.props)
console.log(vnode.children)
console.log(vnode.key)


