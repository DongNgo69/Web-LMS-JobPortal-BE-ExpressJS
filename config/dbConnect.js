const mongoose = require('mongoose')

const dbConnect = () => {
    try {
        const connection = mongoose.connect(process.env.MONGODB_URI)
        console.log('Kết nối tới DB thành công')
    } catch (e) {
        console.error(e)
    }
}

module.exports = dbConnect;