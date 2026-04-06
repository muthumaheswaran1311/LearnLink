import { assistantEvaluator, assistantResponse, fetchAssignment, fetchFlashcard, fetchImportant } from "../controller/contentController.js";
import express from "express";

const contentRouter = express.Router();

contentRouter.post("/flashcards",fetchFlashcard);
contentRouter.post("/imp",fetchImportant);
contentRouter.post("/assignment",fetchAssignment);
contentRouter.post("/assistant",assistantResponse);
contentRouter.post("/evaluator",assistantEvaluator);

export {contentRouter};