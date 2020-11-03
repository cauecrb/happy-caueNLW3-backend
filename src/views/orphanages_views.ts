import Orfanato from '../models/Orfanato';
import imagesView from './images_view';

export default {
    render(orfanato: Orfanato){
        return{           
            id: orfanato.id,
            name: orfanato.name,
            latitude: Number(orfanato.latitude),
            longitude: Number(orfanato.longitude),
            sobre: orfanato.sobre,
            instrucoes: orfanato.instrucoes,
            horas_funcionamento: orfanato.horas_funcionamento,
            aberto_fds: orfanato.aberto_fds,
            images: imagesView.renderMany(orfanato.images),
        };
    },

    renderMany(orfanatos: Orfanato[]){
        return orfanatos.map(orfanato => this.render(orfanato));
    }
}