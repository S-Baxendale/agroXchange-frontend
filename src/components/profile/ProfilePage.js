import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUser } from "../../actions/users"
import * as combine from "lodash/fp/compose"
import { translate } from "react-i18next"
import Profile from "./Profile"
import Button from "material-ui/Button"

class ProfilePage extends PureComponent {
  componentWillMount(props) {
    if (this.props.authenticated) {
      this.props.fetchUser(this.props.match.params.id)
    }
  }

  render() {
    const { authenticated, t } = this.props
    if (!authenticated) return <Redirect to="/login" />
    return (
      <div>
        <Button
          onClick={() => this.props.history.goBack()}
          size="medium"
          color="primary"
          style={{ display: "flex", flex: 1, margin: 15 }}
        >
          {t("goBack")}
        </Button>
        <Profile />
      </div>
    )
  }
}

const mapStateToProps = ({ user, currentUser }, props) => ({
  authenticated: currentUser !== null,
  user
})

const mapDispatchToProps = {
  fetchUser
}

export default combine(
  translate("user"),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfilePage)
