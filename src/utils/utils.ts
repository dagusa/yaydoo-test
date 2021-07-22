import { ProductBDModel } from "../models/product-db.model";
import { ProductModel } from "../models/product.model";

export class UtilsClass {
    groupProducts = (productDB: Array<ProductBDModel>): Array<any> => {
        const result = productDB.reduce((result, item) => {
            const { category } = item;
            result[category] = result[category] || [];
            result[category].push(this.getProductResult(item));
            return result;
        }, {});
        return Object.entries(result).map(([key, value]) => ({
            category: key,
            products: value
        }));
    }
    getProductResult = (product: ProductBDModel): ProductModel => {
        const { author, coverImage, id, name, ratingTotal: total, ratingValue: value } = product;
        return {
            author,
            coverImage,
            id,
            name,
            rating: {
                total,
                value
            }
        };
    }
}