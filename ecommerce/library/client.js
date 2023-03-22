import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '4066xoqk', //tells Sanity which project to connect with
    dataset: 'production', //in development or production?
    apiVersion: '2023-03-13',
    usedCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client); //to be able to use Sanity images

export const urlFor = (source) => builder.image(source); //give access to urls where our images are stored
