import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import movies from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action !== "function") {
      console.log("ACTION_TYPE = ", action.type);
    }
    next(action);
  };
// const logger = function ({ dispatch,getState }){
//   return function (next){
//     return function(action){
//       //middleware code
//       //console.log('ACTION_TYPE = ',action.type),
//       next(action);
//     }
//   }
// }
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export const StoreContext = createContext();

console.log("StoreContext", StoreContext);
// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// })

class Provider extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
