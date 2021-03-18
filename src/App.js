import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Departamentos from "./Pages/Departamentos";
import Articulos from "./Pages/Articulos";
import UnidadesMedida from "./Pages/UnidadesMedida";
import Proveedores from "./Pages/Proveedores";
import OrdenCompra from "./Pages/OrdenCompra";
import About from "./Pages/About";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/departamentos">
          <Departamentos />
        </Route>
        <Route path="/articulos">
          <Articulos />
        </Route>
        <Route path="/unidadesmedida">
          <UnidadesMedida />
        </Route>
        <Route path="/proveedores">
          <Proveedores />
        </Route>
        <Route path="/ordencompra">
          <OrdenCompra />
        </Route>
        <Route path="/sobrenosotros">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
