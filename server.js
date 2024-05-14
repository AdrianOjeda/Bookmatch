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
        cb(null, 'uploads/'); 
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
                        try{
                            const idUsuarioQuery = `SELECT id FROM usuario WHERE correo = $1 AND password = $2`;
                            const idResponse = await db.query(idUsuarioQuery, [correo, hashedPassword]);
                            
                            console.log(idResponse.rows[0].id);
                            res.status(200).json(idResponse.rows[0].id);
                        }catch(err){
                            res.status(500).json({err: "No se pudo registrar el usuario"});
                        }
                        
                    }catch(error){
                        console.error('Error registering user:', error);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(500).json({ error: 'No se pudo registrar al usuario!' });
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
        const { titulo, autor, isbn, descripcion } = req.body;
        const image = req.file; // Access the uploaded file
        const imageName = image.filename; // Store the filename
        console.log(imageName);
        const tags = JSON.parse(req.body.tags);
        console.log("SelectedTags");
        console.log(tags);
        // Insert book data into the database, including the image filename or URL
        const insertQuery = `
            INSERT INTO libro (titulo, autor, isbn, descripcion, idusuario, coverimage)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_libro`;
        const result = await db.query(insertQuery, [titulo, autor, isbn, descripcion, userId, imageName]); // Assuming filename is used to store the image
        console.log(result.rows);

        const bookId = result.rows[0].id_libro;

        console.log(bookId);
        try{
            for (const tagId of tags) {
                const insertTagQuery = `
                    INSERT INTO libro_tags (libroid, tagid)
                    VALUES ($1, $2)`;
                await db.query(insertTagQuery, [bookId, tagId]);
            }

        }catch(error){
            res.status(500).json({error: "No se pudieron agregar los tags"});
        }
        
        // Respond with success message
        res.status(200).json({ message: 'Book added successfully' });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'Failed to add book' });
    }
});

app.get('/api/renderBooks', verifyToken, async (req, res) => {
    const userId = req.user.userId;
    console.log("User");
    console.log(userId);
    try {
        const displayBooksQuery = `SELECT 
        libro.id_libro, 
        libro.titulo, 
        libro.autor, 
        libro.isbn, 
        libro.descripcion, 
        libro.coverimage, 
        usuario.nombres, 
        usuario.id,
        ARRAY_AGG(tags.tagname) AS tagsArray
    FROM 
        libro 
    INNER JOIN 
        usuario ON usuario.id = libro.idusuario 
    LEFT JOIN 
        libro_tags ON libro_tags.libroid = libro.id_libro
    LEFT JOIN 
        tags ON tags.idtag = libro_tags.tagid
    WHERE 
        usuario.id = $1
    GROUP BY 
        libro.id_libro, 
        libro.titulo, 
        libro.autor, 
        libro.isbn, 
        libro.descripcion, 
        libro.coverimage, 
        usuario.nombres, 
        usuario.id;
    `;
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

        const deleteTagsQuery = `DELETE FROM libro_tags WHERE libroid = $1`;
        await db.query(deleteTagsQuery, [bookId]);

        try {
            const deleteBookQuery = `DELETE FROM libro where id_libro =$1 AND idusuario = $2`;
            await db.query(deleteBookQuery, [bookId, userId]);
            res.status(200).json({message: "so far so good!"})
        } catch (error) {
            res.status(500).json({error: "No se pudo borrar el libro"})
        }

    }catch(error){

        res.status(500).json({error: 'No se pudieron borrar los tags'})
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
        const getProfileId = `SELECT id FROM perfil_usuario WHERE user_id = $1`;
        const idResponse = await db.query(getProfileId, [idUser]);
        const profileId = idResponse.rows[0].id;
        console.log(profileId);

        try{
            const deleteTags = `DELETE FROM user_tags WHERE user_id = $1`;
            await db.query(deleteTags, [profileId]);
            try{
                const deleteUserProfile = `DELETE FROM perfil_usuario WHERE id = $1`;
                await db.query(deleteUserProfile, [profileId]);
                try{
                    const deleteUserQuery = `DELETE FROM usuario where id = $1`;
                    await db.query(deleteUserQuery, [idUser]);
                    res.status(200).json({message: "Usuario eliminado con exito"});

                }catch(err){
                    res.status.json({err: "No se pudo borrar el usuario!"})
                }
            }catch(err){
                res.status.json({err: "No se pudo borrar el perfil"})
            }
        }catch(err){

            res.status(500).json({err: "No se pudieron borrar los tags!"});
        }
        
    }catch(err){
        res.status(500).json({err: "No se pudo obtener el id del perfil del usuario"})
    }
})


