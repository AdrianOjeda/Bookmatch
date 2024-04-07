import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import pg from "pg";
import sha1 from 'sha1'



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

        console.log();
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
    // Extract form data from the request body
    const { correo, password } = req.body;
    console.log(req.body);
    try {
        const hashedPassword = sha1(password);
        const credentialsValidationQuery = `SELECT correo, password FROM usuario WHERE correo = $1 AND password = $2`;
        const checkCredentialsValidation = await db.query(credentialsValidationQuery, [correo, hashedPassword]);

        console.log(checkCredentialsValidation);
          
        if(checkCredentialsValidation.rowCount === 1){
            res.status(200).json({ message: 'User registered successfully' });
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({ error: 'Incorrect password or email' });
        }
            
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  