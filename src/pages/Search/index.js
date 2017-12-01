import React from 'react'
import Flex from '../../components/Flex'

const ML_SEARCH_URL = "http://localhost:8000/api/items"

export default class Search extends React.Component {

    constructor(props, context) {
        super(props, context)

        const searchQuery = new URLSearchParams(this.props.location.search).get('q')

        this.state = {
            searchQuery,
            loading: true,
            items: []
        }
    }

    fetchItems() {
        return fetch(`${ML_SEARCH_URL}?q=${this.state.searchQuery}`).then(r => r.json())
    }

    componentWillMount() {
        this.fetchItems().then(({ items }) => this.setState({ items, loading: false }))
    }

    render() {
        return (
            <Flex.Row flex centerA>
                <Flex.Column className="page">
                    {
                        this.state.loading ? (
                            <Flex.Row centerA>
                                <div className="res-img spinner" />
                            </Flex.Row>
                        ) : (
                            this.state.items.length === 0 ? (
                                <h5 style={{ color: '#969696', margin: 0 }}> Nenhum item encontrado. </h5>
                            ) : (
                                <Flex.Column>
                                    <h5 style={{ color: '#969696', margin: 0 }}> Resultados da busca por "{ this.state.searchQuery }"</h5>
                                    {
                                        this.state.items.map(item =>
                                            <div className="list-item" />
                                        )
                                    }
                                </Flex.Column>
                            )
                        )
                    }
                </Flex.Column>
            </Flex.Row>
        )
    }
}