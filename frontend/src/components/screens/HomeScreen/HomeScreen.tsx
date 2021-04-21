import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../../../actions/productActions'
import {RootState} from '../../../store'
import Product from '../../../models/Product'
import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap';
import ProductCard from '../../Product/ProductCard'

const HomeScreen = () => {

    const dispatch = useDispatch()
    // const products: Array<Product> = []

    const productList: ProductsReducer = useSelector<RootState>(state => state.productList) as ProductsReducer
    const {loading, error, products} = productList

    useEffect(() => {
       dispatch(listProducts())
    }, [dispatch])

    type ProductsReducer = {
        loading?: String,
        error?: String,
        products?: Array<Product> 
    }

    return (
        <>
            <h1><i>Latest</i></h1>
            <Row>
                {products?.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <ProductCard {...product}></ProductCard>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
