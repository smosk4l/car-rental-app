import { useState } from "react";
import { Button } from "@/components/Button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table/Table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/Dialog/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Dropdown/Dropdown";
import ConfirmDialog from "@/components/ConfirmDialog";
import { MapPin, MoreHorizontal, Plus, Search, Edit, Trash2, Loader2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { useLocations } from "@/hooks/useLocations";
import type { Location } from "@/lib/api/locations";
import { LocationFormFields } from "./LocationFormFields";
import {
  Container,
  Header,
  HeaderContent,
  Title,
  Subtitle,
  SearchContainer,
  SearchIconWrapper,
  SearchInput,
  TableContainer,
  LocationName,
  IconWrapper,
  ActionButton,
  LoadingContainer,
  ErrorContainer,
  EmptyState,
} from "./styles";

const locationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  address: z.string().trim().min(1, "Address is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State/Province is required").max(100),
  postalCode: z.string().trim().min(1, "Postal code is required").max(20),
  country: z.string().trim().min(1, "Country is required").max(100),
});

const LocationsView = () => {
  // React Query hook with all CRUD operations
  const { locations, createLocation, updateLocation, deleteLocation } = useLocations();

  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Get locations data from React Query
  const locationsData = locations.data?.locations || [];

  const filteredLocations = locationsData.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    try {
      locationSchema.parse(formData);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
    setFormErrors({});
  };

  const openAddDialog = () => {
    resetForm();
    setAddDialogOpen(true);
  };

  const openEditDialog = (location: Location) => {
    setSelectedLocation(location);
    setFormData({
      name: location.name,
      address: location.address,
      city: location.city,
      state: location.state,
      postalCode: location.postalCode,
      country: location.country,
    });
    setFormErrors({});
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (location: Location) => {
    setSelectedLocation(location);
    setDeleteDialogOpen(true);
  };

  const handleAddLocation = () => {
    if (!validateForm()) return;

    createLocation.mutate(formData, {
      onSuccess: () => {
        setAddDialogOpen(false);
        resetForm();
      },
    });
  };

  const handleEditLocation = () => {
    if (!validateForm() || !selectedLocation) return;

    updateLocation.mutate(
      { id: selectedLocation.id, data: formData },
      {
        onSuccess: () => {
          setEditDialogOpen(false);
          resetForm();
          setSelectedLocation(null);
        },
      }
    );
  };

  const handleDeleteLocation = () => {
    if (!selectedLocation) return;

    deleteLocation.mutate(selectedLocation.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setSelectedLocation(null);
      },
    });
  };

  const handleFormFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Loading state
  if (locations.isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Loader2 className="animate-spin" size={48} />
          <p>Loading locations...</p>
        </LoadingContainer>
      </Container>
    );
  }

  // Error state
  if (locations.error) {
    return (
      <Container>
        <ErrorContainer>
          <AlertCircle size={48} />
          <h3>Error loading locations</h3>
          <p>Please try again later</p>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Locations</Title>
          <Subtitle>Manage pickup and return locations</Subtitle>
        </HeaderContent>
        <Button onClick={openAddDialog}>
          <Plus style={{ marginRight: '8px' }} />
          Add Location
        </Button>
      </Header>

      <SearchContainer>
        <SearchIconWrapper>
          <Search />
        </SearchIconWrapper>
        <SearchInput
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <TableContainer>
        {filteredLocations.length === 0 ? (
          <EmptyState>
            <MapPin size={48} style={{ margin: '0 auto 16px' }} />
            <p>No locations found{searchTerm && ` matching "${searchTerm}"`}.</p>
          </EmptyState>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Postal Code</TableHead>
                <TableHead>Country</TableHead>
                <TableHead style={{ textAlign: 'right' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.map((location) => (
              <TableRow key={location.id}>
                <TableCell>
                  <LocationName>
                    <IconWrapper>
                      <MapPin />
                    </IconWrapper>
                    {location.name}
                  </LocationName>
                </TableCell>
                <TableCell>{location.address}</TableCell>
                <TableCell>{location.city}</TableCell>
                <TableCell>{location.state}</TableCell>
                <TableCell>{location.postalCode}</TableCell>
                <TableCell>{location.country}</TableCell>
                <TableCell style={{ textAlign: 'right' }}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <ActionButton variant="ghost" size="icon">
                        <MoreHorizontal />
                      </ActionButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="right">
                      <DropdownMenuItem onSelect={() => openEditDialog(location)}>
                        <Edit
                          style={{
                            marginRight: '8px',
                            width: '16px',
                            height: '16px',
                          }}
                        />
                        Edit Location
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => openDeleteDialog(location)} variant="danger">
                        <Trash2
                          style={{
                            marginRight: '8px',
                            width: '16px',
                            height: '16px',
                          }}
                        />
                        Delete Location
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Add Location Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Add a new pickup and return location for car rentals
            </DialogDescription>
          </DialogHeader>
          <LocationFormFields
            formData={formData}
            formErrors={formErrors}
            onChange={handleFormFieldChange}
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLocation}>Add Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Location Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Update location details
            </DialogDescription>
          </DialogHeader>
          <LocationFormFields
            formData={formData}
            formErrors={formErrors}
            onChange={handleFormFieldChange}
            idPrefix="edit"
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditLocation}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Location"
        description={`Are you sure you want to delete "${selectedLocation?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteLocation}
      />
    </Container>
  );
};

export default LocationsView;
