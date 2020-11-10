import Image from '../models/image';

export default {
    render(image: Image){
        return{           
            id: image.id,
            url: `https://happycaue.s3.amazonaws.com/${image.path}`
        };
    },

    renderMany(images: Image[]){
        return images.map((image) => this.render(image));
    },
};