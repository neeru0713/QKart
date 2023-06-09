import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
// import { Check } from "@mui/icons-material";
// import Thanks from "./components/Thanks";

export const config = {
  endpoint: `https://qkart-frontend-5kte.onrender.com/api/v1`,
};

function App() {
  return (
    <div className="App">
          <Switch >
            <Route path={"/register"}>
              <Register />
            </Route>
            <Route path={"/login"}>
              <Login/>
            </Route>
            <Route path={"/checkout"}>
              <Checkout/>
            </Route>
            <Route extact path={"/"}>
              <Products/>
            </Route>
          </Switch>
    </div>
  );
}

export default App;
