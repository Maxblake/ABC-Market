export const user = {
    by_username: 'SELECT * FROM person where username = $1',
    by_id: 'SELECT * FROM person where person_id = $1',
    new: 'INSERT INTO person (name, lastname, code, phonenumber, username, password, gender, type, birthDate, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning username, password',
    trades_details: 'select product.title, product.type, trade.trade_id, trade.buyer_id, trade.seller_id from product inner join trade on trade.product_id = product.product_id inner join person on trade.buyer_id = person.person_id or trade.seller_id = person.person_id where person.person_id = $1',
    contact_details: 'select name, profile_img, code, phonenumber from person where person_id = $1'
}

export const trade = {
    new: 'INSERT INTO trade (product_id, seller_id, buyer_id) VALUES ($1, $2, $3) returning trade_id',
    check: 'select * from trade where product_id = $1 and seller_id = $2 and buyer_id = $3'
}

export const chat = {
    show: 'SELECT sender_id as id, message as msg, time FROM chat_hist WHERE trade_id = $1 ORDER BY time LIMIT 15',
    new_message: 'INSERT INTO chat_hist (trade_id, sender_id, message, time) VALUES ($1, $2, $3, $4)'
}

export const product  = {
    images: 'select array(select url from image where product_id=$1) as product_images',
    add_images: 'insert into image (product_id, url) values ($1, $2)',
    type: 'select type as kind from product where product_id = $1',
    show_article: 'select product.*, article.* from person inner join product on person.person_id = product.person_id inner join article on product.product_id = article.product_id where product.product_id = $1',
    show_offer: 'select product.*, offer.* from person inner join product on person.person_id = product.person_id inner join offer on product.product_id = offer.product_id where product.product_id = $1',
    show_place: 'select product.*, place.* from person inner join product on person.person_id = product.person_id inner join place on product.product_id = place.product_id where product.product_id = $1',
    show_service: 'select product.*, service.* from person inner join product on person.person_id = product.person_id inner join service on product.product_id = service.product_id where product.product_id = $1',
    show_vehicle: 'select product.*, vehicle.* from person inner join product on person.person_id = product.person_id inner join vehicle on product.product_id = vehicle.product_id where product.product_id = $1',
    user_uploads: 'select distinct on (product.product_id) product.title, product.type, image.url as image from product inner join image on product.product_id = image.product_id where product.person_id = $1'
}

export const article = {
    new: 'with new_product as (insert into product (person_id, title, description, type, category, location, post_time) values ($1, $2, $3, $4, $5, $6, $7) returning product_id) insert into article (product_id, stock, price, used, link) values ((select product_id from new_product), $8, $9, $10, $11) returning product_id',
    latest: 'select distinct on (product.product_id) product.title as name, article.used as condition, product.product_id, article.price, image.url as image from product inner join article on product.product_id = article.product_id inner join image on product.product_id = image.product_id order by product.product_id desc',
    delete: 'delete from article where article_id = $1',
    by_genre: 'select distinct on (product.product_id) product.title as name, article.used as condition, product.product_id, article.price, image.url as image from product inner join article on product.product_id = article.product_id inner join image on product.product_id = image.product_id where product.category = $1 order by product.product_id desc',
    search: 'select distinct on (product.product_id) product.title as name, article.used as condition, product.product_id, article.price, image.url as image from product inner join article on product.product_id = article.product_id inner join image on product.product_id = image.product_id where product.title like $1 and product.type = \'article\' and product.category = $2 order by product.product_id desc'    
}

