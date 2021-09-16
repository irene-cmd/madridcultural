// IMPORTS || OK
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

let app = express();

// Configuración de la APP
app.use("/", express.json({ strict: false }));
app.use("/", express.static("."));
app.use(cors());

// DATOS DE CONEXIÓN || OK
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'madridcultural'
});

// ENDPOINT -> principal de la app || OK
app.get('/', function (req, res) {
    res.send('Hola Irene!');
});

// ENDPOINT -> TODOS los usuarios || OK
app.get('/usuarios', function (req, res) {//Se leen todos los usuarios

    //1. Generamos la consulta SQL
    let sql;
    sql = 'SELECT * FROM usuarios WHERE estado = 1';

    //2. Lanzamos la Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos recogidos con éxito",
                    response: results
                });
            } else {
                res.status(200).json({
                    responseCode: 0,
                    responseMessage: "No existen datos para esa solicitud",
                });
            }
        }
    });

});

// ENDPOINT -> Comprobar usuario y contraseña
app.post('/login', function (req, res) {

    //1. Recogemos el BODY
    let email = req.body.email;
    let password = req.body.password;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'SELECT id, nombre, apellidos, fecha_nacimiento, email, sexo FROM usuarios WHERE email = "' + email + '" AND password = "' + password + '"';

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos de acceso correctos",
                    response: results
                });
            } else {
                res.status(200).json({
                    responseCode: 0,
                    responseMessage: "Datos de acceso incorrectos",
                });
            }
        }
    });

});

// ENDPOINT -> crear usuario || OK
app.put('/signup', function (req, res) {

    //1. Recogemos el BODY
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let direccion = req.body.direccion;
    let fecha_nacimiento = req.body.fecha_nacimiento;
    let email = req.body.email;
    let sexo = req.body.sexo;
    let password = req.body.password;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'INSERT INTO usuarios(nombre, apellidos, direccion, fecha_nacimiento, email, sexo,  password, estado) ';
    sql += 'VALUES("' + nombre + '", "' + apellidos + '", "' + direccion + '",  "' + fecha_nacimiento + '", "' + email + '","' + sexo + '", "' + password + '", 1)';

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (typeof (results.insertId) === "number") {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos insertados con éxito"
                });
            } else {
                res.status(400).json({
                    responseCode: 0,
                    responseMessage: "Petición inválida. Por favor, revise los parámetros antes de su solicitud",
                });
            }
        }
    });

});

// ENDPOINT -> subscribirse a evento
app.put('/subscribeMe', function (req, res) {

    //1. Recogemos el BODY
    let id_usuario = req.body.id_usuario;
    let id_evento = req.body.id_evento;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'INSERT INTO tbi_usuarios_eventos(propietario, fk_usuario, fk_evento) ';
    sql += 'VALUES(0, ' + id_usuario + ', ' + id_evento + ')';

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (typeof (results.insertId) === "number") {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos insertados con éxito"
                });
            } else {
                res.status(400).json({
                    responseCode: 0,
                    responseMessage: "Petición inválida. Por favor, revise los parámetros antes de su solicitud",
                });
            }
        }
    });
});

// ENDPOINT -> usuarios con ID || OK
app.get('/usuarios/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'SELECT * FROM usuarios WHERE id = ' + id + ' AND estado = 1';

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos recogidos con éxito",
                    response: results
                });
            } else {
                res.status(200).json({
                    responseCode: 0,
                    responseMessage: "No existen datos para esa solicitud",
                });
            }
        }
    });



});

//ENDPOINT-> Borrar un usuario || OK
app.delete('/usuarios/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'UPDATE usuarios SET estado = 0 WHERE id = ' + id;

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.affectedRows === 1) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos borrados con éxito"
                });
            } else {
                res.status(404).json({
                    responseCode: 0,
                    responseMessage: "El recurso no se encuentra disponible. Por favor, revise los parámetros antes de su solicitud de borrado",
                });
            }
        }

    });

});

//ENDPOINT-> Actualizar un usuario || OK
app.patch('/usuarios/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let direccion = req.body.direccion;
    let fecha_nacimiento = req.body.fecha_nacimiento;
    let email = req.body.email;
    let password = req.body.password;
    let sexo = req.body.sexo;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'UPDATE usuarios SET nombre = "' + nombre + '", ';
    sql += 'apellidos = "' + apellidos + '", ';
    sql += 'direccion = "' + direccion + '", ';
    sql += 'fecha_nacimiento = ' + fecha_nacimiento + ', ';
    sql += 'email = "' + email + '", ';
    sql += 'password = "' + password + '", ';
    sql += 'sexo = "' + sexo + '" ';
    sql += 'WHERE id = ' + id;

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.affectedRows === 1) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos actualizados con éxito"
                });
            } else {
                res.status(400).json({
                    responseCode: 0,
                    responseMessage: "Petición inválida. Por favor, revise los parámetros antes de su solicitud",
                });
            }
        }
    });


});

