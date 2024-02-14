// image uploader
// cleaner import than 20 lines of const or let
const {PORT, JWT_KEY, express, multer, userAuthMiddlW, User, jwt, cors, bcrypt} = require("./imports");


const app = express();
const upload = multer();
app.use(express.json());
app.use(cors()); // to enable FE requests to hit BE


// routes - sign up, sign in, uploadImage
app.post("/signup", async function(req, res) {
    // name, username, email, password passed here in body
    const {name, username, password} = req.body;
    
    // const response = signUpSchema.safeParse(req.body);
    // if(!response.success) {
    //     return res.status(400).json({
    //         error : "Incorrect input type"
    //     })
    // }
    
    // check if user already exists in DB
    const doesExist = await User.findOne({username}); 
    if (doesExist) {
        return res.status(409).json({
            error : "User already exists, log in!"
        })
    }

    //! since user is unique and new, hash password
    const hashedPass = await bcrypt.hash(password, 10);
    console.log("woooo:  "+hashedPass);
    // add user to DB
    const newUser = await User.create({
        name, 
        username,  
        password : hashedPass
    })
    console.log(newUser);
    res.json(newUser);

});

app.post("/signin", async function(req, res) {
    const {username, password} = req.body;
    console.log(req.body);
    // const response = signInSchema.safeParse(req.body);
    // if(!response.success) {
    //     res.status(400).json({
    //         error : "Incorrect input type"
    //     })
    // }
   
    const doesExist = await User.findOne({username});
    // console.log(doesExist);
    if (!doesExist) {
        return res.status(404).json({
            error : "This user does not exist"
        })
    }

    const isPassValid = bcrypt.compare(password, doesExist.password);
    if (!isPassValid) {
        return res.status(401).json({
            error: "Incorrect password"
        });
    }
    
    // user confirmed, sign and return token
    const token = jwt.sign({username}, JWT_KEY);
    
    console.log(`Bearer ${token}`);
    res.json({
        fullToken : `Bearer ${token}`
    });
});

app.post("/uploadImage", userAuthMiddlW, upload.single("image"), async (req, res) => {
    // user only sends image data
    // we use multer to receive image data
    //* upload.single() returns image data in req.file

    const imageData = req.file.buffer;  

    // getting username from token
    const token = req.headers.authorization.split(" ")[1];
    const username = jwt.decode(token); 

    await User.updateOne({username}, {
        "$push" : {
            images : imageData
        }
    })

    // send res 
    res.json({
        success : "Image uploaded!"
    })

});

app.listen(PORT, ()=> {
    console.log(`Server listening on PORT ${PORT}`);
})
