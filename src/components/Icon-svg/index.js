import Vue from 'vue'

function registerAllComponents(requireContext) {
    return requireContext.keys().forEach(comp => {
        const vueComp = requireContext(comp)
        const compName = vueComp.name ? vueComp.name.toLowerCase() : /\/([\w-]+)\.vue$/.exec(comp)[1]
        Vue.component(compName, vueComp)
    })
}

// 注册该文件目录下的组件
registerAllComponents(require.context('./', false, /\.vue$/))