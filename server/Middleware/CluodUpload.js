import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dbcygr0pi",
  api_key: "385875383263773",
  api_secret: "W_CxI96dDTcXmDMWlcafVW8iTmY",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});
const upload = multer({ storage });

export default upload;
