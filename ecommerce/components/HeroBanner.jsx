import Link from 'next/link';
import React from 'react';
import { urlFor } from '../library/client';

const HeroBanner = ({ heroBanner }) => {
    return (
        <div className='hero-banner-container'>
            <div>
                <p className='banner-solo'>{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <img src={urlFor(heroBanner.image)} alt='bobatea' className='hero-banner-image' />
                <div>
                    <Link href={`/product/${heroBanner.slug.current}`}>
                        <button type='button'>{heroBanner.buttonText}</button>
                    </Link>
                    <div className='desc'>
                        <p>{heroBanner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner