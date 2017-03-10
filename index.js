var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var massive = require('massive')
//Need to enter username and password for your database
var connString = "postgres://johnmunson:@localhost/assessbox"

var app = express()

app.use(bodyParser.json())
app.use(cors())

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb
    app.set('db', db)
    db.user_create_seed(function(){
      console.log("User Table Init")
    })
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    })
})

app.get('/api/users', function(req, res) {
    db.user_getAll(function(err, result) {
        if (err) {
            res.status(500).json(err)
        }
        res.status(200).json(result)
    })
})

app.get('/api/vehicles', function(req, res) {
    db.vehicle_getAll(function(err, result) {
        if (err) {
            res.status(500).json(err)
        }
        res.status(200).json(result)
    })
})

app.post('/api/users', function(req, res) {
    db.user_add([req.body.firstname, req.body.lastname, req.body.email], function(err, result) {
        if (err) {
            res.status(500).json(err)
        }
        res.sendStatus(200)
    })
})

app.post('/api/vehicles', function(req, res) {
    db.vehicle_add([req.body.make, req.body.model, Number(req.body.year), Number(req.body.ownerId)], function(err, result) {
        if (err) {
            res.status(500).json(err)
        }
        res.end()
    })
})

app.get('/api/user/:userId/vehiclecount', function(req, res) {
    db.vehicle_count([req.params.userId], function(err, result) {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.status(200).json(result[0])
    })
})

app.get('/api/user/:userId/vehicle', function(req, res) {
    db.user_vehicles([req.params.userId], function(err, result) {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.status(200).json(result)
    })
})

app.get('/api/vehicle', function(req, res) {
    if (req.query.email) {
        db.vehicle_email([req.query.email], function(err, result) {
            if (err) {
                res.status(500).json(err)
                return
            }
            res.status(200).json(result)
        })
    }
    if (req.query.userFirstStart) {
        db.vehicle_userFirstStart([req.query.userFirstStart + '%'], function(err, result) {
            if (err) {
                res.status(500).json(err)
                return
            }
            res.status(200).json(result)
        })
    }
})

app.get('/api/newervehiclesbyyear', function(req, res) {
    db.vehicle_newerThan2000(function(err, result) {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.json(result)
    })
})

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res) {
    db.vehicle_changeOwner([req.params.vehicleId, req.params.userId], function(err, result) {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.sendStatus(200)
    })
})

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res) {
    db.vehicle_deleteOwner([req.params.userId, req.params.vehicleId], function(err, result) {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.sendStatus(200)
    })
})

app.delete('/api/vehicle/:vehicleId', function(req, res) {
    db.vehicle_delete([req.params.vehicleId], function(err, result) {
        if (err) {
            res.status(500).json(err)
            return
        }
        res.sendStatus(200)
    })
})



app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app
