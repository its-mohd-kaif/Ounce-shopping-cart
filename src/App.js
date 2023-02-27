import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Cart from "./components/Cart";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navbar />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </>
    )
  );
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
