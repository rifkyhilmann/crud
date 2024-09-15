const prisma = require('../../../prisma/prismaClient')

exports.deleteUser = async (req, res) => {
    const {id} = req.params

    try {
        const deleteData = await prisma.user.delete({
            where : {
                id : parseInt(id)
            }
        })
        res.status(200).send("Succes")
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}