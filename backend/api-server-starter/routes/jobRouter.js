const express = require('express')

const {
    getAllJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobControllers')

const router = express.Router()

router.get('/', getAllJobs)
router.post('/', createJob)
router.get('/:id', getJobById)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)

module.exports = router 
