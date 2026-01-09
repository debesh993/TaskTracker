import express, { Router } from 'express'
import { handleAddTask, handleDeleteTask, handleGetAllTasks, handleUpdateTaskStatus } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router=express.Router()
router.post("/add-task",authMiddleware, handleAddTask);
router.get("/get-tasks",authMiddleware, handleGetAllTasks);
router.put("/complete-task/:taskId",authMiddleware, handleUpdateTaskStatus);
router.delete("/delete-task/:taskId",authMiddleware, handleDeleteTask);


export default router;