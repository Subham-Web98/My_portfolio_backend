import { Router } from "express";
import {
  uploadProjects,
  getAllProjects,
  deleteProject,
} from "../controllers/projectController.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// routes
router.route("/createProject").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  uploadProjects
);

//

router.route("/allProjects").get(getAllProjects);

//

router.route("/delete/:id").delete(deleteProject);

export default router;
