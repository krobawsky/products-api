//#region imports
import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct
} from "../controllers/products.controller.js";
import * as productsCtrl from "../controllers/products.controller.js";

//#region middlewares
import {
  authJwt
} from "../middlewares/index.js";
//#endregion 

//#endregion imports

const router = Router();

//#region products

router.get("/", [ authJwt.verifyToken ], getProducts);
router.post("/", [ authJwt.verifyToken ], createProduct);
router.get("/:id", [ authJwt.verifyToken ], getProduct);
router.put("/:id", [ authJwt.verifyToken ], updateProduct);
router.delete("/:id", [ authJwt.verifyToken ], deleteProduct);

//#endregion


export default router;