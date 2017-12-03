import React from 'react'
import Flex from '../../components/Flex'

import FormatPrice from '../../components/FormatPrice'

import { Icon } from 'react-fa'

import { Link } from 'react-router-dom'

import './Search.css'

const ML_SEARCH_URL = "/api/items"

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
            <section className="page" style={{ alignSelf: 'center' }}>
                {
                    this.state.loading ? (
                        <Flex.Row centerA>
                            <div className="res-img spinner" />
                        </Flex.Row>
                    ) : (
                        this.state.items.length === 0 ? (
                            <h5 style={{ color: '#969696', margin: 0 }}> Nenhum item encontrado. </h5>
                        ) : (
                            <section>
                                <h5 style={{ color: '#969696', margin: 0 }}> Resultados da busca por "{ this.state.searchQuery }"</h5>
                                {
                                    this.state.items.map(item =>
                                        <article key={item.id} className="flex-row list-item">
                                            <div className="res-img thumbnail" style={{ backgroundImage: 'url(' + item.picture + ')' }} />
                                            <Flex.Column flex style={{ marginLeft: '7px' }}>
                                                <h3 style={{ fontWeight: 'normal', marginBottom: 0 }}> $ {FormatPrice(item.price.amount)}{item.price.decimals ? item.price.decimals.toFixed(2).replace(/^0/,''):''} </h3>
                                                <Link to={"/items/" + item.id} className="item-link"> { item.title } </Link>
                                            </Flex.Column>
                                            <Flex.Column>
                                                <button>
                                                    Incluir no Carrinho <Icon name="cart-plus" />
                                                </button>
                                            </Flex.Column>
                                        </article>
                                    )
                                }
                            </section>
                        )
                    )
                }
            </section>
        )
    }
}