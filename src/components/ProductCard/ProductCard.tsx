import React, { useState, useEffect } from 'react';
import ProductCardView from './ProductCardView';
import type { Product } from '../../types';

interface ProductCardContainerProps {
  product: Product;
  isAdmin: boolean;
  onSave: (id: string, updated: Partial<Product>) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardContainerProps> = ({
  product,
  isAdmin,
  onSave,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>(() => ({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand,
    power: product.power,
    inStock: product.inStock,
    images: product.images,
  }));

  useEffect(() => {
    if (!isEditing) {
      setEditedProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        power: product.power,
        inStock: product.inStock,
        images: product.images,
      });
    }
  }, [product, isEditing]);

  const handleEditStart = () => {
    setEditedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      power: product.power,
      inStock: product.inStock,
      images: product.images,
    });
    setIsEditing(true);
  };

  const handleEditChange = (field: keyof Product, value: any) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = () => {
    onSave(product.id, editedProduct);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      power: product.power,
      inStock: product.inStock,
      images: product.images,
    });
  };

  return (
    <ProductCardView
      product={product}
      isAdmin={isAdmin}
      onDelete={onDelete}
      isEditing={isEditing}
      editedProduct={editedProduct}
      onEditChange={handleEditChange}
      onEditSave={handleEditSave}
      onEditCancel={handleEditCancel}
      onEditStart={handleEditStart}
    />
  );
};

export default ProductCard;