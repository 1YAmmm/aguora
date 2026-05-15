export const customers = [
  { id: 1, name: 'Maria Santos', email: 'maria.santos@email.com', phone: '+63 912 345 6789', status: 'active', joined: 'Jan 5, 2026' },
  { id: 2, name: 'Jose Reyes', email: 'jose.reyes@email.com', phone: '+63 917 234 5678', status: 'active', joined: 'Jan 12, 2026' },
  { id: 3, name: 'Ana Cruz', email: 'ana.cruz@email.com', phone: '+63 918 345 6789', status: 'inactive', joined: 'Feb 2, 2026' },
  { id: 4, name: 'Carlos Garcia', email: 'carlos.garcia@email.com', phone: '+63 919 456 7890', status: 'active', joined: 'Feb 10, 2026' },
  { id: 5, name: 'Rosa Dela Cruz', email: 'rosa.delacruz@email.com', phone: '+63 920 567 8901', status: 'active', joined: 'Feb 18, 2026' },
  { id: 6, name: 'Miguel Torres', email: 'miguel.torres@email.com', phone: '+63 921 678 9012', status: 'inactive', joined: 'Mar 1, 2026' },
  { id: 7, name: 'Luisa Fernandez', email: 'luisa.fernandez@email.com', phone: '+63 922 789 0123', status: 'active', joined: 'Mar 5, 2026' },
  { id: 8, name: 'Pedro Lim', email: 'pedro.lim@email.com', phone: '+63 923 890 1234', status: 'active', joined: 'Mar 9, 2026' },
  { id: 9, name: 'Elena Ramos', email: 'elena.ramos@email.com', phone: '+63 924 901 2345', status: 'inactive', joined: 'Mar 12, 2026' },
  { id: 10, name: 'Ramon Villanueva', email: 'ramon.villanueva@email.com', phone: '+63 925 012 3456', status: 'active', joined: 'Mar 15, 2026' },
  { id: 11, name: 'Carmen Pascual', email: 'carmen.pascual@email.com', phone: '+63 926 123 4567', status: 'active', joined: 'Mar 20, 2026' },
  { id: 12, name: 'Antonio Bautista', email: 'antonio.bautista@email.com', phone: '+63 927 234 5678', status: 'active', joined: 'Apr 1, 2026' },
]

export const products = [
  { id: 1, name: 'Premium Wireless Headphones', price: 4500, stock: 82, category: 'Electronics' },
  { id: 2, name: 'Ergonomic Office Chair', price: 12500, stock: 14, category: 'Furniture' },
  { id: 3, name: 'Mechanical Keyboard', price: 3200, stock: 56, category: 'Electronics' },
  { id: 4, name: 'USB-C Hub 7-in-1', price: 1800, stock: 5, category: 'Accessories' },
  { id: 5, name: 'Standing Desk Converter', price: 8900, stock: 20, category: 'Furniture' },
  { id: 6, name: 'Webcam 4K Ultra HD', price: 5600, stock: 3, category: 'Electronics' },
  { id: 7, name: 'Monitor Light Bar', price: 1500, stock: 44, category: 'Accessories' },
  { id: 8, name: 'Noise Cancelling Earbuds', price: 3800, stock: 7, category: 'Electronics' },
  { id: 9, name: 'Desk Organizer Set', price: 950, stock: 67, category: 'Accessories' },
  { id: 10, name: 'Laptop Stand Adjustable', price: 2200, stock: 2, category: 'Accessories' },
]

export const topSellingProducts = [
  { id: 1, name: 'Premium Wireless Headphones', qtySold: 1000, price: 100.00, total: 10000.00 },
  { id: 2, name: 'Ergonomic Office Chair', qtySold: 1000, price: 100.00, total: 10000.00 },
  { id: 3, name: 'Mechanical Keyboard', qtySold: 1000, price: 100.00, total: 10000.00 },
  { id: 4, name: 'USB-C Hub 7-in-1', qtySold: 1000, price: 100.00, total: 10000.00 },
  { id: 5, name: 'Standing Desk Converter', qtySold: 1000, price: 100.00, total: 10000.00 },
]

export const lowStockProducts = [
  { id: 1, name: 'USB-C Hub 7-in-1', stock: 5 },
  { id: 2, name: 'Webcam 4K Ultra HD', stock: 3 },
  { id: 3, name: 'Laptop Stand Adjustable', stock: 2 },
  { id: 4, name: 'Noise Cancelling Earbuds', stock: 7 },
  { id: 5, name: 'Ergonomic Office Chair', stock: 14 },
]

export const orders = Array.from({ length: 100 }, (_, i) => {
  const num = 100 - i
  const statuses = ['paid', 'paid', 'paid', 'paid', 'unpaid', 'partial', 'overdue', 'draft', 'cancelled']
  const paymentTypes = ['Cash', 'Cash', 'Cash', 'Bank Transfer', 'Check']
  const status = statuses[i % statuses.length]
  const paymentType = paymentTypes[i % paymentTypes.length]
  return {
    id: num,
    orderNo: String(num).padStart(7, '0'),
    date: 'Mar 10, 2026',
    customer: '-',
    paymentType,
    total: 15000.00,
    status,
  }
})

export const dailySalesData = [
  20000, 21000, 20500, 22000, 21500, 23000, 24000, 25000, 26000, 27000,
  30000, 45000, 55000, 62000, 68000, 71000, 74000, 76000, 74000, 69000,
  62000, 56000, 72000, 65000, 45000, 30000, 22000, 21000, 20000, 20000, 20500
]

export const categoryData = [
  { name: 'Electronics', value: 68000 },
  { name: 'Furniture', value: 62000 },
  { name: 'Accessories', value: 58000 },
  { name: 'Clothing', value: 48000 },
  { name: 'Sports', value: 45000 },
  { name: 'Beauty', value: 42000 },
  { name: 'Books', value: 38000 },
  { name: 'Toys', value: 35000 },
  { name: 'Food', value: 30000 },
  { name: 'Other', value: 28000 },
]

export const paymentTypeData = [
  { name: 'Cash', value: 55, color: '#22c55e' },
  { name: 'Bank Transfer', value: 30, color: '#2563eb' },
  { name: 'Check', value: 15, color: '#1a2b4a' },
]
