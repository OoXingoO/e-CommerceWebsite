//Product details file
import React, { useState } from 'react';
import { client, urlFor } from '../../../library/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../../components';
import { useStateContext } from '../../../context/StateContext';

const ProductDetails = ({ product, products }) => {

    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { minusQty, addQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    }

    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlFor(image && image[index])} className='product-detail-image' />
                    </div>
                    <div className='small-images-container'>
                        {image?.map((item, i) => ( //loop through each individual item and indexes
                            <img
                                key={i}
                                src={urlFor(item)}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)} //enables selecting image on hover and make it visible on bigger display
                            //onMouseEnter is when the pointer is moved onto an element
                            />
                        ))}
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details</h4>
                    <p>{details}</p>
                    <p className='price'>£{price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={minusQty}><AiOutlineMinus /></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={addQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to cart</button>
                        <button type='button' className='buy-now' onClick={handleBuyNow}>Buy now</button>
                    </div>
                </div>
            </div>
            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee' /* list of scrolling divs*/>
                    <div className='maylike-products-container track'>
                        {products.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => { //required if using getStaticProps
    //needs to define a list of paths to be statically generated
    const productsQuery = `*[_type == "product"] {
    slug {
      current
    }
  }
  `; //return all the products with current slug property

    const products = await client.fetch(productsQuery);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking' //getStaticProps is called before initial render when using fallback: blocking
    }
}

export const getStaticProps = async ({ params: { slug } }) => { //pre-render page at built time using props returned 
    const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`; //fetch 1st product that match current slug string
    const productsQuery = '*[_type == "product"]'; //fetch all products
    const product = await client.fetch(productQuery); //to obtain individual product
    const products = await client.fetch(productsQuery);

    console.log(product);

    return {
        props: { products, product }
    }
}
export default ProductDetails;

//[slug] inside square bracket will be dynamic