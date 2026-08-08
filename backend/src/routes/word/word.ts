import {Router} from 'express';
import {verifyToken} from "../../middlewares/verifyToken"
import {createWord, getWord, updateWord, deleteWord} from '../../controllers/Word/word';
const router = Router()

router.get('/', verifyToken, getWord)
router.post("/", verifyToken, createWord)
router.delete("/:id", verifyToken, deleteWord)
router.put("/:id", verifyToken, updateWord)

export default router