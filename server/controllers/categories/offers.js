import multer from 'multer'
import { Router } from 'express'
import cloudinary from 'cloudinary'
import {  latest, byGenre, search, create, erase } from '../../models/category/offer'
import { addImage } from '../../models/product'
import { cloudinary_config } from '../../helpers/util';

const offers = Router()
const upload = multer({dest: "./uploads/"});

cloudinary.config(cloudinary_config)
  
const latestOffers = async (req, res) => {
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

const createoffer = async (req, res) => {
    const { category, title, description, start, finish, address, price, location } = req.body
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
        const post_time = (new Date (finish) - new Date(start))/(1000*60*60*24)
        create(req.user.person_id, title, description, 'offer', category, location, post_time, address, price).then(async new_product => {
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
    offer.edit( ).then(data => {
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
    offer.delete(id).then(data => {
        res.send({ 
            status: 200
        })
    }).catch(err => {
        res.send({ 
            status: 404
        })
    })
}

offers.get('/latest', latestOffers)
offers.get('/category/:category', category)
offers.post('/search', find)
offers.post('/new', upload.array('files[]'), createoffer)

offers.post('/edit', edit)
offers.post('/erase', drop)

export default offers