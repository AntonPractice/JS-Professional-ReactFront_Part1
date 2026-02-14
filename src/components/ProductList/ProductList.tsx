import React, { useState } from 'react';
import {
  Grid,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../types';
import styles from './ProductList.module.scss';
import AddProductModal from '../AddProductModal/AddProductModal';

interface ProductListProps {
  products: Product[];
  isAdmin: boolean;
  onUpdateProduct: (id: string, updated: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onAddProduct: (newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isAdmin,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterBrand, setFilterBrand] = useState<string>('');
  const [filterInStock, setFilterInStock] = useState<string>('');
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const pageSize = 6;

  // Фильтрация
  const filteredProducts = products.filter((p) => {
    if (filterCategory && p.category !== filterCategory) return false;
    if (filterBrand && p.brand !== filterBrand) return false;
    if (filterInStock === 'inStock' && !p.inStock) return false;
    if (filterInStock === 'outOfStock' && p.inStock) return false;
    return true;
  });

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const clearFilters = () => {
    setFilterCategory('');
    setFilterBrand('');
    setFilterInStock('');
    setPage(1);
  };

  return (
    <div className={styles.productList}>
      {/* Фильтры */}
      <Box className={styles.filters}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Категория</InputLabel>
          <Select
            value={filterCategory}
            label="Категория"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="split">Сплит</MenuItem>
            <MenuItem value="window">Оконный</MenuItem>
            <MenuItem value="mobile">Мобильный</MenuItem>
            <MenuItem value="cassette">Кассетный</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Бренд</InputLabel>
          <Select
            value={filterBrand}
            label="Бренд"
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="daikin">Daikin</MenuItem>
            <MenuItem value="mitsubishi">Mitsubishi</MenuItem>
            <MenuItem value="lg">LG</MenuItem>
            <MenuItem value="samsung">Samsung</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Наличие</InputLabel>
          <Select
            value={filterInStock}
            label="Наличие"
            onChange={(e) => setFilterInStock(e.target.value)}
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="inStock">В наличии</MenuItem>
            <MenuItem value="outOfStock">Нет в наличии</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={clearFilters}>
          Сбросить
        </Button>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Добавить товар
          </Button>
        )}
      </Box>

      {/* Сетка товаров */}
      {paginatedProducts.length > 0 ? (
        <Grid container spacing={3} className={styles.grid}>
          {paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product}
                isAdmin={isAdmin}
                onSave={onUpdateProduct}
                onDelete={isAdmin ? onDeleteProduct : undefined}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" className={styles.noProducts}>
          Товары не найдены
        </Typography>
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <Box className={styles.pagination}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Модалка добавления товара */}
      <AddProductModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddProduct}
      />
    </div>
  );
};

export default ProductList;