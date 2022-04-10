import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import {
createJob,
deleteJob,
getAllJobs, 
updateJob,
showStats,
} from '../controllers/jobController.js'



router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob);

// router.post('/', auth, createJob)
// router.get( '/', auth, getAllJobs)
// // remember the :id
// router.get('/stat', auth, showStats )
// router.delete('/:id', auth, deleteJob )
// router.patch('/:id', auth, updateJob)

export default router