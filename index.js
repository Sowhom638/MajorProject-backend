const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const Product = require("./models/product.model");
const Address = require("./models/address.model");
const Category = require("./models/category.model");

const fs = require("fs");

initializeDatabase();

const jsonData = fs.readFileSync("categories.json", "utf-8");
const categoriesData = JSON.parse(jsonData);

async function seedCategoryData() {
  try {
    for (catagoryData of categoriesData) {
      const newCategory = new Category({
        name: catagoryData.name,
        img: catagoryData.img
      });
      await newCategory.save();

    }
  } catch (error) {
    console.log("Error while seeding the data");

  }
}
// seedCategoryData();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Product APIs
async function createProduct(newProduct) {
  try {
    const product = new Product(newProduct);
    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
    console.log(error);
  }
}
app.post("/products", async (req, res) => {
  try {
    const savedProduct = await createProduct(req.body);
    res
      .status(201)
      .json({ message: "Product added successfully.", product: savedProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
});

async function readProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
}
app.get("/products/:productId", async (req, res) => {
  try {
    const product = await readProductById(req.params.productId);
    if (product.length != 0) {
      res
        .status(200)
        .json({ message: "Product data founded successfully.", product });
    } else {
      res.status(404).json({ error: "Product not Found." });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.get("/products/cart/cartItems", async (req, res) => {
  try {
    const products = await Product.find({ isCarted: true });
    
    if (products.length === 0) {
      return res.status(404).json({ 
        error: "No products found in cart." 
      });
    }
    
    res.status(200).json({ 
      message: "Product data found successfully.", 
      products 
    });
    
  } catch (error) {
    console.error("Error fetching cart products:", error);
    res.status(500).json({ 
      error: "Internal server error while fetching cart products." 
    });
  }
});
app.get("/products/wishlist/wishlistItems", async (req, res) => {
  try {
    const product = await Product.find({ isWished: true });;
    if (product.length != 0) {
      res
        .status(200)
        .json({ message: "Product data founded successfully.", product });
    } else {
      res.status(404).json({ error: "Product not Found." });
      throw "Error in finding data";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

async function readAllProducts() {
  try {
    const product = await Product.find();
    return product;
  } catch (error) {
    throw error;
  }
}
app.get("/products", async (req, res) => {
  try {
    const product = await readAllProducts();
    if (product.length != 0) {
      res
        .status(200)
        .json({ message: "Product data founded successfully.", product });
    } else {
      res.status(404).json({ error: "Product not Found." });
      throw "Error in finding data";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

async function updateProduct(productId, dataToUpdate) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, dataToUpdate, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    console.log("Error in updating Product rating", error);
  }
}
app.post("/products/:productId", async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.productId, req.body);
    if (updatedProduct) {
      res
        .status(200)
        .json({ message: "Product updated successfully.", updatedProduct });
    } else {
      res.status(404).json({ error: "Product doesn't exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to update Product" });
  }
});

async function deleteProduct(productId) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    console.log(error);
  }
}
app.delete("/products/:productId", async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.productId);
    if (deletedProduct) {
      res
        .status(200)
        .json({ message: "Product deleted successfully.", deletedProduct });
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Product" });
  }
});

// Category APIs
async function readCategoriesById(categoryId) {
  try {
    const category = await Category.findById(categoryId);
    return category;
  } catch (error) {
    throw error;
  }
}
app.get("/categories/:categoryId", async (req, res) => {
  try {
    const category = await readCategoriesById(req.params.categoryId);
    if (category.length != 0) {
      res
        .status(200)
        .json({ message: "Categories data founded successfully.", category });
    } else {
      res.status(404).json({ error: "Categories not Found." });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

async function readAllCategories() {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw error;
  }
}
app.get("/categories", async (req, res) => {
  try {
    const categories = await readAllCategories();
    if (categories.length != 0) {
      res
        .status(200)
        .json({ message: "Categories data founded successfully.", categories });
    } else {
      res.status(404).json({ error: "Categories not Found." });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Address APIs
async function createAddress(newAddress) {
  try {
    const address = new Address(newAddress);
    const savedAddress = await address.save();
    return savedAddress;
  } catch (error) {
    console.log(error);
  }
}
app.post("/addresses", async (req, res) => {
  try {
    const savedAddress = await createAddress(req.body);
    res
      .status(201)
      .json({ message: "Address added successfully.", address: savedAddress });
  } catch (error) {
    res.status(500).json({ error });
  }
});

async function readAllAddresses() {
  try {
    const addresses = await Address.find();
    return addresses;
  }
  catch (error) {
    throw error;
  }
}
app.get("/addresses", async (req, res) => {
  try {
    const addresses = await readAllAddresses();
    if (addresses.length != 0) {
      res
        .status(200)
        .json({ message: "Addresses data founded successfully.", addresses });
    } else {
      res.status(404).json({ error: "Addresses not Found." });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

async function deleteAddress(addressId) {
  try {
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    return deletedAddress;
  } catch (error) {
    console.log(error);
  }
}
app.delete("/addresses/:addressId", async (req, res) => {
  try {
    const deletedAddress = await deleteAddress(req.params.addressId);
    if (deletedAddress) {
      res.status(200).json({ message: "Address deleted successfully.", deletedAddress });
    } else {
      res.status(404).json({ error: "Address not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Address" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
