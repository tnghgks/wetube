import app from "./app";

const PORT = 4000;

const handleListening = () => console.log(`PORT : ${PORT} 응답 대기중 ... `);

app.listen(PORT, handleListening);