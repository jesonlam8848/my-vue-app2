export default {
    state: {
        isCollapse: true
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}