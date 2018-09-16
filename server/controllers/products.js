import { Router } from 'express'
import { category, productImages, erase, update, userUploads, show } from '../models/product'
import { id } from '../models/user'

const products = Router()

const details = async (req,res)=> {
    const { id } = req.params
    const general = {}
    const type = {}
    try {
        const { kind } = await category(id)
        const product = await show(kind, id)
        let count = 0
        for (var i in product) {
            (count < 7) ? general[i] = product[i] : type[i] = product[i]
            count++
        }
        res.send({ 
            status: 200,
            product: {
                general,
                type
            }
        })
    } catch (e) {
        console.log(e)
        res.send({ 
            status: 404
        })
    }
}

const images = async (req, res) => {
    try {
        const images = await productImages(req.params.id)
        res.send({ 
            status: 200,
            images
        })
    } catch (e) {
        console.log(e)
        res.send({
            status: 404
        })
    }
}

const contacts =  async (req, res) => {
    try {
        const contact = await id(req.params.id)
        delete contact['password']
        delete contact['email']
        res.send({ 
            status: 200,
            contact
        })
    } catch (e) {
        console.log(e)
        res.send({
            status: 404
        })
    }
}

const userPosts = async (req, res) => {
    try {    
        const products = await userUploads(req.user.person_id)
        res.send({ 
            status: 200,
            products 
        })
    } catch (e) {
        res.send({ 
            status: 404,
        })
    }
}

products.get('/detail/:id', details)
products.get('/images/:id', images)
products.get('/contact/:id', contacts)
products.get('/by_user', userPosts)

// products.get('/delete/:id', (req, res) => {
//     product.delete_product(req.params.id).then(data=>{
//         res.send({msg:data});
//     }).catch((err)=> {
//         res.send({ 
//         status: 500
//         })  
//     })
// })

// products.post('/update/', (req, res)=> {
//   product.update_product(req.body.price, req.body.description,  req.body.stock, req.body.type_supplier, req.body.brand, req.body.department, req.body.code, req.body.product_id).then((data)=> {
//         res.send({msg:data});
//         }).catch((err)=> {
//             throw err;
//     });
// });



export default products