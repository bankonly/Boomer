const Res = require("./ResponseController");
const Controller = require("./Controller");
const { ProductClass } = require("../Models/Product");
const ProductProvider = require("../Providers/ProductProvider");
const ProductImageProvider = require("../Providers/ProductImageProvider");
const FileProvider = require("../Providers/FileProvider");
const CONSTANTS = require("../../app_config/constants");

class ProductController extends Controller {
  constructor() {
    super(...arguments);
    this.data = {};
  }
  // @GET REQUEST
  async get() {
    try {
      const fetchAll = await ProductClass.fetchhAllWithStore({});
      this.response({ data: fetchAll });
    } catch ({ message }) {
      this.responseError({ msg: message });
    }
  }

  // @POST REQUEST
  async post() {
    try {
      this.data = {
        proPrice: this.body.proPrice,
        proTypeId: this.body.proTypeId,
        proQuantity: this.body.proQuantity,
        proDesc: this.body.proDesc,
        storeId: this.body.storeId,
        proName: this.body.proName,
        proImageName: this.body.proImageName
      };

      // const validate = ProductProvider.validateCreateObj(this.data);
      // if (!validate.status) return this.response(validate);

      FileProvider.saveMultipleImage(
        this.req,
        this.res,
        {
          param: "proImageName",
          limit: 3,
          path: CONSTANTS.productImgPath
        },
        async (req, isSave) => {
          if (isSave.code !== 200) return this.response(isSave);

          const addProduct = await ProductProvider.addProduct(this.data);
          if (addProduct.code == 200) {
            // const builtData = ProductImageProvider.buildInsertData(
            //   addProduct.data.proId,
            //   req.files
            // );
            // if (!builtData.status) return this.response(builtData);
            // const isSaveImg = ProductImageProvider.addProductImage(builtData.data);
            // if (isSaveImg.code !== 200) return this.response(isSaveImg);
            // delete addProduct.data.createdAt;
            // delete addProduct.data.updatedAt;
          }
          this.response(addProduct);
        }
      );
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  // @GET/{id} REQUEST
  async getWithParam() {
    const id = this.params.id;
    try {
      const isProduct = await ProductProvider.getProduct({ proId: id });
      this.response(isProduct);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  // @PUT/{id} REQUEST
  async update() {
    const id = this.params.id;
    try {
      const body = {
        proPrice: this.body.proPrice,
        proTypeId: this.body.proTypeId,
        proQuantity: this.body.proQuantity,
        proDesc: this.body.proDesc,
        storeId: this.body.storeId,
        proName: this.body.proName
      };

      const updateProduct = await ProductProvider.updateProduct(id, body);
      if (updateProduct.code == 200) {
        return this.response(updateProduct);
      }
      this.response(updateProduct);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  // @DELETE/{id} REQUEST
  async delete() {
    const id = this.params.id;
    try {
      const isProduct = await ProductProvider.destroyProduct({ proId: id });
      return this.response(isProduct);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }
}

module.exports = (...args) => new ProductController(...args);
