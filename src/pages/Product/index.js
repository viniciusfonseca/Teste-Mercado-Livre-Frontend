import React from 'react'
import Flex from '../../components/Flex'

import './Product.css'

const ML_ITEM_URL = "http://localhost:8000/api/items"

export default class Product extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            item: { id: props.match.params.id }
        }
    }

    getItem() {
        return fetch(`${ML_ITEM_URL}/${this.state.item.id}`).then(r => r.json())
    }

    componentWillMount() {
        this.getItem().then(({ item }) => this.setState({ item, loading: false }))
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
                    <div>
                        <Flex.Row>
                            <div className="res-img item-pic" style={{ flex: 7, backgroundImage: 'url(' + this.state.item.picture + ')' }} />
                            <Flex.Column style={{ flex: 3 }}>
                                <h4 style={{ fontWeight: 'normal' }}>
                                    { this.state.item.title }
                                </h4>
                                <span className="flex-row" style={{ marginTop: 0, fontSize: '44px' }}>$ { this.state.item.price.amount }
                                    <span style={{ marginTop: '6px', fontSize: '20px' }}>{ (this.state.item.price.decimals).toString().padStart(2, '0') }</span>
                                </span>
                                <button className="item-buy">
                                    Comprar
                                </button>
                            </Flex.Column>
                        </Flex.Row>
                        <h2 style={{ fontWeight: 'normal' }}> Descrição do Produto </h2>
                        <p style={{ whiteSpace: 'pre-line' }}> { this.state.item.description || <em> Este produto não possui uma descrição disponível. </em> } </p>
                    </div>
                )
            }
            </section>
        )
    }
}