import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap';
import ProductCard from '../../Product/ProductCard'

const HomeScreen = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get('/api/products');
            setProducts(data);
        }
        fetchProducts();
    }, [])

    return (
        <>
            <h1><i>Latest</i></h1>
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
