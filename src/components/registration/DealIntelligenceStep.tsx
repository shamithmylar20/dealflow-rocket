import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FormField } from "@/components/form/FormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface DealIntelligenceStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const DealIntelligenceStep = ({ formData, setFormData }: DealIntelligenceStepProps) => {
  const [opportunityDetails, setOpportunityDetails] = useState({
    dealStage: formData.dealStage || "",
    probability: formData.probability || [50],
    expectedCloseDate: formData.expectedCloseDate || "",
    dealValue: formData.dealValue || "",
    contractType: formData.contractType || "",
    competition: formData.competition || []
  });

  const [technicalScope, setTechnicalScope] = useState({
    mcpServer: formData.mcpServer || false,
    safeRag: formData.safeRag || false,
    proximaAi: formData.proximaAi || false,
    pebbloModules: formData.pebbloModules || false,
    implementationTimeline: formData.implementationTimeline || [12],
    professionalServices: formData.professionalServices || false,
    integrationRequirements: formData.integrationRequirements || []
  });

  const [useCase, setUseCase] = useState({
    primaryUseCase: formData.primaryUseCase || "",
    businessProblem: formData.businessProblem || "",
    successCriteria: formData.successCriteria || "",
    technicalEnvironment: formData.technicalEnvironment || [],
    dataSensitivity: formData.dataSensitivity || "",
    complianceRequirements: formData.complianceRequirements || []
  });

  // Calculate deal value display
  const formatCurrency = (value: string) => {
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Update form data when local state changes
  useEffect(() => {
    setFormData({
      ...formData,
      ...opportunityDetails,
      ...technicalScope,
      ...useCase
    });
  }, [opportunityDetails, technicalScope, useCase, formData, setFormData]);

  return (
    <div className="space-y-6">
      {/* Opportunity Details Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Opportunity Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Deal Stage"
              required
              tooltip="Current stage of the sales opportunity"
            >
              <Select
                value={opportunityDetails.dealStage}
                onValueChange={(value) => setOpportunityDetails({...opportunityDetails, dealStage: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select deal stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed-won">Closed Won</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Contract Type"
              required
              tooltip="Type of contract for this deal"
            >
              <Select
                value={opportunityDetails.contractType}
                onValueChange={(value) => setOpportunityDetails({...opportunityDetails, contractType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Business</SelectItem>
                  <SelectItem value="expansion">Expansion</SelectItem>
                  <SelectItem value="renewal">Renewal</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Deal Value (USD)"
              required
              tooltip="Total contract value in USD"
            >
              <Input
                value={opportunityDetails.dealValue}
                onChange={(e) => setOpportunityDetails({...opportunityDetails, dealValue: e.target.value})}
                placeholder="e.g., 150000"
              />
              {opportunityDetails.dealValue && (
                <div className="text-sm text-muted-foreground mt-1">
                  {formatCurrency(opportunityDetails.dealValue)}
                </div>
              )}
            </FormField>

            <FormField
              label="Expected Close Date"
              required
              tooltip="Anticipated deal closure date"
            >
              <Input
                type="date"
                value={opportunityDetails.expectedCloseDate}
                onChange={(e) => setOpportunityDetails({...opportunityDetails, expectedCloseDate: e.target.value})}
              />
            </FormField>
          </div>

          <FormField
            label={`Probability: ${opportunityDetails.probability[0]}%`}
            tooltip="Estimated probability of closing this deal"
          >
            <Slider
              value={opportunityDetails.probability}
              onValueChange={(value) => setOpportunityDetails({...opportunityDetails, probability: value})}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </FormField>
        </CardContent>
      </Card>

      <Separator />

      {/* Technical Scope Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Scope</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Product Selection</h4>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mcp-server"
                  checked={technicalScope.mcpServer}
                  onCheckedChange={(checked) => setTechnicalScope({...technicalScope, mcpServer: checked as boolean})}
                />
                <label htmlFor="mcp-server" className="text-sm">MCP Server</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="safe-rag"
                  checked={technicalScope.safeRag}
                  onCheckedChange={(checked) => setTechnicalScope({...technicalScope, safeRag: checked as boolean})}
                />
                <label htmlFor="safe-rag" className="text-sm">Safe RAG</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="proxima-ai"
                  checked={technicalScope.proximaAi}
                  onCheckedChange={(checked) => setTechnicalScope({...technicalScope, proximaAi: checked as boolean})}
                />
                <label htmlFor="proxima-ai" className="text-sm">Proxima AI</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pebblo-modules"
                  checked={technicalScope.pebbloModules}
                  onCheckedChange={(checked) => setTechnicalScope({...technicalScope, pebbloModules: checked as boolean})}
                />
                <label htmlFor="pebblo-modules" className="text-sm">Pebblo Modules</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="professional-services"
                  checked={technicalScope.professionalServices}
                  onCheckedChange={(checked) => setTechnicalScope({...technicalScope, professionalServices: checked as boolean})}
                />
                <label htmlFor="professional-services" className="text-sm">Professional Services</label>
              </div>
            </div>

            <div className="space-y-3">
              <FormField
                label={`Implementation Timeline: ${technicalScope.implementationTimeline[0]} weeks`}
                tooltip="Expected implementation duration"
              >
                <Slider
                  value={technicalScope.implementationTimeline}
                  onValueChange={(value) => setTechnicalScope({...technicalScope, implementationTimeline: value})}
                  min={4}
                  max={52}
                  step={2}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>4 weeks</span>
                  <span>26 weeks</span>
                  <span>52 weeks</span>
                </div>
              </FormField>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Use Case Documentation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Use Case Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Primary Use Case"
              required
              tooltip="Main use case for the AI implementation"
            >
              <Select
                value={useCase.primaryUseCase}
                onValueChange={(value) => setUseCase({...useCase, primaryUseCase: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select primary use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document-analysis">Document Analysis</SelectItem>
                  <SelectItem value="customer-support">Customer Support</SelectItem>
                  <SelectItem value="data-insights">Data Insights & Analytics</SelectItem>
                  <SelectItem value="process-automation">Process Automation</SelectItem>
                  <SelectItem value="risk-management">Risk Management</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Data Sensitivity Level"
              required
              tooltip="Classification of data that will be processed"
            >
              <Select
                value={useCase.dataSensitivity}
                onValueChange={(value) => setUseCase({...useCase, dataSensitivity: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sensitivity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="confidential">Confidential</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <FormField
            label="Business Problem"
            required
            tooltip="Describe the business challenge this solution will address"
            helpText="50-500 characters"
          >
            <Textarea
              value={useCase.businessProblem}
              onChange={(e) => setUseCase({...useCase, businessProblem: e.target.value})}
              placeholder="Describe the specific business problem or challenge..."
              rows={3}
            />
          </FormField>

          <FormField
            label="Success Criteria"
            required
            tooltip="Define measurable outcomes that indicate project success"
          >
            <Textarea
              value={useCase.successCriteria}
              onChange={(e) => setUseCase({...useCase, successCriteria: e.target.value})}
              placeholder="List the key metrics and outcomes that will measure success..."
              rows={3}
            />
          </FormField>

          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Technical Environment</h4>
            <div className="flex flex-wrap gap-2">
              {["AWS", "Azure", "GCP", "On-premises", "Hybrid"].map((env) => (
                <Badge
                  key={env}
                  variant={useCase.technicalEnvironment.includes(env) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const current = useCase.technicalEnvironment;
                    const updated = current.includes(env)
                      ? current.filter(e => e !== env)
                      : [...current, env];
                    setUseCase({...useCase, technicalEnvironment: updated});
                  }}
                >
                  {env}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Compliance Requirements</h4>
            <div className="flex flex-wrap gap-2">
              {["GDPR", "HIPAA", "SOC2", "ISO27001", "None"].map((compliance) => (
                <Badge
                  key={compliance}
                  variant={useCase.complianceRequirements.includes(compliance) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const current = useCase.complianceRequirements;
                    const updated = current.includes(compliance)
                      ? current.filter(c => c !== compliance)
                      : [...current, compliance];
                    setUseCase({...useCase, complianceRequirements: updated});
                  }}
                >
                  {compliance}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};