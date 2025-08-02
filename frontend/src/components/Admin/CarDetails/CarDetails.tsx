import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogHeader,
} from '@/components/Dialog/Dialog';
import { Button } from '@/components/Button/Button';
import { Separator } from '@/components/Separator/Separator';
import ConfirmDialog from '@/components/ConfirmDialog';
import {
  Car,
  Calendar,
  Palette,
  CreditCard,
  Settings,
  Fuel,
  Users,
  FileText,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  StyledDialogContent,
  StyledDialogTitle,
  Container,
  ImageContainer,
  CarImage,
  BadgeContainer,
  InfoGrid,
  InfoColumn,
  InfoItem,
  IconWrapper,
  InfoContent,
  InfoLabel,
  InfoValue,
  DescriptionSection,
  DescriptionTitle,
  DescriptionText,
  ActionButtons,
  Badge,
} from './styles';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  pricePerDay: number;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  isAvailable: boolean;
  imageUrl?: string;
  description?: string;
}

interface CarDetailsModalProps {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteCar?: (carId: string) => void;
}

const CarDetailsModal = ({ car, open, onOpenChange, onDeleteCar }: CarDetailsModalProps) => {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  if (!car) return null;

  const getAvailabilityBadge = (isAvailable: boolean) => {
    return (
      <Badge variant={isAvailable ? 'success' : 'danger'}>
        {isAvailable ? 'Available' : 'Currently Rented'}
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryVariants: Record<string, 'default' | 'secondary' | 'outline'> = {
      Sedan: 'default',
      SUV: 'secondary',
      Compact: 'outline',
      Electric: 'default',
      Sports: 'secondary',
    };

    return (
      <Badge variant={categoryVariants[category] || 'outline'}>{category}</Badge>
    );
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (onDeleteCar) {
      onDeleteCar(car.id);
      onOpenChange(false);
    }
  };

  const handleEdit = () => {
    router.push(`/admin/cars/edit/${car.id}`);
    onOpenChange(false);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <StyledDialogContent>
        <DialogHeader>
          <StyledDialogTitle>
            <Car size={20} />
            {car.make} {car.model} ({car.year})
          </StyledDialogTitle>
        </DialogHeader>

        <Container>
          {/* Car Image */}
          {car.imageUrl && (
            <ImageContainer>
              <CarImage
                src={car.imageUrl}
                alt={`${car.make} ${car.model}`}
              />
            </ImageContainer>
          )}

          {/* Status and Category */}
          <BadgeContainer>
            {getAvailabilityBadge(car.isAvailable)}
            {getCategoryBadge(car.category)}
          </BadgeContainer>

          {/* Basic Information */}
          <InfoGrid>
            <InfoColumn>
              <InfoItem>
                <IconWrapper>
                  <Car size={16} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Make & Model</InfoLabel>
                  <InfoValue>
                    {car.make} {car.model}
                  </InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <Calendar size={16} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Year</InfoLabel>
                  <InfoValue>{car.year}</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <Palette size={16} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Color</InfoLabel>
                  <InfoValue>{car.color}</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <FileText size={16} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>License Plate</InfoLabel>
                  <InfoValue variant="mono">{car.licensePlate}</InfoValue>
                </InfoContent>
              </InfoItem>
            </InfoColumn>

            <InfoColumn>
              <InfoItem>
                <IconWrapper>
                  <CreditCard size={16} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Price per Day</InfoLabel>
                  <InfoValue variant="semibold">${car.pricePerDay}</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <Settings size={16} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Transmission</InfoLabel>
                  <InfoValue>{car.transmission}</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <Fuel size={16} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Fuel Type</InfoLabel>
                  <InfoValue>{car.fuelType}</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <Users size={16} />
                </IconWrapper>
                <InfoContent>
                  <InfoLabel>Seats</InfoLabel>
                  <InfoValue>{car.seats} passengers</InfoValue>
                </InfoContent>
              </InfoItem>
            </InfoColumn>
          </InfoGrid>

          {/* Description */}
          {car.description && (
            <>
              <Separator />
              <DescriptionSection>
                <DescriptionTitle>Description</DescriptionTitle>
                <DescriptionText>{car.description}</DescriptionText>
              </DescriptionSection>
            </>
          )}

          {/* Action Buttons */}
          <Separator />
          <ActionButtons>
            <Button variant="secondary" size="sm" onClick={handleEdit}>
              <Edit style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Edit Car
            </Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              <Trash2 style={{ marginRight: '8px', width: '16px', height: '16px' }} />
              Delete Car
            </Button>
          </ActionButtons>
        </Container>
      </StyledDialogContent>
    </Dialog>

    <ConfirmDialog
      open={showDeleteConfirm}
      onOpenChange={setShowDeleteConfirm}
      title="Delete Car"
      description={`Are you sure you want to delete ${car.make} ${car.model}? This action cannot be undone.`}
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
      onConfirm={handleConfirmDelete}
    />
    </>
  );
};

export default CarDetailsModal;