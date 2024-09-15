const prisma = require('../../../prisma/prismaClient')

exports.updateUser = async (req, res) => {
    const {id} = req.params
    const { username, firstname, lastname, password, email } = req.body

    try {
        const postData = await prisma.user.update({
            where : {
                id : parseInt(id)
            },
            data : {
                username : username,
                firstname : firstname,
                lastname : lastname,
                password : password,
                email : email
            }
        })
        res.status(200).send("Succes")
    } catch (error) {   
        console.log(error)
        res.status(500).send("Server Error")
    }
}