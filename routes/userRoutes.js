const router = require('express').Router()
const User = require('../models/userModel').User

router.get('/add', (req, res) => {
    res.render('add')
})

router.post('/adduser', (req, res, next) => {
    console.log('in Routes')
    const newUser = new User( {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile
      });
      console.log(newUser)

      newUser.save().then(result => {
        //   res.redirect('http://localhost:3000')
        res.json(result)
      })
      .catch(error => {
          console.log(error)
      })
})

router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)
    User.findByIdAndDelete(req.params.id)
        .then(result => {
            // res.redirect("http://localhost:3000")
            res.json(result)
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
        // res.render('edit', {title: 'user', usersDocs: edituser });
        res.json(edituser)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: 'An Error Occured'});
    })
})

router.get('/fetchuser/:id', (req,res) => {
    User.findById(req.params.id)
    .then(result => {
        res.json(result)
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
    const newMobile = req.query.mobile;

        if (newName) {
            console.log('in if loop')
            User.findById(userId).then(usersDocs => {

                usersDocs.name = newName;
                usersDocs.email = newEmail;
                usersDocs.mobile = newMobile;
                usersDocs.age = newAge;
                usersDocs.city = newCity;
                usersDocs. state = newState;
                usersDocs.country = newCountry;

                usersDocs.save().then(updated => {
                    res.redirect("http://localhost:3000")
                });

            });
        }
})

router.get('', (req, res) => {
   User.find()
    .then(result => {
        // res.render('index', {title: 'user', usersDocs: result });
        res.json(result)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: 'An Error Occured'});
    })
})

module.exports = router;
  