export const offer = {
    new: 'with new_product as (insert into product (person_id, title, description, type, category, location, post_time) values ($1, $2, $3, $4, $5, $6, $7) returning product_id) insert into offer (product_id, address, price) values ((select product_id from new_product), $8, $9) returning product_id',
    latest: 'select distinct on (product.product_id) product.product_id, product.title, product.description, offer.price, image.url as image from person inner join product on person.person_id = product.person_id inner join offer on product.product_id = offer.product_id inner join image on product.product_id = image.product_id order by product.product_id desc',
    delete: 'delete from offer where offer_id = $1',
    by_genre: 'select distinct on (product.product_id) product.product_id, product.title, product.description, offer.price, image.url as image from person inner join product on person.person_id = product.person_id inner join offer on product.product_id = offer.product_id inner join image on product.product_id = image.product_id where product.category = $1 order by product.product_id desc',
    search: 'select distinct on (product.product_id) product.product_id, product.title, product.description, offer.price, image.url as image from person inner join product on person.person_id = product.person_id inner join offer on product.product_id = offer.product_id inner join image on product.product_id = image.product_id where product.title like $1 and product.type = \'offer\' and product.category = $2 order by product.product_id desc'
}

export const place = {
    new: 'with new_product as (insert into product (person_id, title, description, type, category, location, post_time) values ($1, $2, $3, $4, $5, $6, $7) returning product_id) insert into place (product_id, specification, schedule, address, link) values ((select product_id from new_product), $8, $9, $10, $11) returning product_id',
    latest: 'select distinct on (product.product_id) product.title, product.product_id, product.description, place.specification, image.url as image, place.schedule from person inner join product on person.person_id = product.person_id inner join place on product.product_id = place.product_id inner join image on place.product_id = image.product_id order by product.product_id desc',
    delete: 'delete from place where place_id = $1',
    by_genre: 'select distinct on (product.product_id) product.title, product.product_id, product.description, place.specification, image.url as image, place.schedule from person inner join product on person.person_id = product.person_id inner join place on product.product_id = place.product_id inner join image on place.product_id = image.product_id where product.category = $1 order by product.product_id desc',
    search: 'select distinct on (product.product_id) product.title, product.product_id, product.description, place.specification, image.url as image, place.schedule from person inner join product on person.person_id = product.person_id inner join place on product.product_id = place.product_id inner join image on place.product_id = image.product_id where product.description like $1 and product.type = \'place\' and product.category = $2 order by product.product_id desc'
}

export const service = {
    new: 'with new_product as (insert into product (person_id, title, description, type, category, location, post_time) values ($1, $2, $3, $4, $5, $6, $7) returning product_id) insert into service (product_id) values ((select product_id from new_product))',
    latest: 'select person.name, product.product_id, product.title, product.description, person.profile_img as image from person inner join product on person.person_id = product.person_id inner join service on product.product_id = service.product_id order by product.product_id desc',
    delete: 'delete from service where service_id = $1',
    by_genre: 'select person.name, product.product_id, product.title, product.description, person.profile_img as image from person inner join product on person.person_id = product.person_id inner join service on product.product_id = service.product_id where product.category = $1 order by product.product_id desc',
    search: 'select person.name, product.product_id, product.title, product.description, person.profile_img as image from person inner join product on person.person_id = product.person_id inner join service on product.product_id = service.product_id where product.product_id like $1 and product.type = \'service\' and product.category = $2 order by product.product_id desc'
}

export const vehicle = {
    new: 'with new_product as (insert into product (person_id, title, description, type, category, location, post_time) values ($1, $2, $3, $4, $5, $6, $7) returning product_id) insert into vehicle (product_id, brand, model, distance, year, fuel, negotiable, finance, int_material, unique_owner, windows, pilot_seat, air_cond) values ((select product_id from new_product), $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) returning product_id',
    all: 'select distinct on (product.product_id) product.product_id, product.description, vehicle.brand, vehicle.model, person.name, image.url as image from person inner join product on person.person_id = product.person_id inner join vehicle on product.product_id = vehicle.product_id inner join image on product.product_id = image.product_id order by product.product_id desc',
    delete: 'delete from vehicle where vehicle_id = $1',
    search: 'select distinct on (product.product_id) product.product_id, product.description, vehicle.brand, vehicle.model, person.name, image.url as image from person inner join product on person.person_id = product.person_id inner join vehicle on product.product_id = vehicle.product_id inner join image on product.product_id = image.product_id where product.description like $1 order by product.product_id desc',
}

