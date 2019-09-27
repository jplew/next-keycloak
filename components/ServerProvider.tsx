/*
 * Author: JP Lew (jp@cto.ai)
 * Date: Tuesday, 9th July 2019 2:05:48 pm
 * Last Modified By: JP Lew (jp@cto.ai)
 * Last Modified Time: Tuesday, 9th July 2019 2:05:49 pm
 *
 * DESCRIPTION
 *
 * Copyright (c) 2019 CTO.ai
 */

import { Component } from "react"
import { ServerContext, ServerState } from "../utils/context"

export class ServerProvider extends Component<ServerState, ServerState> {
  state = {
    isAuthenticated: this.props.isAuthenticated,
    isServer: true
  }

  render() {
    const { isAuthenticated, isServer } = this.state
    return (
      <ServerContext.Provider
        value={{
          isAuthenticated,
          isServer,
          setIsAuthenticated: (isAuthenticated: string) =>
            this.setState({
              isAuthenticated
            })
        }}
      >
        {this.props.children}
      </ServerContext.Provider>
    )
  }
}
