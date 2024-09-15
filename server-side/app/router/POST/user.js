const prisma = require('../../../prisma/prismaClient')

exports.postUser = async (req, res) => {
    const { username, firstname, lastname, password, email } = req.body

    try {
        const postData = await prisma.user.create({
            data : {
                username,
                firstname,
                lastname,
                password,
                email
            }
        })
        res.status(200).send("Succes")
    } catch (error) {   
        console.log(error)
        res.status(500).send("Server Error")
    }
}