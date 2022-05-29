const express = require('express');
var router = express.Router();

const Cliente = require('../models/cliente');
const loginRoute = "../views/pages/login";

router.get('/', (req, res) => {
    res.render('pages/clientes/cliente', {
        
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
        newCliente(req, res)
    else
        updateCliente(req, res)
});

function newCliente(req, res){
    var cliente = new Cliente();
    cliente.clienteID = req.body.clienteID;
    cliente.nombre = req.body.nombre;
    cliente.dni = req.body.dni;

    cliente.save((error) => {
        if(error)
        console.log("Error" + error);
        else
        res.redirect('clientes/tablaCliente');
    });
}

function updateCliente(req, res){
    Cliente.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('clientes/tablaCliente');
        } else {
            res.render('clientes/cliente', {
                cliente: req.body
            })
        }
    })
}

router.get('/tablaCliente', (req, res)=> {
    if(req.user){
    Cliente.find((err, doc) => {
        if(!err){
            res.render('pages/clientes/tablaCliente', {
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
        Cliente.findById(req.params.id, (err, doc) => {
            if(!err){
                res.render('pages/clientes/cliente', {
                    cliente: doc
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
        Cliente.findByIdAndDelete(req.params.id, (err, doc) =>{
            if(!err){
                res.redirect('/clientes/tablaCliente');
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
