import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';


const app = express();

await connectDB()

//Middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("API is Working")
})
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter)


// Suppress Chrome DevTools automatic probe (harmless 404 noise)
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
    res.status(200).json({})
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log('Server is Running on Port ' + PORT)
})

export default app;
