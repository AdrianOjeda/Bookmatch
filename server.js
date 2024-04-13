import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import pg from "pg";
import sha1 from 'sha1'
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
        cb(null, file.originalname); // Use the original filename for storing the file
    }
});

// Configure multer upload middleware
const upload = multer({ storage: storage });

app.post('/api/register', async (req, res) => {
    // Extract form data from the request body
    const { nombres, apellidos, codigo, correo, password, repetirPassword } = req.body;
    console.log(req.body);
    try {
        // Perform validation checks here if needed
        const emailValidationQuery = `SELECT correo FROM usuario WHERE correo = $1`;
        const checkEmailValidation = await db.query(emailValidationQuery, [correo]);

        console.log(checkEmailValidation);
        const checkEmailDomain = "@alumnos.udg.mx";

        
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
                        INSERT INTO usuario (nombres, apellidos, correo, password, is_verified, codigo)
                        VALUES ($1, $2, $3, $4, $5, $6)
                        `;
                        await db.query(insertQuery, [nombres, apellidos, correo, hashedPassword, false, codigo]);
        
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
       
        
        if(checkCredentialsValidation.rowCount === 1 && resTokenIdQuery.rowCount === 1){
            
            try {
                const token = jwt.sign({ userId: resTokenIdQuery.rows[0].id }, 'your-secret-key');
                
                res.status(200).json({ message: 'User logged in successfully', token });
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
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  