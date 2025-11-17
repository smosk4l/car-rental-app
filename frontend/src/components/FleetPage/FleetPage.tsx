'use client';

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";
import { Search, Users, Fuel, Settings, Star, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useCars } from "@/hooks/useCars";
import {
  Container,
  Section,
  Header,
  Text,
  Heading,
  HeroContent,
  InputWrapper,
  Flex,
  Grid,
  Card,
  ImageBox,
  Badge,
  PageWrapper,
  CardBody,
  Description,
  SpecsGrid,
  FeaturesRow,
  PriceSection,
  Icon,
} from "@/app/fleet/styles";

export const FleetPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price-asc");

  // Fetch cars from API using React Query
  const { data, isLoading, error } = useCars({ limit: 100 });

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    if (!data?.cars) return [];

    let vehicles = data.cars.filter(
      (vehicle) =>
        (vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (categoryFilter === "all" || vehicle.category === categoryFilter)
    );

    // Sort vehicles
    vehicles = [...vehicles].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.pricePerDay - b.pricePerDay;
        case "price-desc":
          return b.pricePerDay - a.pricePerDay;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return vehicles;
  }, [data?.cars, searchTerm, categoryFilter, sortBy]);

  const categories = ["all", "SEDAN", "SUV", "COMPACT", "ELECTRIC", "SPORTS"];

  return (
    <PageWrapper>
      {/* Header */}
      <Header>
        <Container>
          <Button variant="secondary" size="sm" onClick={() => router.push('/')}>
            <Flex $direction="row" $gap="0.5rem" $align="center">
              <Icon>
                <ArrowLeft />
              </Icon>
              Back to Home
            </Flex>
          </Button>
          <Button onClick={() => router.push('/auth/login')}>Sign In</Button>
        </Container>
      </Header>

      {/* Hero Section */}
      <Section $gradient>
        <Container>
          <HeroContent>
            <Heading $level={1}>Explore Our Fleet</Heading>
            <Text $size="lg" $color="#6c757d">
              Find the perfect vehicle for your journey from our wide selection
            </Text>
          </HeroContent>

          {/* Search and Filters */}
          <Container $padding="0">
            <InputWrapper $hasIcon>
              <Search />
              <input
                type="text"
                placeholder="Search by make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputWrapper>

            <Container $padding="1rem 0 0">
              <Flex $gap="1rem" $responsive>
                <InputWrapper>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </InputWrapper>

                <InputWrapper>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </InputWrapper>
              </Flex>
            </Container>
          </Container>
        </Container>
      </Section>

      {/* Vehicles Grid */}
      <Section>
        <Container>
          {/* Loading State */}
          {isLoading && (
            <Container $padding="3rem 0">
              <Flex $direction="column" $gap="1rem" $align="center" $justify="center">
                <Icon $color="#f76b07">
                  <Loader2 className="animate-spin" size={48} />
                </Icon>
                <Text $size="lg" $align="center">Loading vehicles...</Text>
              </Flex>
            </Container>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Container $padding="3rem 0">
              <Flex $direction="column" $gap="1rem" $align="center" $justify="center">
                <Icon $color="#dc3545">
                  <AlertCircle size={48} />
                </Icon>
                <Text $size="lg" $align="center" $color="#dc3545">
                  Failed to load vehicles
                </Text>
                <Text $size="md" $align="center" $color="#6c757d">
                  {error instanceof Error ? error.message : 'Please try again later'}
                </Text>
              </Flex>
            </Container>
          )}

          {/* Success State with Data */}
          {!isLoading && !error && (
            <>
              <Container $padding="0 0 1.5rem 0">
                <Text $size="md">
                  Showing {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? "s" : ""}
                </Text>
              </Container>

              {filteredVehicles.length === 0 ? (
                <Container $padding="3rem 0">
                  <Text $size="lg" $align="center">
                    No vehicles found matching your criteria
                  </Text>
                </Container>
              ) : (
                <Grid $cols={3}>
                  {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <ImageBox>
                    <img
                      src={vehicle.imageUrl}
                      alt={`${vehicle.make} ${vehicle.model}`}
                    />
                    <Badge $position="absolute">{vehicle.category}</Badge>
                  </ImageBox>
                  
                  <CardBody>
                    <Flex $justify="space-between" $align="flex-start" $direction="row" $gap="0.5rem">
                      <Flex $direction="column" $gap="0.25rem">
                        <Heading $level={3} $mb="0">
                          {vehicle.make} {vehicle.model}
                        </Heading>
                        <Text $size="sm">{vehicle.year} • {vehicle.color}</Text>
                      </Flex>
                      <Flex $direction="row" $gap="0.25rem" $align="center">
                        <Icon $color="#f76b07" $fill>
                          <Star />
                        </Icon>
                        <Text $weight="medium" $color="#212529">{vehicle.rating}</Text>
                      </Flex>
                    </Flex>
                    
                    <Description $size="sm">
                      {vehicle.description}
                    </Description>
                    
                    <SpecsGrid $cols={3}>
                      <Flex $direction="row" $gap="0.25rem" $align="center">
                        <Icon>
                          <Users />
                        </Icon>
                        <span>{vehicle.seats}</span>
                      </Flex>
                      <Flex $direction="row" $gap="0.25rem" $align="center">
                        <Icon>
                          <Fuel />
                        </Icon>
                        <span>{vehicle.fuelType}</span>
                      </Flex>
                      <Flex $direction="row" $gap="0.25rem" $align="center">
                        <Icon>
                          <Settings />
                        </Icon>
                        <span>{vehicle.transmission}</span>
                      </Flex>
                    </SpecsGrid>

                    <FeaturesRow $direction="row" $wrap $gap="0.25rem">
                      {vehicle.features && vehicle.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} $variant="secondary">{feature}</Badge>
                      ))}
                    </FeaturesRow>

                    <Flex $direction="row" $justify="space-between" $align="center">
                      <PriceSection>
                        <Heading $level={2} $mb="0">${vehicle.pricePerDay}</Heading>
                        <Text $size="sm">per day</Text>
                      </PriceSection>
                      <Button onClick={() => router.push(`/booking?carId=${vehicle.id}`)}>Reserve Now</Button>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </Grid>
              )}
            </>
          )}
        </Container>
      </Section>
    </PageWrapper>
  );
};
