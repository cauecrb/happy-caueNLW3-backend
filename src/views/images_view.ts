import Image from '../models/image';

export default {
    render(image: Image){
        return{           
            id: image.id,
            url: `${process.env.API_URL}/${image.path}`
        };
    },

    renderMany(images: Image[]){
        return images.map((image) => this.render(image));
    },
};