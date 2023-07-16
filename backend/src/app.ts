import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoute from "./routes/notes"; 
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";

const app = express();


app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRoute);

app.use((req, res, next) => {
    next(createHttpError(404,"Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{//Error handler has to take these 4 arguments with their data types to recognize it as an error handler
    console.error(error);
    let errorMessage = "An unknown error occured";
    
    let statusCode = 500;
    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error: errorMessage});
});

export default app;
