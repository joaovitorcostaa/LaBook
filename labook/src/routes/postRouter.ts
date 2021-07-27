import { Router } from "express";
import { createPost } from "../controller/post/createPost";
import { getPostById } from "../controller/post/getPostById";

export const postRouter = Router()

postRouter.put("/", createPost)
postRouter.get("/:id", getPostById)