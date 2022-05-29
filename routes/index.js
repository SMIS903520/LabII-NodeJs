var express = require('express');
var router = express.Router();
const methods = require('../methods');
const User = require('../models/user');


const registerRoute = "../views/pages/register";
const loginRoute = "../views/pages/login";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Banco Infinity' });
});

router.get ('/home', function(req, res, next){
  res.render ('home',{title: "Bienvenido a Banco Infinity"});
})

router.get('/register', (req, res) => {
  res.render(registerRoute);
});

router.get('/login', (req, res) => {
  res.render(loginRoute);
});

router.post("/register", async (req, res) => {
  const { Fullname, Email, Password, confirmP } = req.body;

  try {
    if (Password === confirmP) {
      user = await User.findOne({ Email: Email }).then((user) => {
        if (user) {
          res.render(registerRoute, {
            message: "El usuario ya esta registrado",
            messageClass: "alert-danger",
          });
        } else {
          const hashedPassword = methods.getHashedPassword(Password);
          const userDB = new User({
            Fullname: Fullname,
            Email: Email,
            Password: hashedPassword,
          });
          userDB.save();

          res.render(loginRoute, {
            message: "El registro se a completado, ya puede iniciar sesion",
            messageClass: "alert-success",
          });
        }
      });
    } else {
      res.render(registerRoute, {
        message: "Las contraseñas no coinciden",
        messageClass: "alert-danger",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
});


router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  const hashedPassword = methods.getHashedPassword(Password);

  user = await User.findOne({ Email: Email, Password: hashedPassword }).then(
    (user) => {
      if (user) {
        const authToken = methods.generateAuthToken();

        //almacenar el token de autenticacion
        methods.authTokens[authToken] = user;
        //guardar el token en una cookie
        res.cookie("AuthToken", authToken);
        res.redirect("/home");
      } else {
        res.render(loginRoute, {
          message: "The username or password is invalid",
          messageClass: "alert-danger",
        });
      }
    }
  );
});

module.exports = router;