import * as dotenv from "dotenv";
import app from "./api/server";

dotenv.config();

process.on("uncaughtException", (e) => {
	//TODO  add tracing and logs
	console.log(12, e);
});

process.on("unhandledRejection", (e) => {
	//TODO  add tracing and logs
	console.log(12, e);
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}`);
});
