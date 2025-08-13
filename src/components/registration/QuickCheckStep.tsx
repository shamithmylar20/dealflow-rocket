import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/form/FormField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

interface QuickCheckStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const QuickCheckStep = ({ formData, setFormData }: QuickCheckStepProps) => {
  const [companyName, setCompanyName] = useState(formData.companyName || "");
  const [domain, setDomain] = useState(formData.domain || "");
  const [isChecking, setIsChecking] = useState(false);
  const [duplicateResults, setDuplicateResults] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Simulate duplicate checking
  useEffect(() => {
    if (companyName.length > 2 || domain.length > 3) {
      setIsChecking(true);
      const timer = setTimeout(() => {
        // Simulate API call for duplicate detection
        const mockDuplicates = companyName.toLowerCase().includes("acme") ? [
          {
            id: "deal-123",
            companyName: "ACME Corp",
            domain: "acme.com",
            value: "$150,000",
            status: "Under Review",
            partner: "TechFlow Solutions",
            submittedDate: "2024-01-15"
          }
        ] : [];
        
        setDuplicateResults(mockDuplicates);
        setIsChecking(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setDuplicateResults([]);
    }
  }, [companyName, domain]);

  // Validation
  useEffect(() => {
    const errors: Record<string, string> = {};
    
    if (companyName && companyName.length < 2) {
      errors.companyName = "Company name must be at least 2 characters";
    }
    
    if (domain && !domain.match(/^[a-z0-9.-]+\.[a-z]{2,}$/)) {
      errors.domain = "Enter a valid domain like example.com";
    }

    setValidationErrors(errors);
  }, [companyName, domain]);

  // Update form data
  useEffect(() => {
    setFormData({
      ...formData,
      companyName,
      domain,
      duplicateResults
    });
  }, [companyName, domain, duplicateResults, formData, setFormData]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Let's start with some basic information
        </h3>
        <p className="text-muted-foreground">
          We'll check for any existing deals to prevent channel conflicts
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Customer Company Name */}
        <FormField
          label="Customer Company Name"
          required
          error={validationErrors.companyName}
          tooltip="The end client's public-facing name. Used for duplicate checks."
          helpText="This will be used to check for duplicate registrations"
        >
          <div className="relative">
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g., ACME Corporation"
              className="pr-10"
            />
            {isChecking && (
              <Loader2 className="absolute right-3 top-3 w-4 h-4 animate-spin text-muted-foreground" />
            )}
            {!isChecking && companyName.length > 2 && duplicateResults.length === 0 && (
              <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-success" />
            )}
          </div>
        </FormField>

        {/* Customer Domain */}
        <FormField
          label="Customer Domain"
          required
          error={validationErrors.domain}
          tooltip="Client's primary domain (e.g., example.com) for CRM match & dedupe."
          helpText="Used for duplicate detection and company verification"
        >
          <div className="relative">
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g., acme.com"
              className="pr-10"
            />
            {!validationErrors.domain && domain.length > 3 && (
              <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-success" />
            )}
          </div>
        </FormField>
      </div>

      {/* Duplicate Detection Results */}
      {duplicateResults.length > 0 && (
        <Alert className="border-warning/20 bg-warning/5">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription>
            <div className="space-y-3">
              <div className="font-medium text-warning">
                Potential duplicate deals found
              </div>
              <div className="text-sm text-foreground">
                We found {duplicateResults.length} existing deal(s) that may conflict with this registration:
              </div>
              
              {duplicateResults.map((deal) => (
                <div key={deal.id} className="bg-background border border-warning/20 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Company:</span> {deal.companyName}
                    </div>
                    <div>
                      <span className="font-medium">Domain:</span> {deal.domain}
                    </div>
                    <div>
                      <span className="font-medium">Value:</span> {deal.value}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {deal.status}
                    </div>
                    <div>
                      <span className="font-medium">Partner:</span> {deal.partner}
                    </div>
                    <div>
                      <span className="font-medium">Submitted:</span> {deal.submittedDate}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      Update Existing
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="text-sm text-muted-foreground">
                You can continue with this registration if you believe this is a different opportunity,
                or contact your Partner Manager for assistance.
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Success State */}
      {!isChecking && companyName.length > 2 && domain.length > 3 && 
       duplicateResults.length === 0 && Object.keys(validationErrors).length === 0 && (
        <Alert className="border-success/20 bg-success/5">
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertDescription className="text-success">
            Great! No duplicate deals found. You can proceed with the registration.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};