'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Label } from "@/components/UI/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card";
import { Calendar } from "@/components/UI/Calendar/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/Popover/Popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/Select";
import { Separator } from "@/components/UI/Separator";
import { Badge } from "@/components/UI/Badge";
import { CalendarIcon, MapPin, Clock, Users, Fuel, Settings, ArrowLeft, Check, Loader2, AlertCircle } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { toast } from "@/hooks/useToast";
import { useCar } from "@/hooks/useCars";
import {
  PageContainer,
  Header,
  HeaderContainer,
  Logo,
  MainContainer,
  HeaderSection,
  Title,
  Subtitle,
  GridContainer,
  MainColumn,
  SidebarColumn,
  VehicleSummaryContent,
  VehicleImage,
  VehicleInfo,
  VehicleName,
  VehicleFeatures,
  FeatureItem,
  RentalDetailsContent,
  DetailsSection,
  SectionHeader,
  FormGrid,
  FormField,
  FullWidthField,
  TimeInputWrapper,
  StickyCard,
  SummaryContent,
  SummaryDetails,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  TotalRow,
  TotalLabel,
  TotalAmount,
  ConfirmationBox,
  ConfirmationItem,
  ConfirmationLabel,
  ConfirmationText,
  DisclaimerText,
  ErrorContainer,
  ErrorCard,
} from "./style";

const locations = [
  "Downtown Office - 123 Main St",
  "Airport Terminal - Gate 5",
  "North Station - 456 Oak Ave",
  "South Mall - 789 Elm St",
  "West Hub - 321 Pine Rd",
];

