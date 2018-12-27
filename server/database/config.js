const { DB_CLIENT, DB_PORT, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env

const config = {
    dbUrl: `${DB_CLIENT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    port: 3000
}

module.exports = { config }
