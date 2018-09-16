import multer from 'multer'
import { Router } from 'express'
import cloudinary from 'cloudinary'
import {  latest, byGenre, search, create, erase } from '../../models/category/article'
import { addImage } from '../../models/product'
import { cloudinary_config } from '../../helpers/util';

const articles = Router()
const upload = multer({dest: "./uploads/"});

cloudinary.config(cloudinary_config)
  
const latestArticles = async (req, res) => {
    try {   
        const products = await latest()
        res.send({ 
            status: 200,
            products
        })
    } catch (error) {
        console.log(err)
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

const createArticle = async (req, res) => {
    const { category, description, title, stock, price, used, link, post_time, location } = req.body
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
        create(req.user.person_id, title, description, 'article', category, location, post_time, stock, price, used, link).then(async new_product => {
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
    article.edit( ).then(data => {
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
    article.delete(id).then(data => {
        res.send({ 
            status: 200
        })
    }).catch(err => {
        res.send({ 
            status: 404
        })
    })
}

articles.get('/latest', latestArticles)
articles.get('/category/:category', category)
articles.post('/search', find)
articles.post('/new', upload.array('files[]'), createArticle)

articles.post('/edit', edit)
articles.post('/erase', drop)

export default articles