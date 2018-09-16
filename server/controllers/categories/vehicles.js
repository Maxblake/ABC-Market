import multer from 'multer'
import { Router } from 'express'
import cloudinary from 'cloudinary'
import {  all, byGenre, search, create, erase } from '../../models/category/vehicle'
import { addImage } from '../../models/product'
import { cloudinary_config } from '../../helpers/util';

const vehicles = Router()
const upload = multer({dest: "./uploads/"});

cloudinary.config(cloudinary_config)
  
const allVehicles = async (req, res) => {
    try {   
        const vehicles = await all()
        for (var i in vehicles) {
            const images = await product.images(vehicles[i].product_id)
            vehicles[i]['img'] = images[0]
        }
        res.send({ 
            status: 200,
            vehicles
        })
    } catch (error) {
        console.log(error)
        res.send({ status: 404 })
    }
}

const category = async (req, res) => {
    try {   
        const products = await all()
        res.send({ 
            status: 200,
            products
        })
    } catch (error) {
        console.log(error)
        res.send({ status: 404 })
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

const createVehicle = async (req, res) => {
    const { brand, model, distance, year, fuel, negotiable, finance, interior, unique_owner, windows, steer, ac, time, location, description, post_time } = req.body
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
        create(req.user.person_id, null, description, 'vehicle', null, location, post_time, brand, model, distance, year, fuel, negotiable, finance, interior, unique_owner, windows, steer, ac).then(async new_product => {
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
    vehicle.edit( ).then(data => {
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
    vehicle.delete(id).then(data => {
        res.send({ 
            status: 200
        })
    }).catch(err => {
        res.send({ 
            status: 404
        })
    })
}

vehicles.get('/all', allVehicles)
vehicles.get('/category/:category', category)
vehicles.post('/search', find)
vehicles.post('/new', upload.array('files[]'), createVehicle)

vehicles.post('/edit', edit)
vehicles.post('/erase', drop)

export default vehicles