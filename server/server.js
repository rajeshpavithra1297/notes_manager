const express = require ("express")
const cors= require("cors")
const dns= require("dns");
require("dotenv").config();


const authRoutes= require("./routes/authRoutes");
const noteRoutes = require("./routes/notesRoute");



const app= express();
app.use(cors());
app.use(express.json());

dns.setServers(["1.1.1.1","8.8.8.8"])
const connectDB= require("./config/db");
connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})