// ENDPOINT -> TODAS las preferencias || OK
app.get('/preferencias', function (req, res) {

    //1. Generamos la consulta SQL
    let sql;
    sql = 'SELECT * FROM preferencias WHERE estado = 1';

    //2. Lanzamos la Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos recogidos con éxito",
                    response: results
                });
            } else {
                res.status(200).json({
                    responseCode: 0,
                    responseMessage: "No existen datos para esa solicitud",
                });
            }
        }
    });

});

// ENDPOINT -> preferencias con ID || OK
app.get('/preferencias/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'SELECT * FROM preferencias WHERE id = ' + id + ' AND estado = 1';

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos recogidos con éxito",
                    response: results
                });
            } else {
                res.status(200).json({
                    responseCode: 0,
                    responseMessage: "No existen datos para esa solicitud",
                });
            }
        }
    });

});

// ENDPOINT -> crear preferencia || OK
app.put('/preferencias', function (req, res) {

    //1. Recogemos el BODY
    let nombre = req.body.nombre;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'INSERT INTO preferencias(nombre, estado) ';
    sql += 'VALUES("' + nombre + '", 1)';

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (typeof (results.insertId) === "number") {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos insertados con éxito"
                });
            } else {
                res.status(400).json({
                    responseCode: 0,
                    responseMessage: "Petición inválida. Por favor, revise los parámetros antes de su solicitud",
                });
            }
        }
    });

});

//ENDPOINT-> Borrar una preferencia || OK
app.delete('/preferencias/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'UPDATE preferencias SET estado = 0 WHERE id = ' + id;

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.affectedRows === 1) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos borrados con éxito"
                });
            } else {
                res.status(404).json({
                    responseCode: 0,
                    responseMessage: "El recurso no se encuentra disponible. Por favor, revise los parámetros antes de su solicitud de borrado",
                });
            }
        }

    });

});

//ENDPOINT-> Actualizar una preferencia || OK
app.patch('/preferencias/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;
    let nombre = req.body.nombre;
    let estado = req.body.estado;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'UPDATE preferencias SET nombre = "' + nombre + '", ';
    sql += 'estado = ' + estado + ' ';
    sql += 'WHERE id = ' + id;

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.affectedRows === 1) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos actualizados con éxito"
                });
            } else {
                res.status(400).json({
                    responseCode: 0,
                    responseMessage: "Petición inválida. Por favor, revise los parámetros antes de su solicitud",
                });
            }
        }
    });


});

// ENDPOINT -> TODOS los eventos || OK
app.get('/eventos', function (req, res) {

    //1. Generamos la consulta SQL
    let sql;
    sql = 'SELECT * ';
    sql += 'FROM eventos ';
    sql += 'WHERE estado = 1 ';
    sql += 'AND DATEDIFF(fecha, NOW()) > 0 ';
    sql += 'ORDER BY DATEDIFF(fecha, NOW())  LIMIT 9';

    //2. Lanzamos la Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos recogidos con éxito",
                    response: results
                });
            } else {
                res.status(200).json({
                    responseCode: 0,
                    responseMessage: "No existen datos para esa solicitud",
                });
            }
        }
    });

});

// ENDPOINT -> eventos con ID || OK
app.get('/eventos/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'SELECT * FROM eventos WHERE id = ' + id + ' AND estado = 1';
    //'SELECT * FROM eventos WHERE id = ' + id + ' AND estado = 1';

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos recogidos con éxito",
                    response: results
                });
            } else {
                res.status(200).json({
                    responseCode: 0,
                    responseMessage: "No existen datos para esa solicitud",
                });
            }
        }
    });

});

// ENDPOINT -> todos los subscriptores de un evento || OK
app.get('/eventos/:id/subscriptores', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'SELECT usuarios.nombre, usuarios.apellidos, usuarios.id, tbi_usuarios_eventos.propietario AS esPropietario ';
    sql += 'FROM usuarios ';
    sql += 'INNER JOIN tbi_usuarios_eventos ON usuarios.id = tbi_usuarios_eventos.fk_usuario ';
    sql += 'WHERE tbi_usuarios_eventos.fk_evento = ' + id;

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos recogidos con éxito",
                    response: results
                });
            } else {
                res.status(200).json({
                    responseCode: 0,
                    responseMessage: "No existen datos para esa solicitud",
                });
            }
        }
    });



});

