function createStore(reducer) {
  let state = { count: 0 };
  function dispatch(action) {
    state = reducer(state, action);
    render();
  };
  function getState() {
    return state;
  }

  return {
    dispatch,
    getState
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };

    default:
      return state;
  }
};
const store = createStore(reducer)


function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

store.dispatch({ type: '@@INIT' })

document.getElementById('button').addEventListener('click', function() {
    store.dispatch({ type: 'INCREASE_COUNT' });
})