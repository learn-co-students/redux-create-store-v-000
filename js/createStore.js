function createStore() {
  // We put 'state' in createStore to control access to. Instead of it being a global variable that can be changed anywhere
  let state
  // We moved 'dispatch' into createStore so the dispatch() function can have access to state. This is true with render() as well.
  // This is an example of a cluse. The createStore() function encloses the variables and carries them with it when it is envoked later.
  function dispatch(action) {
    state = reducer(state, action)
    render()
  }
  function getState() {
    return state
  }
  return {
    dispatch,
    getState,
  }
}

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREASE_COUNT":
      return { count: state.count + 1 }
    default:
      return state
  }
}

function render() {
  let container = document.getElementById("container")
  console.log(store.getState())
  container.textContent = store.getState().count
}

// We create a variable, 'store' so we can access the dispatch() method.
let store = createStore(reducer)

// We call an inital dispatch(), when the page loads. This action, with @@INIT, is passed to the reducer. The reducer, in it's switch case, looks for @INIT, doesn't find anything so returns state, which is set to { count: 0 }. The our dispatch() method calls the render() method, which renders this inital state to the DOM
store.dispatch({ type: "@@INIT" })

let button = document.getElementById("button")

button.addEventListener("click", () => {
  store.dispatch({ type: "INCREASE_COUNT" })
})

// Basically, with createStore(), we want to store the state, be able to change that state and have access to the that state.
//= let state
//= dispatch()
//= getState()

// Every piece of code that would be common to any JavaScript application following this pattern is wrapped inside of the createStore function. Any code that is particular to our application is outside that function.
