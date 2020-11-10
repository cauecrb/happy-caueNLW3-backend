import { Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Orfanato from '../models/Orfanato';
import orphanageView from '../views/orphanages_views';
import * as Yup from 'yup';
import nomfotos from '../config/upload';


export default {
    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orfanato);

        const orphanages = await orphanagesRepository.find({
            relations:['images']
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response){
        const {id} = request.params;

        const orphanagesRepository = getRepository(Orfanato);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations:['images']
        });

        return response.json(orphanageView.render(orphanage));
    },


    async create(request: Request, response: Response){
        console.log(request.files);

        const {
            name,
            latitude,
            longitude,
            sobre,
            instrucoes,
            horas_funcionamento,
            aberto_fds,
        } = request.body;
        console.log('verificação de envio, antes do repositorioorfanato');
        const orphanagesRepository = getRepository(Orfanato);
    
        const requestImages = request.files as Express.Multer.File[];
        console.log(requestImages);
/*         const images = requestImages.map(image => {
            return { path: image.filename}

        }) */

        console.log('verificação de envio, images');
//        console.log(images);

        const images = requestImages.map(image => {
            return { path: image.path}

        })
      
        const data ={
            name,
            latitude,
            longitude,
            sobre,
            instrucoes,
            horas_funcionamento,
            aberto_fds: aberto_fds === 'true',
            images, 
        }
        console.log('verificação de envio antes do yup');
        const schema = Yup.object().shape({
            name: Yup.string().required('campo obrigatorio'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            sobre: Yup.string().required().max(300),
            instrucoes: Yup.string().required(),
            horas_funcionamento: Yup.string().required(),
            aberto_fds: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string()/*.required()*/
                })
            )
        });
        console.log('verificação de envio antes schema validate');
        await schema.validate(data, {
            abortEarly: false,
        })

        console.log('verificação de envio');
        console.log(data);

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    }
};