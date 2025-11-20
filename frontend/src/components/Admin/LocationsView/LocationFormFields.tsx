import { Input } from "@/components/Input/Input";
import { Label } from "@/components/UI/Label";
import { FormGrid, FormField, ErrorText } from "./styles";

interface LocationFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface LocationFormFieldsProps {
  formData: LocationFormData;
  formErrors: Record<string, string>;
  onChange: (field: keyof LocationFormData, value: string) => void;
  idPrefix?: string;
}

export const LocationFormFields = ({
  formData,
  formErrors,
  onChange,
  idPrefix = "",
}: LocationFormFieldsProps) => {
  const getId = (field: string) => idPrefix ? `${idPrefix}-${field}` : field;

  return (
    <FormGrid>
      <FormField $fullWidth>
        <Label htmlFor={getId("name")}>Location Name *</Label>
        <Input
          id={getId("name")}
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="e.g., Downtown Office"
        />
        {formErrors.name && <ErrorText>{formErrors.name}</ErrorText>}
      </FormField>

      <FormField $fullWidth>
        <Label htmlFor={getId("address")}>Address *</Label>
        <Input
          id={getId("address")}
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="123 Main Street"
        />
        {formErrors.address && <ErrorText>{formErrors.address}</ErrorText>}
      </FormField>

      <FormField>
        <Label htmlFor={getId("city")}>City *</Label>
        <Input
          id={getId("city")}
          value={formData.city}
          onChange={(e) => onChange("city", e.target.value)}
          placeholder="New York"
        />
        {formErrors.city && <ErrorText>{formErrors.city}</ErrorText>}
      </FormField>

      <FormField>
        <Label htmlFor={getId("state")}>State/Province *</Label>
        <Input
          id={getId("state")}
          value={formData.state}
          onChange={(e) => onChange("state", e.target.value)}
          placeholder="NY"
        />
        {formErrors.state && <ErrorText>{formErrors.state}</ErrorText>}
      </FormField>

      <FormField>
        <Label htmlFor={getId("postalCode")}>Postal Code *</Label>
        <Input
          id={getId("postalCode")}
          value={formData.postalCode}
          onChange={(e) => onChange("postalCode", e.target.value)}
          placeholder="10001"
        />
        {formErrors.postalCode && <ErrorText>{formErrors.postalCode}</ErrorText>}
      </FormField>

      <FormField>
        <Label htmlFor={getId("country")}>Country *</Label>
        <Input
          id={getId("country")}
          value={formData.country}
          onChange={(e) => onChange("country", e.target.value)}
          placeholder="USA"
        />
        {formErrors.country && <ErrorText>{formErrors.country}</ErrorText>}
      </FormField>
    </FormGrid>
  );
};
