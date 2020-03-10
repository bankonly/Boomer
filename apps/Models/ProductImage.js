const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;

class ProductImage extends Model {}

ProductImage.init(
  {
    proImgId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    proImageName: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    proId: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn("NOW")
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn("NOW")
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
  { sequelize, modelName: "productImages" }
);

// relation to product
const { Product } = require('./Product')
ProductImage.belongsTo(Product,{
  targetKey: "proId",
  foreignKey: "proId"
})

module.exports = {
  ProductImageClass: new ProductImage(),
  ProductImage
};
