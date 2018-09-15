import { Router } from 'express'
import products from '../../controllers/products'
import articles from '../../controllers/categories/articles'
import offers from '../../controllers/categories/offers'
import places from '../../controllers/categories/places'
import services from '../../controllers/categories/services'
import vehicles from '../../controllers/categories/vehicles'

export default () => {
    let router = Router()
    router.use('/', products)
    router.use('/article', articles);
    // router.use('/offer', offers);
    // router.use('/place',  places);
    // router.use('/vehicle', vehicles);
    // router.use('/service', services);

    return router
}
