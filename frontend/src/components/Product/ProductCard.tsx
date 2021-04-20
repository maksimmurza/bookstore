import React from 'react'
import {Card} from 'react-bootstrap';
import Product from '../../models/Product'
import {Link} from 'react-router-dom'
import './ProductCard.scss';
import Rating from '../Rating/Rating'

const ProductCard = (props: Product) => {
    return (
        <>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/product/${props.id}`}>
                    <Card.Img src={props.image} variant='top'></Card.Img>
                </Link>
                    
                <Card.Body>
                <Link to={`/product/${props.id}`}>
                    <Card.Title as='div'><strong>{props.name}</strong></Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating rating={props.rating} text={`${props.numReviews} reviews`} color='gold'></Rating>
                </Card.Text>

                

                <Card.Text as='h3'>
                £{props.price}
                </Card.Text>

                </Card.Body>
            </Card>
        </>
    )
}

export default ProductCard;
