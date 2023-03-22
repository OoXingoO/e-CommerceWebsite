//In NextJS, api serves the entire backend of application
//The files inside API folder is the server

import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
//In NextJS, each file has to have its own handler
export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body)
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1MoA9dBYTwIWGlvnY5tBo3Zo' },
                    { shipping_rate: 'shr_1MoADUBYTwIWGlvnP75khdmb' }
                ],
                //Modify each specific item to provide additional info:
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
                    //return object that represent one of our items
                    return {
                        price_data: {
                            currency: 'gbp',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100, //unit amount had to be in pence
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity //starting quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);

        } catch (error) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
