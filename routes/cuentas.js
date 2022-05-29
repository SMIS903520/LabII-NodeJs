const express = require('express');
var router = express.Router();

const Cuenta = require('../models/cuenta');
const loginRoute = "../views/pages/login";

router.get('/', (req, res) => {
    res.render('pages/cuentas/cuenta', {
        
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
        newCuenta(req, res)
    else
        updateCuenta(req, res)
});

function newCuenta(req, res){
    var cuenta = new Cuenta();
    cuenta.clienteID = req.body.clienteID;
    cuenta.numeroCuenta = req.body.numeroCuenta;
    cuenta.saldo = req.body.saldo;

    cuenta.save((error) => {
        if(error)
        console.log("Error" + error);
        else
        res.redirect('cuentas/tablaCuenta');
    });
}

function updateCuenta(req, res){
    Cuenta.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('cuentas/tablaCuenta');
        } else {
            res.render('cuentas/cuenta', {
                cuenta: req.body
            })
        }
    })
}

router.get('/tablaCuenta', (req, res)=> {
    if(req.user){
    Cuenta.find((err, doc) => {
        if(!err){
            res.render('pages/cuentas/tablaCuenta', {
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
        Cuenta.findById(req.params.id, (err, doc) => {
            if(!err){
                res.render('pages/cuentas/cuenta', {
                    cuenta: doc
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
        Cuenta.findByIdAndDelete(req.params.id, (err, doc) =>{
            if(!err){
                res.redirect('/cuentas/tablaCuenta');
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