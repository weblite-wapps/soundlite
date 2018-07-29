// W && R
const { W } = window


export default (vueRoot) => {
  // get Customize Value
  W.loadData().then(({ user: { name } }) => {
    vueRoot.username = name
    vueRoot.wisId = W.wisId

    W.start()
  })
}
