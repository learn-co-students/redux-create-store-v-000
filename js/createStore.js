let store = createStore(reducer);

function createStore(reducer) {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state;
  }

  return {
    dispatch,
    getState
  };
}

function reducer(state = { count: 0 }, action) {
  switch (action.typ) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

function render() {
  let container = document.getElementById('container');
  container.innerText = store.getState().count;
}


store.dispatch({ type: '@@INIT' });

let button = document.getElementById('button');

button.addEventListener('click', () => {
  store.dispatch({ type: 'INCREASE_COUNT' });
});

