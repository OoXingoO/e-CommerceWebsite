import React from 'react';
import Link from 'next/link'; //Used to link product details page
import { urlFor } from '../library/client'; //Used to get url for the image inside Sanity dashboard

const Product = ({ product: { image, name, slug, price } }) => { //destructuring product properties
    return (
        <div>
            <Link href={`/product/${slug.current}`} >
                <div className='product-card'>
                    <img src={urlFor(image && image[0])} width={250} height={250} className='product-image' />
                    <p className='product-name'>{name}</p>
                    <p className='product-price'>{price}</p>
                </div>
            </Link>
        </div>
    )
}

export default Product