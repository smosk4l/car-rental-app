'use client';

import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  ${props =>
    props.variant === 'primary'
      ? `
    background-color: #3182ce;
    color: white;
    
    &:hover {
      background-color: #2c5aa0;
    }
    
    &:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }
  `
      : `
    background-color: #e2e8f0;
    color: #2d3748;
    
    &:hover {
      background-color: #cbd5e0;
    }
  `}
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-weight: 500;

  ${props =>
    props.type === 'success'
      ? `
    background-color: #f0fff4;
    color: #22543d;
    border: 1px solid #c6f6d5;
  `
      : `
    background-color: #fed7d7;
    color: #742a2a;
    border: 1px solid #feb2b2;
  `}
`;

interface CarFormData {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  pricePerDay: number;
  category: string;
  description: string;
  imageUrl: string;
  transmission: string;
  fuelType: string;
  seats: number;
}

const initialFormData: CarFormData = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  color: '',
  licensePlate: '',
  pricePerDay: 0,
  category: 'ECONOMY',
  description: '',
  imageUrl: '',
  transmission: 'MANUAL',
  fuelType: 'GASOLINE',
  seats: 5,
};

export default function AddCarPage() {
  const [formData, setFormData] = useState<CarFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Car added successfully!' });
        setFormData(initialFormData);
      } else {
        const errorData = await response.json();
        setMessage({
          type: 'error',
          text: errorData.error || 'Failed to add car. Please try again.',
        });
      }
    } catch {
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setMessage(null);
  };

  return (
    <Container>
      <Title>Add New Car</Title>

      {message && <Message type={message.type}>{message.text}</Message>}

      <Form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="make">Make *</Label>
            <Input
              type="text"
              id="make"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="model">Model *</Label>
            <Input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="year">Year *</Label>
            <Input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              min="1900"
              max={new Date().getFullYear() + 1}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="color">Color *</Label>
            <Input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="licensePlate">License Plate *</Label>
            <Input
              type="text"
              id="licensePlate"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="pricePerDay">Price Per Day ($) *</Label>
            <Input
              type="number"
              id="pricePerDay"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">Category *</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="ECONOMY">Economy</option>
              <option value="COMPACT">Compact</option>
              <option value="MIDSIZE">Midsize</option>
              <option value="FULLSIZE">Fullsize</option>
              <option value="PREMIUM">Premium</option>
              <option value="LUXURY">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="VAN">Van</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="transmission">Transmission *</Label>
            <Select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              required
            >
              <option value="MANUAL">Manual</option>
              <option value="AUTOMATIC">Automatic</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="fuelType">Fuel Type *</Label>
            <Select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              required
            >
              <option value="GASOLINE">Gasoline</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Electric</option>
              <option value="HYBRID">Hybrid</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="seats">Number of Seats</Label>
            <Input
              type="number"
              id="seats"
              name="seats"
              value={formData.seats}
              onChange={handleInputChange}
              min="1"
              max="15"
            />
          </FormGroup>

          <FormGroup className="full-width">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/car-image.jpg"
            />
          </FormGroup>

          <FormGroup className="full-width">
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter a description of the car..."
            />
          </FormGroup>
        </FormGrid>

        <ButtonGroup>
          <Button type="button" onClick={handleReset} disabled={loading}>
            Reset
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Adding Car...' : 'Add Car'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}
