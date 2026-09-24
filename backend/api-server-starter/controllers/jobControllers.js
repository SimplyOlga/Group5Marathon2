const Job = require("../models/jobModel");
const mongoose = require("mongoose");


const getAllJobs = async (req, res) => {
    const limit = parseInt(req.query._limit);

    try {
        const jobs = limit
            ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
            : await Job.find({}).sort({ createdAt: -1 });
        // const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Could not get jobs" })
    }
}

const createJob = async (req, res) => {
    try {
        const newJob = await Job.create({ ...req.body });
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: "Failed to make job" })
    }
}


const getJobById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }
    try {
        const job = await Job.findOne({ _id: id });
        console.log(job)
        res.status(200).json(job);
    } catch (error) {
        res.status(404).json({ messsage: "Failed to get job by ID" });
    }
}


const updateJob = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        else {
            res.status(200).json(updatedJob);
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error while updating job" });
    }
}


const deleteJob = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const deleteJob = await Job.findByIdAndDelete(id);

        if (!deleteJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        else {
            res.status(200).json(deleteJob);
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error while deleteing job" });
    }
}


module.exports = {
    getAllJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob
}