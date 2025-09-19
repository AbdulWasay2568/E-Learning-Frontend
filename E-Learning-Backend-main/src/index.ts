import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import {
  userRouter,
  enrollmentRouter,
  feedbackRouter,
  groupMemberRouter,
  groupRouter,
  noteRouter,
  questionRouter,
  quizRouter,
  chatMessageRouter,
  commentRouter,
} from "./api/routes";

const app: Express = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use("/enrollments", enrollmentRouter);
app.use("/quizzes", quizRouter);
app.use("/questions", questionRouter);
app.use("/groups", groupRouter);
app.use("/group-members", groupMemberRouter);
app.use("/chat-messages", chatMessageRouter);
app.use("/feedbacks", feedbackRouter);
app.use("/comments", commentRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("E-Learning backend is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
