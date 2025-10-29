import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// INFO: Route for adding a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const productImages = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );

    let imageUrls = await Promise.all(
      productImages.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added" });
  } catch (error) {
    console.log("Error while adding product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for fetching all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error while fetching all products: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log("Error while removing product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// INFO: Route for fetching a single product
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error while fetching single product: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const product = await productModel.findById(_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update basic fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? Number(price) : product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.bestSeller =
      bestSeller !== undefined ? bestSeller === "true" : product.bestSeller;

    // Handle image updates
    let updatedImages = [...product.image];

    for (let i = 1; i <= 4; i++) {
      const file = req.files?.[`image${i}`]?.[0];
      const existing = req.body[`existingImage${i}`];

      if (file) {
        // upload new image
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        updatedImages[i - 1] = result.secure_url;
      } else if (existing === "") {
        // remove image (delete from Cloudinary)
        const toDelete = updatedImages[i - 1];
        if (toDelete) {
          // extract public_id to delete
          const publicId = toDelete.split("/").slice(-1)[0].split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
        updatedImages[i - 1] = null;
      } else if (existing) {
        // keep same
        updatedImages[i - 1] = existing;
      }
    }

    product.image = updatedImages.filter(Boolean);
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  getSingleProduct,
  updateProduct,
};
