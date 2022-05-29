const express = require('express');
var router = express.Router();

const Prestamo = require('../models/prestamo');
const loginRoute = "../views/pages/login";

router.get('/', (req, res) => {
    res.render('pages/prestamos/prestamo', {
        
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
        newPrestamo(req, res)
    else
        updatePrestamo(req, res)
});

function newPrestamo(req, res){
    var prestamo = new Prestamo();
    prestamo.clienteID = req.body.clienteID;
    prestamo.cantidad = req.body.cantidad;
    prestamo.plazo = req.body.plazo;
    prestamo.fechaComienzo = req.body.fechaComienzo;

    prestamo.save((error) => {
        if(error)
        console.log("Error" + error);
        else
        res.redirect('prestamos/tablaPrestamo');
    });
}

function updatePrestamo(req, res){
    Prestamo.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('prestamos/tablaPrestamo');
        } else {
            res.render('prestamos/prestamo', {
                prestamo: req.body
            })
        }
    })
}

router.get('/tablaPrestamo', (req, res)=> {
    if(req.user){
    Prestamo.find((err, doc) => {
        if(!err){
            res.render('pages/prestamos/tablaPrestamo', {
                list: doc
            })
        } else {
            console.log("Error" + err);
        }
    });
  } else {
    res.render(loginRoute, {
      message: "Por favor iniciar sesion correctamente",
      messageClass: "alert-danger",
    });
  }
})


router.get('/:id', (req, res) => {
    if (req.user) {
        Prestamo.findById(req.params.id, (err, doc) => {
            if(!err){
                res.render('pages/prestamos/prestamo', {
                    prestamo: doc
                });
            }
        })
    } else {
        res.render(loginRoute, {
          message: "Por favor iniciar sesion correctamente",
          messageClass: "alert-danger",
        });
      }
  })
  
router.get('/delete/:id', (req, res) => {
    if (req.user) {
        Prestamo.findByIdAndDelete(req.params.id, (err, doc) =>{
            if(!err){
                res.redirect('/prestamos/tablaPrestamo');
            } else {
                console.log("Error" + err);
            }
        })
      } else {
        res.render(loginRoute, {
          message: "Por favor iniciar sesion correctamente",
          messageClass: "alert-danger",
        });
      }
})
  
module.exports = router;
