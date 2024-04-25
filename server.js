import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import pg from "pg";
import sha1 from 'sha1';
import jwt from 'jsonwebtoken';
import multer from 'multer';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "BookmatchProd",
  password: "root",
  port: 5435,
});


db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
//Token id user middleware
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token is required" });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    try {
        const decoded = jwt.verify(token, "your-secret-key");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
}


//Multer middleware 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where you want to store the files
    },
    filename: function (req, file, cb) {
        
        const ext = file.originalname.split('.').pop();
        const randomNumber = getRandomInt(100000);

        const newFilename = file.originalname.replace('.' + ext, `_${randomNumber}.${ext}`);
        //console.log(newFilename);
        cb(null, newFilename); 
    }
});
// Configure multer upload middleware
const upload = multer({ storage: storage });

app.post('/api/register', upload.single('image'), async (req, res) => {
    // Extract form data from the request body
    const { nombres, apellidos, codigo, correo, password, repetirPassword } = req.body;
    console.log(req.body);
    try {
        // Perform validation checks here if needed
        const emailValidationQuery = `SELECT correo FROM usuario WHERE correo = $1`;
        const checkEmailValidation = await db.query(emailValidationQuery, [correo]);

        console.log(checkEmailValidation);
        const checkEmailDomain = "@alumnos.udg.mx";

        if (!req.file) {
            // Handle the case where no file was uploaded
            return res.status(400).json({ error: 'No image uploaded' });
        }
        const image = req.file; // Access the uploaded file
        const imageName = image.filename; // Store the filename
        console.log(imageName);
        console.log(correo);
        if (correo.includes(checkEmailDomain)){

            if(checkEmailValidation.rowCount > 0){
                res.setHeader('Content-Type', 'application/json');
                res.status(400).json({ error: 'Email already exists!!' });
                console.log(checkEmailValidation.rowCount);
            }else{
                if(password !== repetirPassword){
                    res.setHeader('Content-Type', 'application/json');
                    res.status(400).json({ error: 'Passwords dont match!!' });
                    console.log("passwords dont match!");
                }else{
                    try{
                        // Insert the user data into the database
                        const hashedPassword = sha1(password);
                        console.log(hashedPassword);
                        const insertQuery = `
                        INSERT INTO usuario (nombres, apellidos, correo, password, is_verified, codigo, is_admin, credencial)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        `;
                        await db.query(insertQuery, [nombres, apellidos, correo, hashedPassword, false, codigo, false, imageName]);
        
                        // Respond with a success message
                        res.status(200).json({ message: 'User registered successfully' });
                    }catch(error){
                        console.error('Error registering user:', error);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(500).json({ error: 'Failed to register user' });
                    }
                }
                }
                
        }else{
            res.status(400).json({ error: 'Email format incorrect!!' });
        }
        

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


app.post('/api/login', async (req, res) => {
    const { correo, password } = req.body;
    console.log(req.body);
    try {
        const hashedPassword = sha1(password);
        const credentialsValidationQuery = `SELECT id, correo, password FROM usuario WHERE correo = $1 AND password = $2`;
        const checkCredentialsValidation = await db.query(credentialsValidationQuery, [correo, hashedPassword]);
       
        const tokenIdQuery = `SELECT id FROM usuario WHERE correo = $1`;
        const resTokenIdQuery =  await  db.query(tokenIdQuery, [correo]);
        
        const tokenTypeAccount = `SELECT is_admin, is_verified FROM usuario where correo = $1`;
        const resTokenTypeAccount =  await db.query(tokenTypeAccount, [correo]); 

        console.log(resTokenTypeAccount.rows[0].is_admin);
        console.log("is verified "+resTokenTypeAccount.rows[0].is_verified);

        if(checkCredentialsValidation.rowCount === 1 && resTokenIdQuery.rowCount === 1){
            
            try {
                const token = jwt.sign({ userId: resTokenIdQuery.rows[0].id }, 'your-secret-key');
                //const tokenTypeAccount = jwt.sign({typeAccount: resTokenTypeAccount.rows[0].typeAccount}, 'secret-key');
                const tokenTypeAccount = resTokenTypeAccount.rows[0].is_admin;
                const isVerified = resTokenTypeAccount.rows[0].is_verified;
                res.status(200).json({ message: 'User logged in successfully', token, tokenTypeAccount, isVerified });
            } catch (error) {
                console.error('Error generating token or setting user ID:', error);
            }
            
            
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({ error: 'Incorrect password or email' });
        }
            
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
});


app.post('/api/addBook', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const userId = req.user.userId;
        const { titulo, autor, isbn, precio } = req.body;
        const image = req.file; // Access the uploaded file
        const imageName = image.filename; // Store the filename
        console.log(imageName);
        // Insert book data into the database, including the image filename or URL
        const insertQuery = `
            INSERT INTO libro (titulo, autor, isbn, precio, idusuario, coverimage)
            VALUES ($1, $2, $3, $4, $5, $6)`;
        const result = await db.query(insertQuery, [titulo, autor, isbn, precio, userId, imageName]); // Assuming filename is used to store the image
        console.log(result.rows);
        
        // Respond with success message
        res.status(200).json({ message: 'Book added successfully' });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Failed to add book' });
    }
});

app.get('/api/renderBooks', verifyToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const displayBooksQuery = `SELECT libro.id_libro, libro.titulo, libro.autor, libro.isbn, libro.precio, libro.coverimage, usuario.nombres, usuario.id FROM libro INNER JOIN usuario on usuario.id = libro.idusuario WHERE usuario.id = $1`;
        const displayBooks = await db.query(displayBooksQuery, [userId]);
        console.log(displayBooks.rows);
        res.status(200).json(displayBooks.rows);

    } catch (error) {
        res.status(500).json({ error: "Failed to load books" });
    }
});