app.post('/api/editBook/:bookId', verifyToken, upload.single('image'), async (req, res)=>{
    try{
        const idUsuario =  req.user.userId;
        const idLibro = req.params.bookId;
        const {titulo, autor, isbn, descripcion} = req.body;
        console.log("Id Usuario " + idUsuario);
        console.log({titulo, autor, isbn, descripcion, idLibro});
        const image = req.file; // Access the uploaded file
        const imageName = image.filename; // Store the filename
        console.log(imageName);
        const tags = JSON.parse(req.body.tags);
        console.log("SelectedTags");
        console.log(tags);
        console.log("ID del libro "+idLibro);

        const updateBookQuery = `update libro set titulo = $1, autor = $2, isbn = $3, descripcion = $4, coverimage= $5 where id_libro = $6 and idusuario = $7 `;

        await db.query(updateBookQuery, [titulo, autor, isbn, descripcion,imageName, idLibro, idUsuario])

        try {
            const deleteTagsQuery = `DELETE FROM libro_tags WHERE libroid = $1`;
            await db.query(deleteTagsQuery, [idLibro]);
            try {
                for (const tagId of tags) {
                    const insertTagQuery = `
                        INSERT INTO libro_tags (libroid, tagid)
                        VALUES ($1, $2)`;
                    await db.query(insertTagQuery, [idLibro, tagId]);
                }
                res.status(200).json({message: "Libro actualizado"})
            } catch (error) {
                res.status.json({error: "No se pudieron insertar nuevos tags!"});
            }

        } catch (error) {
            res.status(500).json({error: "No se pudieron borrar los tags"})
        }

        

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

app.post('/api/customizeProfile/:idUsuario', upload.single('image'), async (req, res)=>{
    const idUsuario = req.params.idUsuario;
    console.log(idUsuario);
    const tags = JSON.parse(req.body.tags);
    
    const profilePicture =  req.file;
    const profilePicName =  profilePicture.filename;
    const idUsuarioInt = Number(idUsuario);
    try{
        console.log(profilePicName);
        const profilePicQuery = `INSERT INTO perfil_usuario (user_id, profile_pic)
                                VALUES ($1, $2)`;
        console.log("Es tipo: "+typeof(idUsuario));
        db.query(profilePicQuery, [idUsuarioInt, profilePicName]);

        const getIdQuery =  `SELECT id FROM perfil_usuario WHERE user_id = $1`;
        const getIdQueryResponse = await db.query(getIdQuery, [idUsuarioInt]);

       
        const idProfileUser = getIdQueryResponse.rows[0].id;
        console.log("Hola: " + idProfileUser);
        try{
            
            console.log(tags.length);
            console.log(Array.isArray(tags));
            console.log(tags);
            for (let i = 0; i<tags.length; i++){
                let tagId = tags[i];
                const insertTagsQuery = `INSERT INTO user_tags (user_id, tag_id) VALUES ($1, $2)`;
                await db.query(insertTagsQuery, [idProfileUser, tagId]);
                
            }
            
            res.status(200).json({message: "Todo piola"});
       }catch(err){

            res.status(200).json({err: "No se pudieron insertar los tags"});
       }

    }catch(err){

        res.status(500).json({err: "No se pudo insertar foto de perfill"});
    }
    

});

app.get("/api/getProfilePic", verifyToken, async (req, res)=>{
    const userId =  req.user.userId;
    console.log(userId);
    try{
        const getProfilePicQuery = `SELECT profile_pic FROM perfil_usuario where user_id =$1`;
        const responseProfilePic = await db.query(getProfilePicQuery, [userId]);
        const profile_pic = responseProfilePic.rows[0].profile_pic;
        console.log(profile_pic);

        res.status(200).json({profile_pic});


    }catch(err){


        res.status.json({erro:"No se pudo obetener la foto de perfil!"});
    }    
});

app.get("/api/getName", verifyToken, async (req, res)=>{
    
    
    try{
        const userId =  req.user.userId;
        console.log("usuario id " +userId);

        const getNameQuery = `SELECT nombres, apellidos FROM usuario WHERE id = $1`;

        const nameResponse =  await db.query(getNameQuery, [userId]);
        const fullName = nameResponse.rows[0].nombres + " "+ nameResponse.rows[0].apellidos;
        console.log(fullName);

        res.status(200).json({fullName});

    }catch(err){

        res.status(500).json({err: "No se pudo obtener el nombre"})
    }


})


app.post('/api/profile/updatePic', verifyToken, upload.single('image'), async (req, res)=>{

    const userId = req.user.userId;

    console.log(userId);
    const profilePicture =  req.file;
    
    const profilePicName =  profilePicture.filename;
    console.log(profilePicName);

    try{
        const getIdProfileQuery = `SELECT id FROM perfil_usuario WHERE user_id = $1`;
        const idProfileResponse =  await db.query(getIdProfileQuery, [userId]);
        
        const profileId = idProfileResponse.rows[0].id;
        console.log(profileId);
        try{
            const updatePicQuery = `UPDATE perfil_usuario SET profile_pic = $1 WHERE id = $2`;
            await db.query(updatePicQuery, [profilePicName, profileId]);
            res.status(200).json({message: "Foto de perfil actualizada con exito"});
        }catch(err){
            res.status.json({err: "No se pudo actualizar la foto de perfil"});
        }
    }catch(err){
        res.status(500).json({err: "No se pudo obtener el ID del perfil"});
        
    }

})

app.get('/api/getTags', verifyToken, async (req, res)=>{

    const userId = req.user.userId;
    console.log(userId);
    try{
        const getIdProfileQuery = `SELECT id FROM perfil_usuario WHERE user_id = $1`;
        const idProfileResponse =  await db.query(getIdProfileQuery, [userId]);
        
        const profileId = idProfileResponse.rows[0].id;
        console.log(profileId);
        try{
            const getTagsQuery = `SELECT tags.tagname FROM tags INNER JOIN user_tags ON tags.idtag = user_tags.tag_id WHERE user_tags.user_id =$1`;
            const tagResponse = await db.query(getTagsQuery, [profileId]);
            const sentTags = tagResponse.rows;
            console.log(sentTags);
            res.status(200).json({message: "Foto de perfil actualizada con exito", sentTags});
        }catch(err){
            res.status.json({err: "No se pudo actualizar la foto de perfil"});
        }
    }catch(err){
        res.status(500).json({err: "No se pudo obtener el ID del perfil"});
        
    }
})

app.post('/api/customizeTags/', verifyToken, async (req, res) => {
    const userId = req.user.userId;
    console.log(userId);
    
    const tags = req.body; 
    console.log("los tags");
    console.log(tags);
    try {
        const getIdProfileQuery = `SELECT id FROM perfil_usuario WHERE user_id = $1`;
        const idProfileResponse =  await db.query(getIdProfileQuery, [userId]);
        const profileId = idProfileResponse.rows[0].id;
        console.log("id perfil " + profileId);

        try{

            try{
                const deleteTagsQuery = `DELETE FROM user_tags WHERE user_id = $1`;
                await db.query(deleteTagsQuery, [profileId]);

                try {
                    console.log(tags.length);
                    console.log(Array.isArray(tags));
                    console.log(tags);
                    for (let i = 0; i<tags.length; i++){
                        let tagId = tags[i];
                        const insertTagsQuery = `INSERT INTO user_tags (user_id, tag_id) VALUES ($1, $2)`;
                        await db.query(insertTagsQuery, [profileId, tagId]);
                
                    }
            
                    res.status(200).json({message: "Todo piola"});

                } catch (error) {
                    res.status(500).json({error: "No "})
                }

                
            }catch(err){
                res.status(500).json({err: 'No se pudieron borrar los tags'});
            }
            


        }catch(err){
            res.status(500).json({ err: 'No se pudieron optimizar los tags' });
        }
    } catch (err) {
        
        res.status(500).json({err: "No se pudo obtener el ID del perfil"});
    }
});


app.get('/api/feedBooks', verifyToken,  async (req, res)=>{
    const userId = req.user.userId;
    
    console.log("El id del usuario: " +userId);

    try {
        const getIdProfileQuery = `SELECT id FROM perfil_usuario WHERE user_id = $1`;
        const idProfileResponse =  await db.query(getIdProfileQuery, [userId]);
        const profileId = idProfileResponse.rows[0].id;
        console.log("id perfil " + profileId);
        
        try {
            const matchingBooksQuery = `SELECT 
            libro.id_libro, 
            libro.titulo, 
            libro.autor, 
            libro.isbn, 
            libro.descripcion, 
            libro.coverimage, 
            usuario.nombres, 
            usuario.id,
            ARRAY_AGG(tags.tagname) AS tagsArray
        FROM 
            libro 
        INNER JOIN 
            usuario ON usuario.id = libro.idusuario 
        LEFT JOIN 
            libro_tags ON libro_tags.libroid = libro.id_libro
        LEFT JOIN 
            tags ON tags.idtag = libro_tags.tagid
        WHERE 
            usuario.id != $1 
            AND EXISTS (
                SELECT 1 
                FROM 
                    user_tags 
                WHERE 
                    user_tags.user_id = $2 
                    AND user_tags.tag_id = tags.idtag
            )
        GROUP BY 
            libro.id_libro, 
            libro.titulo, 
            libro.autor, 
            libro.isbn, 
            libro.descripcion, 
            libro.coverimage, 
            usuario.nombres, 
            usuario.id;`;

            const matchingBooksResponse =  await db.query(matchingBooksQuery, [userId, profileId]);


            const booksJSON = matchingBooksResponse.rows; 
            console.log(booksJSON);

            res.status(200).json(booksJSON); 
        } catch (error) {
            res.status(500).json({error: "No se pudieron obtener los libros"})
        }

        
        
    } catch (error) {
        res.status(500).json({error: "No se pudieron cargar los libros"})
    }
})



app.get("/api/getUserName/:userId", async (req, res)=>{
    
    const userId =  req.params.userId;
    console.log("usuario id " +userId);
    
    try{

        const getNameQuery = `SELECT nombres, apellidos FROM usuario WHERE id = $1`;

        const nameResponse =  await db.query(getNameQuery, [userId]);
        const fullName = nameResponse.rows[0].nombres + " "+ nameResponse.rows[0].apellidos;
        console.log(fullName);

        res.status(200).json({fullName});

    }catch(err){

        res.status(500).json({err: "No se pudo obtener el nombre"})
    }


})

app.get("/api/getUserProfilePic/:userId", async (req, res)=>{
    const userId =  req.params.userId;
    console.log("fotico " +userId);
    try{
        const getProfilePicQuery = `SELECT profile_pic FROM perfil_usuario where user_id =$1`;
        const responseProfilePic = await db.query(getProfilePicQuery, [userId]);
        const profile_pic = responseProfilePic.rows[0].profile_pic;
        console.log(profile_pic);

        res.status(200).json({profile_pic});


    }catch(err){


        res.status(500).json({err:"No se pudo obetener la foto de perfil!"});
    }    
});

app.get('/api/renderUserBooks/:token',  async (req, res) => {
    const userId = req.params.token;
    console.log("User");
    console.log(userId);
    try {
        const displayBooksQuery = `SELECT 
        libro.id_libro, 
        libro.titulo, 
        libro.autor, 
        libro.isbn, 
        libro.descripcion, 
        libro.coverimage, 
        usuario.nombres, 
        usuario.id,
        ARRAY_AGG(tags.tagname) AS tagsArray
    FROM 
        libro 
    INNER JOIN 
        usuario ON usuario.id = libro.idusuario 
    LEFT JOIN 
        libro_tags ON libro_tags.libroid = libro.id_libro
    LEFT JOIN 
        tags ON tags.idtag = libro_tags.tagid
    WHERE 
        usuario.id = $1
    GROUP BY 
        libro.id_libro, 
        libro.titulo, 
        libro.autor, 
        libro.isbn, 
        libro.descripcion, 
        libro.coverimage, 
        usuario.nombres, 
        usuario.id;
    `;
        const displayBooks = await db.query(displayBooksQuery, [userId]);
        console.log(displayBooks.rows);
        res.status(200).json(displayBooks.rows);

    } catch (error) {
        res.status(500).json({ error: "Failed to load books" });
    }
});


app.post('/api/reportUser/:userReportedId', upload.single('image'), async (req, res)=>{

    const reportedUserId = req.params.userReportedId;
    const evidence =  req.file;
    const evidenceFile =  evidence.filename;
    const motivo = req.body.motivo;

    try {
        const reportQuery = `INSERT INTO reportes (motivo, evidencia, id_usuario) VALUES ($1, $2, $3)`;
        await db.query(reportQuery, [motivo, evidenceFile, reportedUserId]);
        res.status(200).json({message: "El reporte se realizo con exito!"});
    } catch (error) {
        res.status(500).json({error: "No se pudo realizar el reporte!"})
    }


})

app.get('/api/renderReports', async (req, res)=>{
    try {
        const fetchReportQuery = `SELECT perfil_usuario.profile_pic, reportes.motivo, reportes.id_reporte, reportes.evidencia, reportes.id_usuario, usuario.nombres, usuario.apellidos, usuario.correo, usuario.codigo 
        FROM reportes 
        INNER JOIN perfil_usuario ON reportes.id_usuario = perfil_usuario.user_id 
        INNER JOIN usuario ON reportes.id_usuario = usuario.id;`;

        const responseReportQuery = await db.query(fetchReportQuery);

        console.log(responseReportQuery.rows);

        const reportsInfo = responseReportQuery.rows;
        res.status(200).json({message: "Todo bien", reportsInfo})
        
    } catch (error) {
        res.status(500).json({error: "No se pudieron cargar los reportes"})
    }


})

app.get('/api/getUserTags/:userId', async (req, res)=>{
    const userId = req.params.userId;

    console.log(userId);
    try {
        const profileIdQuery = `SELECT id FROM perfil_usuario WHERE user_id = $1`;
        const profileIdResponse = await db.query(profileIdQuery, [userId]);

        console.log(profileIdResponse.rows);
        const profileId = profileIdResponse.rows[0];
        const profileUserId = profileId.id;
        console.log("Perfil id "+ profileUserId);


        try {
            const getUserTagsQuery = `SELECT tags.tagname FROM tags INNER JOIN user_tags ON tags.idtag = user_tags.tag_id WHERE user_tags.user_id =$1`;
            const getUserTags =  await db.query(getUserTagsQuery, [profileUserId]);

           
            const userTagsToSend = getUserTags.rows;
            console.log(userTagsToSend);

            res.status(200).json(userTagsToSend);
            
        } catch (error) {
            res.status(500).json({error:"No se pudieron obtener los tags"})
        }
    } catch (error) {
        res.status(500).json({error: "No se pudo obtener el id del perfil del usuario"})
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  


  