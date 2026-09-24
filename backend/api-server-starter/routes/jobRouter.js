const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const {
    getAllJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobControllers')

const router = express.Router()
router.get('/', getAllJobs)
router.get('/:id', getJobById)

router.use(requireAuth)

router.post('/', createJob)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)

module.exports = router 