app.delete('/api/deleteBook/:id', verifyToken, async (req, res)=>{
    try{
        const userId = req.user.userId;
        const bookId = req.params.id;
        console.log("user id: "+ userId);
        console.log("book id "+ bookId);

        const deleteBookQuery = `DELETE FROM libro where id_libro =$1 AND idusuario = $2`;
        await db.query(deleteBookQuery, [bookId, userId]);
        
         

        res.status(200).json({message: "so far so good!"})

    }catch(error){

        res.status(500).json({error: 'Couldnt delete book!'})
    }
    

});

app.post('/api/verifyUser/:id', async (req, res)=>{
    const idUser =  req.params.id;
    console.log(idUser);
    try{
        const validateUserQuery = `UPDATE usuario SET is_verified = true WHERE id = $1`;
        await db.query(validateUserQuery, [idUser]);
        res.status(200).json({message: "Usuario validado con exito"});
    }catch(err){
        res.status(500).json({err: 'no se pudo validar el usuario'})
    }
})

app.delete('/api/verifyUser/deleteUser/:id', async (req, res)=>{
    const idUser =  req.params.id;
    console.log(idUser);
    try{
        const deleteUserQuery = `DELETE FROM usuario where id = $1`;
        await db.query(deleteUserQuery, [idUser]);
        res.status(200).json({message: "Usuario eliminado con exito"});
    }catch(err){
        res.status(500).json({err: "No se pudo borrar el usuario"})
    }
})


app.post('/api/editBook', verifyToken, async (req, res)=>{
    try{
        const idUsuario =  req.user.userId;
        const {titulo, autor, isbn, precio, idLibro} = req.body;
        console.log("Id Usuario " + idUsuario);
        console.log({titulo, autor, isbn, precio, idLibro});

        const updateBookQuery = `update libro set titulo = $1, autor = $2, isbn = $3, precio = $4 where id_libro = $5 and idusuario = $6 `;

        await db.query(updateBookQuery, [titulo, autor, isbn, precio, idLibro, idUsuario])

        res.status(200).json({message: "So far so good"});

    }catch (error){

        res.status(500).json({error: "Book update failed"})

    }
});

app.get('/api/getUsers', async (req, res)=>{
    try{
        const getUsersQuery = `SELECT id, nombres, apellidos, correo, codigo, credencial FROM usuario where is_verified = false`
        const responseGetUsers = await db.query(getUsersQuery);

        console.log(responseGetUsers.rows);
        const usersInfo = responseGetUsers.rows;

        res.status(200).json({message: "Query succesful", usersInfo });
    }catch(err){

        res.status(500).json({error:"Cannot get users"})
    }


});

app.get('/api/tags', async(req, res) =>{
    try{
        const getTagsQuery = `SELECT * FROM tags`;
        const responseTagQuery = await db.query(getTagsQuery);
        
        const tagsInfo = responseTagQuery.rows;
        console.log(tagsInfo);
        res.status(200).json({message: "Tags obtenidos correctamente", tagsInfo})

    }catch(err){
        res.status(500).json({err: "No se pudieron obtener los tags!"});
    }



});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  