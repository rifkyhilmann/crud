const prisma = require('../../../prisma/prismaClient')

exports.getAllUser = async (req, res) => {
    try {
        const getData = await prisma.user.findMany()
        res.status(200).send(getData)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}

exports.getUserById = async (req, res) => {
    const {id} = req.params

    try {
        const getData = await prisma.user.findMany({
            where : {
                id : parseInt(id)
            }
        })
        res.status(200).send(getData)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}
