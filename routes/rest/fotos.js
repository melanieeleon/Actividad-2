const express = require('express');
const router = express.Router();
module.exports = router;
const { Sequelize, Op } = require('sequelize');
const foto = require('../../models').foto;
const etiqueta = require('../../models').etiqueta;

/*get all */
router.get('/findAll/json', async (req, res) => {
    try {
        const fotos = await foto.findAll({
            attributes: { exclude: ["updatedAt", "createdAt"] },
            include: [{
                model: etiqueta,
                attributes: ['texto'],
                through: { attributes: [] }
            }]
        });
        res.json(fotos);
    } catch (error) {
        res.status(400).send(error);
    }
});
/*get id */
router.get('/findById/:id/json', function (req, res,
    next) {
    let id = parseInt(req.params.id);
    foto.findAll({
        attributes: {
            exclude: ["updatedAt",
                "createdAt"]
        },
        include: [{
            model: etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            [Op.and]: [
                { id: id }
            ]
        }
    })
        .then(fotos => {
            res.json(fotos);
        })
        .catch(error => res.status(400).send(error))
});
/*post */
router.post('/save', function (req, res, next) {
    let { titulo, descripcion, calificacion, ruta } = req.body;
    console.log("Datos recibidos:", req.body); // Agrega este log
    foto.create({
        titulo: titulo,
        descripcion: descripcion,
        calificacion: parseFloat(calificacion),
        ruta: ruta,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(foto => {
            console.log("Registro guardado:", foto); // Agrega este log
            res.json(foto);
        })
        .catch(error => {
            console.error("Error al guardar:", error); // Agrega este log
            res.status(400).send(error);
        });
});

/*put */
router.put('/update', function (req, res, next) {
    let { id, titulo, descripcion, calificacion, ruta } =
        req.body;
    Foto.update({
        titulo: titulo,
        descripcion: descripcion,
        calificacion: parseFloat(calificacion),
        ruta: ruta,
        createdAt: new Date(),
        updatedAt: new Date()
    },
        {
            where: {
                id: parseInt(id)
            }
        })
        .then(respuesta => {
            res.json(respuesta);
        })
        .catch(error => res.status(400).send(error))
});


/*delete */

router.delete('/delete/:id', function (req, res,
    next) {
    let id = parseInt(req.params.id);
    Foto.destroy({
        where: {
            id: id
        }
    })
        .then(respuesta => {
            res.json(respuesta);
        })
        .catch(error =>
            res.status(400).send(error))
});
module.exports = router;