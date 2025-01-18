import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: "string",
      required: true,
      trim: true,
    },
    description: {
      type: "string",
      required: true,
    },
    link: {
      type: "string",
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)/.test(v);
        },
        massage: (props) => `${props.value} is not a valid URL !`,
      },
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

const Projects = mongoose.model("Projects", projectSchema);
export { Projects };