const Booking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams?.get("carId");

  // Fetch car data from API
  const { data: selectedCar, isLoading, error } = useCar(carId || "");

  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [returnTime, setReturnTime] = useState("09:00");

  // Loading state
  if (isLoading) {
    return (
      <PageContainer>
        <Header>
          <HeaderContainer>
            <Logo as={Link} href="/">
              RentWheels
            </Logo>
            <Button variant="secondary" onClick={() => router.push("/fleet")}>
              <ArrowLeft style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
              Back to Fleet
            </Button>
          </HeaderContainer>
        </Header>
        <ErrorContainer>
          <ErrorCard>
            <Card>
              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '3rem' }}>
                <Loader2 style={{ animation: 'spin 1s linear infinite', color: '#f76b07', width: '3rem', height: '3rem' }} />
                <CardDescription>Loading vehicle details...</CardDescription>
              </CardContent>
            </Card>
          </ErrorCard>
        </ErrorContainer>
      </PageContainer>
    );
  }

  // Error or not found state
  if (error || !selectedCar) {
    return (
      <PageContainer>
        <Header>
          <HeaderContainer>
            <Logo as={Link} href="/">
              RentWheels
            </Logo>
            <Button variant="secondary" onClick={() => router.push("/fleet")}>
              <ArrowLeft style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
              Back to Fleet
            </Button>
          </HeaderContainer>
        </Header>
        <ErrorContainer>
          <ErrorCard>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle style={{ color: '#dc3545' }} />
                  <CardTitle>Vehicle Not Found</CardTitle>
                </div>
                <CardDescription>
                  {error instanceof Error ? error.message : 'The selected vehicle could not be found.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push("/fleet")} fullWidth>
                  <ArrowLeft style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                  Back to Fleet
                </Button>
              </CardContent>
            </Card>
          </ErrorCard>
        </ErrorContainer>
      </PageContainer>
    );
  }

  const calculateTotal = () => {
    if (!pickupDate || !returnDate) return 0;
    const days = Math.max(1, differenceInDays(returnDate, pickupDate));
    return days * selectedCar.pricePerDay;
  };

  const handleBooking = () => {
    if (!pickupDate || !returnDate || !pickupLocation || !returnLocation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all booking details.",
        variant: "destructive",
      });
      return;
    }

    // Generate booking ID
    const bookingId = `BK${Date.now().toString().slice(-8)}`;

    // Navigate to confirmation page with booking details
    router.push(`/booking/confirmation?bookingId=${bookingId}`);
  };

  const days = pickupDate && returnDate ? Math.max(1, differenceInDays(returnDate, pickupDate)) : 0;

  return (
    <PageContainer>
      {/* Header */}
      <Header>
        <HeaderContainer>
          <Logo as={Link} href="/">
            RentWheels
          </Logo>
          <Button variant="secondary" onClick={() => router.push("/fleet")}>
            <ArrowLeft style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
            Back to Fleet
          </Button>
        </HeaderContainer>
      </Header>

      <MainContainer>
        <HeaderSection>
          <Title>Complete Your Booking</Title>
          <Subtitle>Review your selection and choose your rental details</Subtitle>
        </HeaderSection>

        <GridContainer>
          {/* Main Booking Form */}
          <MainColumn>
            {/* Vehicle Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Selected Vehicle</CardTitle>
              </CardHeader>
              <CardContent>
                <VehicleSummaryContent>
                  <VehicleImage
                    src={selectedCar.imageUrl}
                    alt={`${selectedCar.make} ${selectedCar.model}`}
                  />
                  <VehicleInfo>
                    <VehicleName>
                      {selectedCar.year} {selectedCar.make} {selectedCar.model}
                    </VehicleName>
                    <Badge variant="secondary" style={{ marginTop: '0.5rem' }}>{selectedCar.category}</Badge>
                    <VehicleFeatures>
                      <FeatureItem>
                        <Users />
                        <span>{selectedCar.seats} Seats</span>
                      </FeatureItem>
                      <FeatureItem>
                        <Settings />
                        <span>{selectedCar.transmission}</span>
                      </FeatureItem>
                      <FeatureItem>
                        <Fuel />
                        <span>{selectedCar.fuelType}</span>
                      </FeatureItem>
                    </VehicleFeatures>
                  </VehicleInfo>
                </VehicleSummaryContent>
              </CardContent>
            </Card>

            {/* Rental Details */}
            <Card>
              <CardHeader>
                <CardTitle>Rental Details</CardTitle>
                <CardDescription>Select your pickup and return information</CardDescription>
              </CardHeader>
              <CardContent>
                <RentalDetailsContent>
                  {/* Pickup Details */}
                  <DetailsSection>
                    <SectionHeader>
                      <MapPin />
                      <span>Pickup Details</span>
                    </SectionHeader>

                    <FormGrid>
                      <FormField>
                        <Label htmlFor="pickup-location">Location</Label>
                        <Select value={pickupLocation} onValueChange={setPickupLocation}>
                          <SelectTrigger id="pickup-location">
                            <SelectValue placeholder="Select pickup location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField>
                        <Label htmlFor="pickup-date">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="pickup-date"
                              variant="outline"
                              fullWidth
                              style={{
                                height: '2.5rem',
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                                fontWeight: 'normal',
                                color: !pickupDate ? '#6c757d' : undefined
                              }}
                            >
                              <CalendarIcon style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                              {pickupDate ? format(pickupDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent style={{ width: 'auto', padding: 0 }}>
                            <Calendar
                              mode="single"
                              selected={pickupDate}
                              onSelect={setPickupDate}
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormField>

                      <FullWidthField>
                        <Label htmlFor="pickup-time">Time</Label>
                        <TimeInputWrapper>
                          <Clock />
                          <Input
                            id="pickup-time"
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                          />
                        </TimeInputWrapper>
                      </FullWidthField>
                    </FormGrid>
                  </DetailsSection>

                  <Separator />

                  {/* Return Details */}
                  <DetailsSection>
                    <SectionHeader>
                      <MapPin />
                      <span>Return Details</span>
                    </SectionHeader>

                    <FormGrid>
                      <FormField>
                        <Label htmlFor="return-location">Location</Label>
                        <Select value={returnLocation} onValueChange={setReturnLocation}>
                          <SelectTrigger id="return-location">
                            <SelectValue placeholder="Select return location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField>
                        <Label htmlFor="return-date">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="return-date"
                              variant="outline"
                              fullWidth
                              style={{
                                height: '2.5rem',
                                justifyContent: 'flex-start',
                                textAlign: 'left',
                                fontWeight: 'normal',
                                color: !returnDate ? '#6c757d' : undefined
                              }}
                            >
                              <CalendarIcon style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
                              {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent style={{ width: 'auto', padding: 0 }}>
                            <Calendar
                              mode="single"
                              selected={returnDate}
                              onSelect={setReturnDate}
                              disabled={(date) => date < (pickupDate || new Date())}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormField>

                      <FullWidthField>
                        <Label htmlFor="return-time">Time</Label>
                        <TimeInputWrapper>
                          <Clock />
                          <Input
                            id="return-time"
                            type="time"
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                          />
                        </TimeInputWrapper>
                      </FullWidthField>
                    </FormGrid>
                  </DetailsSection>
                </RentalDetailsContent>
              </CardContent>
            </Card>
          </MainColumn>

          {/* Booking Summary Sidebar */}
          <SidebarColumn>
            <StickyCard>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <SummaryContent>
                    <SummaryDetails>
                      <SummaryRow>
                        <SummaryLabel>Daily Rate</SummaryLabel>
                        <SummaryValue>${selectedCar.pricePerDay}/day</SummaryValue>
                      </SummaryRow>

                      {days > 0 && (
                        <SummaryRow>
                          <SummaryLabel>Rental Duration</SummaryLabel>
                          <SummaryValue>{days} {days === 1 ? "day" : "days"}</SummaryValue>
                        </SummaryRow>
                      )}

                      <Separator />

                      <TotalRow>
                        <TotalLabel>Total</TotalLabel>
                        <TotalAmount>
                          ${calculateTotal()}
                        </TotalAmount>
                      </TotalRow>
                    </SummaryDetails>

                    {pickupDate && returnDate && pickupLocation && returnLocation && (
                      <ConfirmationBox>
                        <ConfirmationItem>
                          <Check />
                          <div>
                            <ConfirmationLabel>Pickup</ConfirmationLabel>
                            <ConfirmationText>
                              {format(pickupDate, "PPP")} at {pickupTime}
                            </ConfirmationText>
                          </div>
                        </ConfirmationItem>
                        <ConfirmationItem>
                          <Check />
                          <div>
                            <ConfirmationLabel>Return</ConfirmationLabel>
                            <ConfirmationText>
                              {format(returnDate, "PPP")} at {returnTime}
                            </ConfirmationText>
                          </div>
                        </ConfirmationItem>
                      </ConfirmationBox>
                    )}

                    <Button
                      onClick={handleBooking}
                      fullWidth
                      size="lg"
                      disabled={!pickupDate || !returnDate || !pickupLocation || !returnLocation}
                    >
                      Confirm Booking
                    </Button>

                    <DisclaimerText>
                      Free cancellation up to 24 hours before pickup
                    </DisclaimerText>
                  </SummaryContent>
                </CardContent>
              </Card>
            </StickyCard>
          </SidebarColumn>
        </GridContainer>
      </MainContainer>
    </PageContainer>
  );
};

export default Booking;
