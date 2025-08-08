import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit, FileText, CheckCircle, AlertTriangle } from "lucide-react";

interface ReviewStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const ReviewStep = ({ formData, setFormData }: ReviewStepProps) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
    if (isNaN(num)) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatArray = (arr: any[]) => {
    if (!arr || arr.length === 0) return 'None selected';
    return arr.join(', ');
  };

  const getEstimatedApprovalTime = () => {
    const dealValue = parseFloat(formData.dealValue?.replace(/[^0-9.]/g, '') || '0');
    const hasCompliance = formData.complianceRequirements?.length > 0;
    
    if (dealValue > 500000 || hasCompliance) {
      return "24-48 hours (Manual review required)";
    } else if (dealValue > 100000) {
      return "4-24 hours (Standard review)";
    } else {
      return "Under 4 hours (Fast-track approval)";
    }
  };

  const getApprovalRoute = () => {
    const dealValue = parseFloat(formData.dealValue?.replace(/[^0-9.]/g, '') || '0');
    const hasCompliance = formData.complianceRequirements?.length > 0;
    
    if (dealValue > 500000) {
      return "Enterprise Sales Director + Regional VP";
    } else if (dealValue > 100000 || hasCompliance) {
      return "Regional Sales Manager + Partner Manager";
    } else {
      return "Auto-approval with Partner Manager notification";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Review Your Deal Registration
        </h3>
        <p className="text-muted-foreground">
          Please review all information before submitting. You can edit any section if needed.
        </p>
      </div>

      {/* Quick Check Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Customer Information</CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Company Name</p>
              <p className="text-foreground">{formData.companyName || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Domain</p>
              <p className="text-foreground">{formData.domain || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Legal Entity Name</p>
              <p className="text-foreground">{formData.customerLegalName || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Industry</p>
              <p className="text-foreground">{formData.customerIndustry || 'Not specified'}</p>
            </div>
          </div>
          
          {formData.duplicateResults?.length > 0 && (
            <Alert className="border-warning/20 bg-warning/5">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning">
                {formData.duplicateResults.length} potential duplicate deal(s) detected. 
                Please ensure this is a unique opportunity.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Partner Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Partner Information</CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Partner Company</p>
              <p className="text-foreground">{formData.company || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Partner Type</p>
              <p className="text-foreground">{formData.partnerType || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Submitter</p>
              <p className="text-foreground">{formData.submitterName || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Territory</p>
              <p className="text-foreground">{formData.territory || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deal Intelligence */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Deal Intelligence</CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Deal Value</p>
              <p className="text-lg font-semibold text-foreground">{formatCurrency(formData.dealValue)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Expected Close Date</p>
              <p className="text-foreground">{formatDate(formData.expectedCloseDate)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Probability</p>
              <p className="text-foreground">{formData.probability?.[0] || 0}%</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Selected Products</p>
              <div className="flex flex-wrap gap-2">
                {formData.mcpServer && <Badge>MCP Server</Badge>}
                {formData.safeRag && <Badge>Safe RAG</Badge>}
                {formData.proximaAi && <Badge>Proxima AI</Badge>}
                {formData.pebbloModules && <Badge>Pebblo Modules</Badge>}
                {formData.professionalServices && <Badge>Professional Services</Badge>}
                {!formData.mcpServer && !formData.safeRag && !formData.proximaAi && !formData.pebbloModules && (
                  <span className="text-muted-foreground">None selected</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Primary Use Case</p>
              <p className="text-foreground">{formData.primaryUseCase || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Technical Environment</p>
              <p className="text-foreground">{formatArray(formData.technicalEnvironment)}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Compliance Requirements</p>
              <p className="text-foreground">{formatArray(formData.complianceRequirements)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation */}
      {(formData.uploadedFiles?.length > 0 || formData.additionalNotes) && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Documentation</CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {formData.uploadedFiles?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Uploaded Files</p>
                <div className="space-y-1">
                  {formData.uploadedFiles.map((file: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {formData.additionalNotes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Additional Notes</p>
                <p className="text-foreground text-sm">{formData.additionalNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Approval Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Approval Process</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estimated Approval Time</p>
              <p className="text-foreground">{getEstimatedApprovalTime()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Approval Route</p>
              <p className="text-foreground">{getApprovalRoute()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <div className="space-y-1">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  By submitting this deal registration, I confirm that all information provided is accurate 
                  and complete. I understand that providing false information may result in deal rejection 
                  and potential termination of partner status.
                </p>
              </div>
            </div>

            {agreedToTerms && (
              <Alert className="border-success/20 bg-success/5">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">
                  Thank you for confirming. Your deal is ready for submission.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Validation Summary */}
      {!agreedToTerms && (
        <Alert className="border-warning/20 bg-warning/5">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription className="text-warning">
            Please review all sections and agree to the terms and conditions before submitting.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};