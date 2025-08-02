import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CarDetailsModal from '@/components/Admin/CarDetails/CarDetails';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useCars, useDeleteCar } from '@/hooks/useCars';
import type { Car } from '@/lib/api/cars';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import { Button } from '@/components/Button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Dropdown/Dropdown';
import { Search, MoreHorizontal, Edit, Trash2, Eye, Car as CarIcon, Loader2, AlertCircle } from 'lucide-react';
import {
  Container,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  SearchSection,
  SearchContainer,
  SearchIcon,
  SearchInput,
  TableContainer,
  CarInfo,
  Avatar,
  AvatarImage,
  AvatarFallback,
  CarDetails,
  CarName,
  CarMeta,
  MonoCell,
  PriceCell,
  ActionsCell,
  Badge,
  ActionButton,
  LoadingContainer,
  ErrorContainer,
  EmptyState,
} from './styles';

const CarsView = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch cars using React Query
  const { data, isLoading, error } = useCars();
  const deleteCarMutation = useDeleteCar();

  // Filter cars based on search term
  const filteredCars = data?.cars.filter(
    car =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getAvailabilityBadge = (isAvailable: boolean) => {
    return (
      <Badge variant={isAvailable ? 'success' : 'danger'}>
        {isAvailable ? 'Available' : 'Rented'}
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryVariants: Record<string, 'default' | 'secondary' | 'outline'> = {
      ECONOMY: 'outline',
      COMPACT: 'outline',
      MIDSIZE: 'default',
      FULLSIZE: 'default',
      PREMIUM: 'secondary',
      LUXURY: 'secondary',
      SUV: 'default',
      VAN: 'outline',
    };

    return (
      <Badge variant={categoryVariants[category] || 'outline'}>
        {category.charAt(0) + category.slice(1).toLowerCase()}
      </Badge>
    );
  };

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteCar = (carId: string) => {
    deleteCarMutation.mutate(carId);
    setIsDetailsModalOpen(false);
  };

  const handleDeleteFromDropdown = (car: Car) => {
    setCarToDelete(car);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (carToDelete) {
      deleteCarMutation.mutate(carToDelete.id);
      setCarToDelete(null);
    }
  };

  const handleEditCar = (carId: string) => {
    router.push(`/admin/cars/edit/${carId}`);
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Loader2 className="animate-spin" size={48} />
          <p>Loading cars...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <AlertCircle size={48} />
          <h3>Error loading cars</h3>
          <p>Please try again later</p>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Cars</Title>
          <Subtitle>Manage your car rental fleet</Subtitle>
        </HeaderContent>
        <Button onClick={() => router.push('/admin/cars/add')}>
          <CarIcon style={{ marginRight: '8px', width: '16px', height: '16px' }} />
          Add Car
        </Button>
      </Header>

      <SearchSection>
        <SearchContainer>
          <SearchIcon>
            <Search />
          </SearchIcon>
          <SearchInput
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </SearchSection>

      {filteredCars.length === 0 ? (
        <EmptyState>
          <CarIcon size={48} />
          <h3>No cars found</h3>
          <p>{searchTerm ? 'Try adjusting your search terms' : 'Add your first car to get started'}</p>
        </EmptyState>
      ) : (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Car</TableHead>
                <TableHead>License Plate</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price/Day</TableHead>
                <TableHead>Transmission</TableHead>
                <TableHead>Fuel Type</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Status</TableHead>
                <ActionsCell as="th">Actions</ActionsCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars.map(car => (
                <TableRow key={car.id}>
                  <TableCell>
                    <CarInfo>
                      <Avatar>
                        {car.imageUrl ? (
                          <AvatarImage
                            src={car.imageUrl}
                            alt={`${car.make} ${car.model}`}
                          />
                        ) : (
                          <AvatarFallback>
                            <CarIcon size={16} />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <CarDetails>
                        <CarName>
                          {car.make} {car.model}
                        </CarName>
                        <CarMeta>
                          {car.year} • {car.color}
                        </CarMeta>
                      </CarDetails>
                    </CarInfo>
                  </TableCell>
                  <MonoCell>{car.licensePlate}</MonoCell>
                  <TableCell>{getCategoryBadge(car.category)}</TableCell>
                  <PriceCell>${car.pricePerDay}</PriceCell>
                  <TableCell>{car.transmission}</TableCell>
                  <TableCell>{car.fuelType}</TableCell>
                  <TableCell>{car.seats}</TableCell>
                  <TableCell>{getAvailabilityBadge(car.isAvailable)}</TableCell>
                  <ActionsCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <ActionButton>
                          <MoreHorizontal size={16} />
                        </ActionButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="right">
                        <DropdownMenuItem onSelect={() => handleViewDetails(car)}>
                          <Eye style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleEditCar(car.id)}>
                          <Edit style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                          Edit Car
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="danger" onSelect={() => handleDeleteFromDropdown(car)}>
                          <Trash2 style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                          Delete Car
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ActionsCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CarDetailsModal
        car={selectedCar}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        onDeleteCar={handleDeleteCar}
      />

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete Car"
        description={carToDelete ? `Are you sure you want to delete ${carToDelete.make} ${carToDelete.model}? This action cannot be undone.` : ''}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default CarsView;