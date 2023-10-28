require('dotenv').config();
const express = require('express')
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute')
const app = express();
connectDB();

app.use(cors())
app.use(express.json({limit:"10mb"}))
app.use((req, res, next) => {
     console.log(req.path, req.method);
     next();
})
app.use('/api/user', userRouter)


app.listen(process.env.PORT, () => {
     console.log(`server is running on port: ${process.env.PORT}`);
})