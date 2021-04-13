import React from 'react'
import products from '../../../products.json';
import {Row, Col} from 'react-bootstrap';
import ProductCard from '../../Product/ProductCard'

const HomeScreen = () => {
    return (
        <>
            <h1>Latest</h1>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <ProductCard {...product}></ProductCard>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
