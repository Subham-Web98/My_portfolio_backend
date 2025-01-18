import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Projects } from "../models/projects.model.js";
import {
  uploadCloudinary,
  deletedFromCloudinary,
} from "../utils/cloudinary.js";

//* Create a new project
const uploadProjects = asyncHandler(async (req, res) => {
  const { title, description, link } = req.body;
  const imageLocalFilePath = req.files?.image?.[0]?.path;

  if (!imageLocalFilePath) {
    throw new ApiError(400, "Image file is required");
  }

  let image;
  try {
    image = await uploadCloudinary(imageLocalFilePath);
    console.log(`Uploaded image: ${image?.url}`);
  } catch (error) {
    throw new ApiError(400, `Failed to upload image: ${error.message}`);
  }

  try {
    const project = await Projects.create({
      title,
      description,
      link,
      image: {
        url: image.url,
        public_id: image.public_id,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, project, "Project created successfully"));
  } catch (error) {
    console.error(`Failed to create project: ${error.message}`);
    throw new ApiError(500, "Something went wrong when creating project");
  }
});

//* Get All Projects
const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Projects.find();
    return res.status(200).json(new ApiResponse(200, projects, "All Projects"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong when getting projects");
  }
});

//* Delete Project
const deleteProject = asyncHandler(async (req, res) => {
  try {
    const project = await Projects.findByIdAndDelete(req.params.id);

    if (!project) throw new ApiError(404, "Project not found");

    // Delete image from Cloudinary
    if (project.image?.public_id) {
      await deletedFromCloudinary(project.image.public_id);
    }
    return res
      .status(200)
      .json(new ApiResponse(200, project, "Successfully deleted"));
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong when deleting the project",
      error: error.message,
    });
  }
});

export { uploadProjects, getAllProjects, deleteProject };
