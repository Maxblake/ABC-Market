import multer from 'multer'
import { Router } from 'express'
import cloudinary from 'cloudinary'
import { latest, byGenre, search, create, erase } from '../../models/category/place'
import { addImage } from '../../models/product'
import { cloudinary_config } from '../../helpers/util';

const places = Router()
const upload = multer({dest: "./uploads/"});

cloudinary.config(cloudinary_config)
  
const latestPlaces = async (req, res) => {
    try {   
        const products = await latest()
        res.send({ 
            status: 200,
            products
        })
    } catch (error) {
        console.log(error)
        res.send({ status: 404 })
    }
}

const category = async (req, res) => {
    const { category } = req.params
    try {
        const products = await byGenre(category)
        res.send({ 
            status: 200,
            products
        })
    } catch (err) {
        console.log(err)
        res.send({ status: 500 })
    }
}

const find = async (req, res) => {
    const { name, category } = req.body
    try {
        const products = await search(name, category)
        res.send({ 
            status: 200,
            products
        })
    } catch (err) {
        console.log(err)
        res.send({ status: 500 })
    }
}

const createPlace = async (req, res) => {
    const { title, description, category, specialty, schedule, address, post_time, link, location } = req.body
    const multipleUpload = new Promise(async (res, rej) => {
        let arr = []
        for (var i in req.files) {
            await cloudinary.uploader.upload(req.files[i].path, result => {
                if (result.error) return rej(result.error)
                arr.push(result.secure_url);
                if (arr.length === req.files.length) {
                    res(arr);
                }
            })
        }
    })

    const consume = await multipleUpload.then(data => {
        create(req.user.person_id, title, description, 'place', category, location, post_time, specialty, schedule, address, link).then(async new_product => {
            const { product_id } = new_product
            try {
                for (var i in data) {
                    const add = await addImage(product_id, data[i])
                }
                res.send({ status: 200 })
            } catch (err) {
                console.log(err)
                res.send({ status: 404 })
            }
        }).catch(err => {
            console.log(err)
            res.send({ status: 500 })
        })
    }).catch(err => {
        console.log(err)
        res.send({ status: 400 })
    })
}

const edit = (req, res) => {
    const {   } = req.body
    place.edit( ).then(data => {
        res.send({
            status: 200
        })
    }).catch(err => {
        res.send({
            status: 403
        })
    })
}

const drop = (req, res) => {
    const { id } = req.body
    place.delete(id).then(data => {
        res.send({ 
            status: 200
        })
    }).catch(err => {
        res.send({ 
            status: 404
        })
    })
}

places.get('/latest', latestPlaces)
places.get('/category/:category', category)
places.post('/search', find)
places.post('/new', upload.array('files[]'), createPlace)

places.post('/edit', edit)
places.post('/erase', drop)

export default places