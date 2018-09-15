import multer from 'multer'
import { Router } from 'express'
import cloudinary from 'cloudinary'
import {  latest, byGenre, search, create, erase } from '../../models/category/article'
import { addImage } from '../../models/product'

const articles = Router()
const upload = multer({dest: "./uploads/"});
const { cloud_name, api_key, api_secret } = process.env

cloudinary.config({ cloud_name, api_key, api_secret })
  
const latestArticles = async (req, res) => {
        try {   
            const products = await latest()
            for (var i in products) {
                products[i]['condition'] = (i.condition == false) ? 'Used' : 'New'
            }
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
        for (var i in products) {
            products[i]['condition'] = (i.condition == false) ? 'Used' : 'New'
        }
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
        for (var i in products) {
            products[i]['condition'] = (i.condition == false) ? 'Used' : 'New'
        }
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
                console.log(i)
                if (result.error) return rej(result.error)
                arr.push(result.secure_url);
                console.log(`${i} done`)
                if (arr.length === req.files.length) {
                    res(arr);
                }
            })
        }
    })

    const consume = await multipleUpload.then(data => {
        console.log('testing')
        create(req.user.person_id, title, description, 'article', category, location, post_time, stock, price, used, link).then(async new_product => {
            const { product_id } = new_product
            for (var i in data) {
                try {
                    await addImage(product_id, data[i])
                } catch (err) {
                    console.log(err)
                    res.send({ status: 404 })
                }
            }
            res.send({ status: 200 })
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