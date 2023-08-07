import { Route, Switch } from "wouter"
import AppLayout from "./layouts/Layout"
import Dashboard from "./views/app/Dashboard"
import Profile from "./views/app/Account/Profile"
import Password from "./views/app/Account/Password"
import SignIn from "./views/SignIn"
import AuthLayout from "./layouts/AuthLayout"
import Create_Agent from "./views/app/Management/Create_Agent"
import Members_Agents from "./views/app/Management/Members_Agents"

function Router() {
  return (
    <Switch>
      <Route path="/app/:rest*">
        <Switch>
          <AppLayout>
            <Route path="/app"><Dashboard /></Route>
            <Route path="/app/account/profile"><Profile /></Route>
            <Route path="/app/account/password"><Password /></Route>
            <Route path="/app/manage/create-agent"><Create_Agent /></Route>
            <Route path="/app/manage/members-agents"><Members_Agents /></Route>
          </AppLayout>
          <Route>404, Not Found!</Route>
        </Switch>
      </Route>

      <Route path="/">
        <Switch>
          <AuthLayout>
            <Route path="/" component={SignIn} />
          </AuthLayout>
          <Route>404, Not Found!</Route>
        </Switch>
      </Route>
    </Switch>
  )
}

export default Router