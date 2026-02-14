import  { useState } from 'react';
import Layout from './components/Layout/Layout';
import ProductList from './components/ProductList/ProductList';
import UserList from './components/UserList/UserList';
import UserProfile from './components/UserProfile/UserProfile';
import { mockProducts } from './mocks/products';
import { mockUsers } from './mocks/users';
import { currentUser, setCurrentUserRole } from './mocks/currentUser';
import type { Product, User, CreateProductDto, UserRole } from './types';

function App() {
  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState<Product[]>([...mockProducts]);
  const [users, setUsers] = useState<User[]>([...mockUsers]);
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);
  const [user, setUser] = useState<User>({ ...currentUser });

  const isAdmin = user.role === 'admin';

  const handleRoleToggle = () => {
    const newRole: UserRole = isAdmin ? 'user' : 'admin';
    setUser((prev) => ({ ...prev, role: newRole }));
    setCurrentUserRole(newRole);
  };

  const handleUpdateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...updated, updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProduct = (newProduct: CreateProductDto) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [...prev, product]);
  };

  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role: newRole, updatedAt: new Date().toISOString() } : u
      )
    );
    if (userId === user.id) {
      setUser((prev) => ({ ...prev, role: newRole }));
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (selectedUser?.id === userId) setSelectedUser(null);
  };

  const handleUpdateUserProfile = (userId: string, updated: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, ...updated, updatedAt: new Date().toISOString() } : u
      )
    );
    if (userId === user.id) {
      setUser((prev) => ({ ...prev, ...updated }));
    }
    if (selectedUser?.id === userId) {
      setSelectedUser((prev) => prev ? { ...prev, ...updated } : null);
    }
  };

  return (
    <Layout
      currentTab={tab}
      onTabChange={setTab}
      isAdmin={isAdmin}
      onRoleToggle={handleRoleToggle}
    >
      {tab === 0 && (
        <ProductList
          products={products}
          isAdmin={isAdmin}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddProduct={handleAddProduct}
        />
      )}
      {tab === 1 && isAdmin && (
        <UserList
          users={users}
          isAdmin={isAdmin}
          onUpdateUserRole={handleUpdateUserRole}
          onDeleteUser={handleDeleteUser}
          onSelectUser={setSelectedUser}
        />
      )}
      {tab === 2 && (
        <UserProfile
          user={selectedUser}
          currentUser={user}
          onSave={handleUpdateUserProfile}
        />
      )}
    </Layout>
  );
}

export default App;