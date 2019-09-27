import { Component } from "react"

import { KeycloakInstance } from "keycloak-js"
import { ProviderProps, KeycloakEvent } from "react-keycloak"

import { KeycloakContext } from "../utils/context"

const initialState = {
  keycloakInitialized: false,
  token: undefined
}

export class KeycloakProvider extends Component<ProviderProps> {
  static defaultProps: any

  state = { ...initialState }
  _isMounted = false

  constructor(props: any) {
    super(props)

    const { keycloak } = props
    if (!keycloak) {
      throw new Error("KeycloakProvider requires 'keycloak' prop to be defined")
    }
  }

  componentDidMount() {
    this._isMounted = true
    this.init()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidUpdate({
    keycloak: prevKeycloak
  }: {
    keycloak: KeycloakInstance
  }) {
    if (this.props.keycloak !== prevKeycloak) {
      // De-init previous Keycloak instance
      prevKeycloak.onReady = undefined
      prevKeycloak.onAuthSuccess = undefined
      prevKeycloak.onAuthError = undefined
      prevKeycloak.onAuthRefreshSuccess = undefined
      prevKeycloak.onAuthRefreshError = undefined
      prevKeycloak.onAuthLogout = undefined
      prevKeycloak.onTokenExpired = undefined

      // Reset state
      this.setState({ ...initialState })
      // Init new Keycloak instance
      this.init()
    }
  }

  init() {
    const { initConfig, keycloak } = this.props

    // Attach Keycloak listeners
    keycloak.onReady = this.updateState("onReady")
    keycloak.onAuthSuccess = this.updateState("onAuthSuccess")
    keycloak.onAuthError = this.onKeycloakError("onAuthError")
    keycloak.onAuthRefreshSuccess = this.updateState("onAuthRefreshSuccess")
    keycloak.onAuthRefreshError = this.onKeycloakError("onAuthRefreshError")
    keycloak.onAuthLogout = this.updateState("onAuthLogout")
    keycloak.onTokenExpired = this.refreshKeycloakToken("onTokenExpired")

    keycloak.init({ ...initConfig })
  }

  onKeycloakError = (event: KeycloakEvent) => (error?: any) => {
    const { onError, onEvent } = this.props
    // @Deprecated: Remove on next major
    onError && onError(error)

    // Notify Events listener
    onEvent && onEvent(event, error)
  }

  updateState = (event: KeycloakEvent) => () => {
    const { keycloak, onEvent, onToken, onTokens } = this.props
    const {
      keycloakInitialized: prevInitialized,
      token: prevToken
    } = this.state
    const { idToken, refreshToken, token: newToken } = keycloak

    // Notify Events listener
    onEvent && onEvent(event)

    // Avoid double-refresh if state hasn't changed
    if (!prevInitialized || newToken !== prevToken) {
      this.setState({
        initialized: true,
        token: newToken
      })
    }

    // Notify token listener, if any
    if (newToken !== prevToken) {
      // @Deprecated: Remove on next major
      onToken && onToken(newToken)

      if (!idToken || !refreshToken) {
        return
      }

      onTokens &&
        onTokens({
          idToken,
          refreshToken,
          token: newToken
        })
    }
  }

  refreshKeycloakToken = (event: KeycloakEvent) => () => {
    const { keycloak, onEvent } = this.props
    // Notify Events listener
    onEvent && onEvent(event)

    // Refresh Keycloak token
    keycloak.updateToken(10)
  }

  render() {
    const { children, keycloak, LoadingComponent } = this.props
    const { keycloakInitialized } = this.state

    if (!keycloakInitialized && Boolean(LoadingComponent)) {
      return LoadingComponent
    }

    return (
      <KeycloakContext.Provider value={{ keycloakInitialized, keycloak }}>
        {children}
      </KeycloakContext.Provider>
    )
  }
}

KeycloakProvider.defaultProps = {
  initConfig: {
    onLoad: "check-sso"
  },
  LoadingComponent: null,
  onError: null,
  onEvent: null,
  onToken: null
}
