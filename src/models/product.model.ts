export interface ResultModel {
    category?: string;
    products: Array<ProductModel>
}

export interface ProductModel {
    author: string;
    id: string;
    name: string;
    coverImage: string;
    rating: RatingProductModel;
}

interface RatingProductModel {
    value: string;
    total: string;
}