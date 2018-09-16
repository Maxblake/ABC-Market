import multer from 'multer'
import { Router } from 'express'
import cloudinary from 'cloudinary'
import {  latest, byGenre, search, create, erase } from '../../models/category/service'
import { addImage } from '../../models/product'
import { cloudinary_config } from '../../helpers/util';

const services = Router()
const upload = multer({dest: "./uploads/"});

cloudinary.config(cloudinary_config)
  
const latestServices = async (req, res) => {
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

const createService = async (req, res) => {
    const { title, description, category, post_time, location } = req.body
    try { 
        await create(req.user.person_id, title, description, 'service', category, location, post_time)
        res.send({ status: 200 })        
    } catch (error) {
        console.log(error)
        res.send({ status: 500 })
    }
}

const edit = (req, res) => {
    const {   } = req.body
    service.edit( ).then(data => {
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
    service.delete(id).then(data => {
        res.send({ 
            status: 200
        })
    }).catch(err => {
        res.send({ 
            status: 404
        })
    })
}

services.get('/latest', latestServices)
services.get('/category/:category', category)
services.post('/search', find)
services.post('/new', upload.array('files[]'), createService)

services.post('/edit', edit)
services.post('/erase', drop)

export default services