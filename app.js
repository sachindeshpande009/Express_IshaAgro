var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var ObjectId = require('mongodb').ObjectId;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

app.get('/', (req, res) => res.send('Hello World!'));



//insert employee
app.post('/registration', (req, res) => {
    console.log(req.body);
   if(req.body.empUsername){
    let emp = {
        "empUsername": req.body.empUsername,
        "empPassword": req.body.empPassword,
        "empEmail": req.body.empEmail

    };

    MongoClient.connect('mongodb://localhost:27017/emp', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            let custRes = {}
            db.collection('employee').insertOne(emp, function (err, result) {
                if (err) {

                    custRes = {
                        "status": 400,
                        "error": err
                    }
                }
                else {
                    custRes = {
                        "status": 200,
                        "result": result
                    }

                }

                res.json(custRes);
            });

            //res.send("Database Connected ...!");
        }
    });
   }
   else{
    custRes = {
        "status": 400,
        "error": "Please enter Username"
    }
    res.json(custRes);
   }

   

});


//Update Function
app.put('/registration', (req, res) => {

    MongoClient.connect('mongodb://localhost:27017/emp', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            let custRes = {}
            db.collection('employee').update({ "_id": new ObjectId(req.body._id) },
                {
                    $set: {
                        "empUsername": req.body.empUsername, "empPassword": req.body.empPassword,
                        "empEmail": req.body.empEmail
                    }
                }, function (err, result) {
                    if (err) {
                        custRes = {
                            "status": 400,
                            "error": err
                        }
                    }
                    else {
                        custRes = {
                            "status": 200,
                            "result": result
                        }
                    }
                    res.json(custRes);
                });
        }
    });

});

//Delete of All Employee
app.delete('/registration',(req, res) => {
        console.log(req.body._id);
        let custRes = {}
        MongoClient.connect('mongodb://localhost:27017/emp', function (err, db) {
            if (err) throw err

            else {
                db.collection('employee').remove({ "_id": new ObjectId(req.body._id) }, function (err, result) {
                    if (err) throw err
                    else {
                        if (result) {
                            custRes = {
                                sts: 200,
                                msg: 'Successful',
                                res: result
                            }
                        }
                        else {
                            console.log(err)
                            custRes = {
                                sts: 400,
                                msg: 'error',
                                res: 0
                            }
                        }
                    }
                    res.json(custRes)
                })
            }
        })
    })


//Display All Employees
app.get('/employee', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/emp', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            // db.collection('person').find().toArray(function (err, result) {
            db.collection('employee').find().toArray(function (err, result) {
                res.json(result);
            });
        }
    });
});


//Login Check Function
app.post('/employeeLogin', (req, res) => {
    console.log(req.body);
    MongoClient.connect('mongodb://localhost:27017/emp', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            db.collection('employee').findOne({ 'empEmail': req.body.empEmail, "empPassword": req.body.empPassword }, function (err, result) {
                let custRes = {}
                if (err) {

                    custRes = {
                        "status": 400,
                        "error": err
                    }
                }
                else {
                    custRes = {
                        "status": 200,
                        "result": result
                    }

                }
                res.json(custRes);
                // res.json(result);
            });
        }
    });
});

//Get Employee using Object Id
app.post('/getEmployee', (req, res) => {
    console.log(req.body);
    MongoClient.connect('mongodb://localhost:27017/emp', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            db.collection('employee').findOne({ "_id": new ObjectId(req.body._id) }, function (err, result) {
                let custRes = {}
                if (err) {

                    custRes = {
                        "status": 400,
                        "error": err
                    }
                }
                else {
                    custRes = {
                        "status": 200,
                        "result": result
                    }

                }
                res.json(custRes);
                // res.json(result);
            });
        }
    });
});



//Add State

app.post('/addstate', (req, res) => {
    console.log(req.body);
   if(req.body.stateName){
    let state = {
        "stateName": req.body.stateName,
      

    };

    MongoClient.connect('mongodb://localhost:27017/state', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            let custRes = {}
            db.collection('dbstate').insertOne(state, function (err, result) {
                if (err) {

                    custRes = {
                        "status": 400,
                        "error": err
                    }
                }
                else {
                    custRes = {
                        "status": 200,
                        "result": result
                    }

                }

                res.json(custRes);
            });

            //res.send("Database Connected ...!");
        }
    });
   }
   else{
    custRes = {
        "status": 400,
        "error": "Please enter Username"
    }
    res.json(custRes);
   }

   //Display State

    app.get('/states', (req, res) => {
        MongoClient.connect('mongodb://localhost:27017/state', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            // db.collection('person').find().toArray(function (err, result) {
            db.collection('dbstate').find().toArray(function (err, result) {
                res.json(result);
            });
        }
    });
});
});



//Update Function
app.put('/updatestate', (req, res) => {

    MongoClient.connect('mongodb://localhost:27017/state', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            let custRes = {}
            db.collection('dbstate').update({ "_id": new ObjectId(req.body._id) },
                {
                    $set: {
                        "stateName": req.body.stateName,
                    }
                }, function (err, result) {
                    if (err) {
                        custRes = {
                            "status": 400,
                            "error": err
                        }
                    }
                    else {
                        custRes = {
                            "status": 200,
                            "result": result
                        }
                    }
                    res.json(custRes);
                });
        }
    });

});


//Delete of All Employee
app.delete('/deletestate',(req, res) => {
        console.log(req.body._id);
        let custRes = {}
        MongoClient.connect('mongodb://localhost:27017/state', function (err, db) {
            if (err) throw err

            else {
                db.collection('dbstate').remove({ "_id": new ObjectId(req.body._id) }, function (err, result) {
                    if (err) throw err
                    else {
                        if (result) {
                            custRes = {
                                sts: 200,
                                msg: 'Successful',
                                res: result
                            }
                        }
                        else {
                            console.log(err)
                            custRes = {
                                sts: 400,
                                msg: 'error',
                                res: 0
                            }
                        }
                    }
                    res.json(custRes)
                })
            }
        })
    })


//Get Employee using Object Id
app.post('/currentstate', (req, res) => {
    console.log(req.body);
    MongoClient.connect('mongodb://localhost:27017/state', function (err, db) {
        if (err) {
            throw err;
        }
        else {
            db.collection('dbstate').findOne({ "_id": new ObjectId(req.body._id) }, function (err, result) {
                let custRes = {}
                if (err) {

                    custRes = {
                        "status": 400,
                        "error": err
                    }
                }
                else {
                    custRes = {
                        "status": 200,
                        "result": result
                    }

                }
                res.json(custRes);
                // res.json(result);
            });
        }
    });
});





app.listen(3001, () =>
    console.log('Example app listening on port 3001!'))