// ENDPOINT -> eventos de una categoría ||
app.get('/eventos/preferencias/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'SELECT * FROM eventos ';
    sql += 'WHERE fk_preferencia = ' + id + ' AND estado = 1 ';
    sql += 'AND DATEDIFF(fecha, NOW()) > 0 ';
    sql += 'ORDER BY DATEDIFF(fecha, NOW())';

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos recogidos con éxito",
                    response: results
                });
            } else {
                res.status(200).json({
                    responseCode: 0,
                    responseMessage: "No existen datos para esa solicitud",
                });
            }
        }
    });

});

// ENDPOINT -> crear evento || OK
app.put('/eventos', function (req, res) {

    //1. Recogemos el BODY
    let nombre = req.body.nombre;
    let lugar = req.body.lugar;
    let fecha = req.body.fecha;
    //let descripcion = req.body.descripcion.replace('\n','<br />');
    let descripcion = req.body.descripcion;
    let fk_preferencia = req.body.fk_preferencia;
    let id_usuario = req.body.id_usuario;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'INSERT INTO eventos(nombre, lugar, fecha, descripcion, fk_preferencia, estado) ';
    sql += 'VALUES("' + nombre + '", "' + lugar + '",  "' + fecha + '", "' + descripcion + '", "' + fk_preferencia + '" , 1)';

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (typeof (results.insertId) === "number") {
                // inserto el líder del evento
                let sql2;
                sql2 = 'INSERT INTO tbi_usuarios_eventos(propietario, fk_usuario, fk_evento)';
                sql2 += 'VALUES(' + id_usuario + ', ' + id_usuario + ', ' + results.insertId + ')';

                connection.query(sql2, function (error2, results2) {

                    if (error2) {
                        throw error2;
                    } else {
                        if (typeof (results2.insertId) === "number") {
                            res.status(200).json({
                                responseCode: 1,
                                responseMessage: "Datos insertados con éxito"
                            });
                        }
                    }

                });

            } else {
                res.status(400).json({
                    responseCode: 0,
                    responseMessage: "Petición inválida. Por favor, revise los parámetros antes de su solicitud",
                });
            }
        }
    });

});

//ENDPOINT-> Borrar un evento || OK
app.delete('/eventos/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'UPDATE eventos SET estado = 0 WHERE id = ' + id;

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.affectedRows === 1) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos borrados con éxito"
                });
            } else {
                res.status(404).json({
                    responseCode: 0,
                    responseMessage: "El recurso no se encuentra disponible. Por favor, revise los parámetros antes de su solicitud de borrado",
                });
            }
        }

    });

});

//ENDPOINT->Actualizar un evento || OK
app.patch('/eventos/:id', function (req, res) {

    //1. Recogemos los parámetros de la URL
    let id = req.params.id;
    let nombre = req.body.nombre;
    let lugar = req.body.lugar;
    let fecha = req.body.fecha;
    let descripcion = req.body.descripcion;
    let fk_preferencia = req.body.fk_preferencia;
    let estado = req.body.estado;

    //2. Generamos la consulta SQL
    let sql;
    sql = 'UPDATE eventos SET nombre = "' + nombre + '", ';
    sql += 'lugar = "' + lugar + '", ';
    sql += 'fecha = ' + fecha + ', ';
    sql += 'descripcion = "' + descripcion + '", ';
    sql += 'fk_preferencia = "' + fk_preferencia + '", ';
    sql += 'estado = ' + estado + ' ';
    sql += 'WHERE id = ' + id;

    //3. Lanzamos Query que nos interesa
    connection.query(sql, function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.affectedRows === 1) {
                res.status(200).json({
                    responseCode: 1,
                    responseMessage: "Datos actualizados con éxito"
                });
            } else {
                res.status(400).json({
                    responseCode: 0,
                    responseMessage: "Petición inválida. Por favor, revise los parámetros antes de su solicitud",
                });
            }
        }
    });


});

// GESTIÓN DE ERRORES -> Manejo del Error 404 || OK
app.use(function (req, res, next) {
    res.status(404).json({
        responseCode: 0,
        responseMessage: "No puedo acceder al recurso solicitado"
    });
});

// LANZAMIENTO DE LA APP || OK
app.listen(3000, function () {
    console.log('Aplicación escuchando en el puerto 3000!');
});