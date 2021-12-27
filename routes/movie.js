import express from "express";
import MovieController from "../controller/MovieController";
const router = express.Router();

router.get("/", MovieController.getMovie);

router.get("/movie-details", MovieController.getMovieDetails);

export default router;
