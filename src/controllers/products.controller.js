//#region imports
import { response } from "express";
import { Product } from "../models/Product.js";

//#region responses
import constantsSuccess from "../middlewares/const/constantsSuccess.js";

import {
    errorResponse500
} from "../middlewares/errorControl.js";

import {
    successResponse
} from "../middlewares/successControl.js";
//#endregion responses

//#endregion imports

export async function getProducts(req, res = response) {
  try {
    const product = await Product.findAll({order: [['id', 'DESC']]});
    res.json(product);
  } catch (error) {
    errorResponse500(res, error);
  }
}

export async function createProduct(req, res = response) {
  const { handle, title, description, sku, grams, stock, price, compare_price, barcode } = req.body;
  try {
    let newProduct = await Product.create(
      {
        handle,
        title,
        description,
        sku,
        grams,
        stock,
        price,
        compare_price,
        barcode
      }
    );
    successResponse(res, constantsSuccess.SUCCESS_MODEL_CREATE_CODE, {
      product: newProduct
    });
  } catch (error) {
    errorResponse500(res, error);
  }
}

export async function getProduct(req, res = response) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    res.json(product);
  } catch (error) {
    errorResponse500(res, error);
  }
}

export const updateProduct = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { handle, title, description, sku, grams, stock, price, compare_price, barcode } = req.body;

    const product = await Product.findByPk(id);
    product.handle = handle;
    product.title = title;
    product.description = description;
    product.sku = sku;
    product.grams = grams;
    product.stock = stock;
    product.price = price;
    product.compare_price = compare_price;
    product.barcode = barcode;
    await product.save();

    successResponse(res, constantsSuccess.SUCCESS_MODEL_UPDATE_CODE, {
      product: product
    });
  } catch (error) {
    errorResponse500(res, error);
  }
};

export async function deleteProduct(req, res = response) {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    errorResponse500(res, error);
  }
}
