import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideNav } from "../SideNav/SideNav";

export function GridWrapper() {
  return (
    <Grid container>
      <Grid item xs={1}>
        <SideNav />
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
