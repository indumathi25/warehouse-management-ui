import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Controller from "./components/Controller";
import ListProduct from "./components/ListProduct";
import SellProduct from "./components/SellProduct";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Controller} />
        <Route exact path="/productlist" component={ListProduct} />
        <Route exact path="/sellproduct" component={SellProduct} />
      </Switch>
    </Router>
  );
}

export default App;
