const router = require('express').Router()
const User = require('../models/userModel').User

router.get('/add', (req, res) => {
    res.render('add')
})

router.post('/adduser', (req, res) => {
    const newUser = new User( {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      newUser.save().then(result => {
          res.redirect('http://localhost:3000')
      })
      .catch(error => {
          console.log(error)
      })
})

router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)
    User.findByIdAndDelete(req.params.id)
        .then(result => {
            res.redirect("http://localhost:3000")
        })
        .catch(error => {
            console.log(error)
        })
})

const edituser = []
router.get('/edit/:id', (req, res) => {
    User.findById(req.params.id)
    .then(result => {
        edituser.push(result)
        res.render('edit', {title: 'user', usersDocs: edituser });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: 'An Error Occured'});
    })
})

router.get('/edituser/:id', (req, res) => {
    const userId = req.params.id;
    const newName = req.query.name;
    const newEmail = req.query.email;
    const newPassword = req.query.password
    console.log(userId)
    console.log(newName)
    console.log(newEmail)
    console.log(newPassword)

        if (newName) {
            console.log('in if loop')
            User.findById(userId).then(usersDocs => {

                usersDocs.name = newName;
                usersDocs.email = newEmail;
                usersDocs.password = newPassword;

                usersDocs.save().then(updated => {
                    res.redirect("http://localhost:3000")
                });

            });
        }
})


router.get('', (req, res) => {
   User.find()
    .then(result => {
        res.render('index', {title: 'user', usersDocs: result });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: 'An Error Occured'});
    })
})

module.exports = router;
  
