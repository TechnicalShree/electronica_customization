import { Route, Switch } from "wouter";
import Dashboard from "./components/Page/Dashboard";

export default function AppRouter() {
  return (
    <Switch>
      {/* Login page for testing only */}
      {/* <Route path="/" component={LoginPage} /> */}
      <Route path="/service" component={Dashboard} />
      {/* <Route path="/service/leads" component={Leads} /> */}
      {/* <Route path="/service/leads/:id" component={LeadDetail} /> */}
      {/* <Route path="/service/visits" component={Visits} /> */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}
