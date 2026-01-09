import Task from "../models/taskModel.js";

 const handleAddTask = async (req, res) => {
  try {
    const { taskName, description, startDate, endDate } = req.body;

    if (!taskName || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Task name, start date and end date are required",
      });
    }

    const task = await Task.create({
      taskName,
      description,
      startDate,
      endDate,
      userId: req.user._id, 
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 const handleGetAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const handleUpdateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { status: "fulfilled" },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task marked as fulfilled",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const handleDeleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {handleAddTask,handleGetAllTasks,handleUpdateTaskStatus,handleDeleteTask}

