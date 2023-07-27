import { Route, Switch } from "wouter"
import AppLayout from "./layouts/Layout"
import Dashboard from "./views/app/Dashboard"
import Profile from "./views/app/Account/Profile"
import SignIn from "./views/SignIn"
import AuthLayout from "./layouts/AuthLayout"
import Password from "./views/app/Account/Password"

function Router() {
  return (
    <Switch>
      <Route path="/app/:rest*">
        <Switch>
          <AppLayout>
            <Route path="/app"><Dashboard /></Route>
            <Route path="/app/account/profile"><Profile /></Route>
            <Route path="/app/account/password"><Password /></Route>
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