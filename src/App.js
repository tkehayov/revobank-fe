import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AccountPage } from "./pages/AccountPage";
import { SideNav } from "./components/SideNav/SideNav";
import { Grid } from "@mui/material";
import { TransferPage } from "./pages/TransferPage";
import { GridWrapper } from "./components/GridWrapper/GridWrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GridWrapper />}>
          <Route path="/" exact element={<AccountPage />} />
          <Route path="/transfer" exact element={<TransferPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
