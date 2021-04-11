import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
const PORT = process.env.PORT;

const handleListening = () => console.log(`PORT : ${PORT} 응답 대기중 ... `);

app.listen(PORT, handleListening);