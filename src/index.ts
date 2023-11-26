import * as dotenv from "dotenv";
dotenv.config();

import app from "./api/server";

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}`);
});
