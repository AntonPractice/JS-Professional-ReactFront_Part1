export type ProductCategory = 'split' | 'window' | 'mobile' | 'cassette';
export type ProductBrand = 'daikin' | 'mitsubishi' | 'lg' | 'samsung';
export type ProductPower = 7000 | 9000 | 12000 | 18000;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  brand: ProductBrand;
  power: ProductPower;
  inStock: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export type CreateProductDto = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductDto = Partial<CreateProductDto>;

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateUserDto = Partial<Pick<User, 'username' | 'email' | 'role'>>;