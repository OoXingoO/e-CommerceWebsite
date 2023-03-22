export default {
    name: 'product',
    title: 'Product',
    type: 'document', //make it possible to make new product document
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true, //enable user interface for selecting what areas of an image should always be cropped or not and center of area to crop around when re-sizing. Helps to better position image uploaded.
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug', //slug is typically used to create unique URLs
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name', //automatically generate unique slug based on name property
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        }
    ]
}