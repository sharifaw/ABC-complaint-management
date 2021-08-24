const { app } = require("./express")
const bodyParser = require('body-parser');
const port = 6000;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createToken } = require('./token')
const { emailValidate, passValidate } = require('./validator');
const { connection } = require('./connection');
const jwt = require('jsonwebtoken');

app.set('view engine', 'html');

let parseBody = bodyParser.urlencoded({ extended: true });

app.post('/abc/register', parseBody, (request, response) => {
    let username = request.body.username;
    let email = request.body.email;
    let password = request.body.password;

    // if one of the values is empty
    if (!username || !email || !password) {
        response.status(400).send("fill your information");
        return;
    }


    let query = 'SELECT email FROM  `user_register` WHERE email=?';

    connection.query(query, [email], (err, array) => {
        if (err) {
            response.status(500).send(err);
            return;
        }

        // to check if the mail contain the validate characters
        if (!emailValidate.validate(email)) {
            response.status(401).send(emailValidate.validate(email, { list: true }))
            return;
        }


        if (array.length > 0) {
            response.status(402).send("Email is already in use");
            return;
        }

        // to check if the password contain the validate characters
        if (!passValidate.validate(password)) {
            response.status(401).send(passValidate.validate(password, { list: true }));
            return;
        }

        // to crypt the password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                response.status(500).send(err);
                return;
            }

            // to add the user info
            connection.query('INSERT INTO `user_register`(username,email,password) VALUES(?,?,?)', [username, email, hash],
                (err, result) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }
                    // creating token 
                    const token = createToken(result.insertId, email);
                    response.status(201).send({ token, email, username });
                });
        });
    });
});


app.post('/abc/adminregister', parseBody, (request, response) => {
    let username = request.body.username;
    let email = request.body.email;
    let password = request.body.password;
    let employeeNumber = request.body.employee_number;


    // if one of the values is empty
    if (!employeeNumber || !username || !email || !password) {
        response.status(400).send("fill your information");
        return;
    }


    connection.query("SELECT employee_number from employees where employee_number = ?",
        [employeeNumber], function (err, rows) {
            if (err) {
                response.status(500).send(err);
                return;
            }
            if (rows.length == 0) {
                return response.status(402).send("incorrect employee number");
            }

            connection.query('SELECT email,id FROM  `employees` WHERE email=?',
                [email], (err, array) => {
                    if (err) {
                        response.status(500).send(err);
                        return;
                    }

                    // to check if the mail contain the validate characters
                    if (!emailValidate.validate(email)) {
                        response.status(401).send(emailValidate.validate(email, { list: true }))
                        return;
                    }


                    if (array.length == 0) {
                        response.status(402).send("Email doesn't exist");
                        return;
                    }

                    // to check if the password contain the validate characters
                    if (!passValidate.validate(password)) {
                        response.status(401).send(passValidate.validate(password, { list: true }));
                        return;
                    }

                    // to crypt the password
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            response.status(500).send(err);
                            return;
                        }
                        connection.query("SELECT employee_id from admin_register where employee_id =?",
                            [array[0].id], function (err, rows) {
                                if (err) {
                                    return response.status(500).send(err);
                                }

                                if (array.length > 0) {
                                    response.status(402).send("employee_id is already in use");
                                    return;
                                }




                                // to add the user info
                                connection.query('INSERT INTO `admin_register`(employee_id,password) VALUES(?,?)', [array[0].id, hash],
                                    (err, result) => {
                                        if (err) {
                                            response.status(500).send(err.message);
                                            return;
                                        }
                                        // creating token 
                                        const token = createToken(result.insertId, email);
                                        response.status(201).send({ token, email, username });
                                    });
                            })
                    });
                });
        });
})

app.post('/abc/login', parseBody, function (request, response) {
    let email = request.body.email;
    let password = request.body.password;

    // check if the string is empty 
    if (!email || !password) {
        response.status(400).send("Please fill your Email and Password");
        return;
    }

    // check if the email is valid
    connection.query("SELECT * FROM user_register WHERE email=?", [email], function (err, rows) {
        if (err) {
            response.status(500).send(err);
            return;
        }
        var user = rows[0];

        if (!user) {
            response.status(401).send("email is wrong");
            return;
        }

        // compare the newest password with the database password
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                response.status(500).send("Auth Faill");
                return;
            }

            if (result == true) {
                // createToken
                const token = createToken(user.id, user.email);
                response.status(200).send({ email: user.email, username: user.username, token: token });
            }
            else {
                response.status(401).send("Wrong password");
            }

        });
    });
});

app.post('/abc/form', parseBody, function (request, response) {
    const firstName = request.body.firstname;
    const lastName = request.body.lastname;
    const country = request.body.country;
    const gender = request.body.gender;
    const category = request.body.category;
    const subject = request.body.subject;
    const message = request.body.message;
    const user_id = request.body.user_id;
    const status = request.body.status;

    // check if there is some empty value
    if (!firstName || !lastName || !country || !gender || !category || !subject ||
        !message || !user_id || !status) {
        response.status(400).send("Please make sure to fill your forms");
        return;
    }

    // add the form data
    connection.query('INSERT INTO `user_form`(user_id,first_name,last_name,country,gender,category,subject,message,status) VALUES(?,?,?,?,?,?,?,?,?)',
        [user_id, firstName, lastName, country, gender, category, subject, message, status], function (err, rows) {
            if (err) {
                response.status(500).send(err);
                return;
            }
            response.status(200).send({ user_id, firstName, lastName, country, gender, category, subject, message, status });
        })
})

app.post('/abc/user_id', parseBody, function (request, response) {
    const user_id = request.body.user_id;

    // get the user_id 
    connection.query("SELECT subject,status from user_form where user_id = ?", [user_id], function (err, rows) {
        if (err) {
            response.status(500).send(err);
            return
        }
        console.log(rows);
        response.status(200).json(rows);
    })
})

app.get('/abc/tokenauth', parseBody, function (request, response) {
    let token = request.headers.authorization;
    token = token.split(' ')[1]
    console.log('token ', token)

    // check if the token is exist
    if (token === 'null' || !token) { return response.status(401).send('Unauthorized request'); }

    // verify the token
    jwt.verify(token, 'jsfashlaekhe', function (err, decoded) {
        if (err) {
            return response.status(500).send(err);
        }
        console.log(decoded);
        response.status(200).send(decoded);
    });


})

app.get("/abc/customercomplaints", parseBody, function (request, response) {
    connection.query("select * from user_form", function (err, rows) {
        if (err) {
            return response.status(500).send(err);
        }
        response.status(200).send(rows);
    })

})

app.put("/abc/forms/statusupdate", parseBody, function (request, response) {
    const form_id = request.body.id;
    const status = request.body.status;

    connection.query("select status from user_form where id = ?", [form_id], function (err, rows) {
        if (err) {
            return response.status(500).send(err);
        }

        connection.query("update user_form set status = ? where id = ?", [status, form_id], function (err, rows) {
            if (err) {
                return response.status(500).send(err);
            }
            response.status(200).send(rows);
        })

    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});