// Goal: learn how to turn code into a library that 
  // can be used across JavaScript applications.

// Learn:  which part of the codebase can be used across applications,
  // how to encapsulate the functions you built, and 
  // the getState method and how it works.

// "Store": object that contains all of our application's state.
// "Dispatch": modify that state, but do not retrieve data from the store.
// "getState": method that retrieves and returns the state which you can use anywhere in the app.
// "createStore's" "dispatch" method has an action dispatched, which calls a reducer, 
  // and then renders the view

// We want createStore to be generic enough for any JavaScript application.
    // So, make the reducer an argument to our createStore function. 
    // Then we pass through our reducer function when invoking the createStore method.

// "createStore" takes the reducer as the argument. This sets the new store's reducer as reducer. 
// When an action is dispatched, it calls the reducer that we passed through 
  // when creating the store.

function createStore(reducer) {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state;
  };

  return {
    dispatch,
    getState
  };
};

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };

    default:
      return state;
  }
}


function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

let store = createStore(reducer) // createStore takes the reducer as an argument
store.dispatch({ type: '@@INIT' });
let button = document.getElementById('button');

button.addEventListener('click', function() {
  store.dispatch({ type: 'INCREASE_COUNT' });
});