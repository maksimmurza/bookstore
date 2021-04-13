import React from 'react'
import {Card} from 'react-bootstrap';
import Product from '../../models/Product'
import './ProductCard.scss';

const ProductCard = (props: Product) => {
    return (
        <>
            <Card className='my-3 p-3 rounded'>
                <a href={`/product/${props.id}`}>
                    <Card.Img src={props.image} variant='top'></Card.Img>
                </a>
                    
                <Card.Body>
                <a href={`/product/${props.id}`}>
                    <Card.Title as='div'><strong>{props.name}</strong></Card.Title>
                </a>

                <Card.Text as='div'>
                    <div className='my-3'>
                        {props.rating} from {props.reviews} reviews
                    </div>
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
