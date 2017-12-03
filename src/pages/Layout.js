import React from 'react'
import Flex from '../components/Flex'

import './Layout.css'

import { Icon } from 'react-fa'

import { Route } from 'react-router-dom'

export default class Layout extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            searchQuery: ""
        }
    }

    handleSearchInput(ev) {
        this.setState({ searchQuery: ev.target.value })
    }

    handleSearchSubmit(ev, history) {
        history.push('/items?q=' + this.state.searchQuery)
    }

    render() {
        return (
            <Route render={({ history }) => (
                <Flex.Column stretch style={{ height: '100%' }}>
                    <nav className="flex-row center-a center-b search-bar">
                        <div className="res-img logo-img" />
                            <form action={"javascript:void(0)"}
                                className="search-input-wrap flex-row stretch"
                                onSubmit={ev => this.handleSearchSubmit(ev, history)}>
                                    <input ref={input => this.searchInput = input}
                                        placeholder="Buscar produtos..."
                                        className="search-input"
                                        onChange={this.handleSearchInput.bind(this)} />
                                <Flex.Column centerA centerB className="search-btn" onClick={() => this.searchInput.focus()}>
                                    <span className="flex-col" style={{ color: '#777' }}>
                                        <Icon name="search" />
                                    </span>
                                </Flex.Column>
                            </form>
                    </nav>
                    <main className="flex-col flex" style={{ overflowY: 'auto', backgroundColor: 'rgb(238, 238, 238)' }}>
                        { this.props.children }
                    </main>
                </Flex.Column>
            )} />
        )
    }
}