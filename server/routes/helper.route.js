import express from "express";
import path from "path";
import formidableMiddleware from "express-formidable";
import fs, { readFileSync } from "fs";

const app = express();
app.use(formidableMiddleware());

app.post("/upload-image", async (req, res) => {
  try {
    const name = req.fields.name;
    const folderName = req.fields.folderName;
    const file = req.files?.file;
    if (!file || !name || !folderName) {
      console.error("Invalid data:", { file, name, folderName });
      return res.status(400).json({ message: "Invalid data" });
    }
    const folderPath = path.resolve("../public/uploads", folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const fileName = `${name}.${file.name.split(".")[1]}`;
    const fileUploadPath = path.join(folderPath, fileName);
    fs.writeFileSync(fileUploadPath, Buffer.from(fs.readFileSync(file.path)));
    if (!readFileSync(fileUploadPath)) {
      console.error("File upload failed:", fileUploadPath);
      return res.status(500).json({ message: "File upload failed" });
    }
    const filePath = `/uploads/${folderName}/${name}.${
      file.name.split(".")[1]
    }`;
    res.status(201).json({
      message: "Image uploaded successfully",
      filePath,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default app;
