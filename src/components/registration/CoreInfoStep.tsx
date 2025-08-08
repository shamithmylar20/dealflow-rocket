import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/components/form/FormField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CoreInfoStepProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const CoreInfoStep = ({ formData, setFormData }: CoreInfoStepProps) => {
  const [partnerInfo, setPartnerInfo] = useState({
    company: formData.partnerCompany || "",
    submitterName: formData.submitterName || "",
    submitterEmail: formData.submitterEmail || "",
    partnerType: formData.partnerType || "",
    territory: formData.territory || ""
  });

  const [customerInfo, setCustomerInfo] = useState({
    legalName: formData.customerLegalName || "",
    industry: formData.customerIndustry || "",
    companySize: formData.customerCompanySize || "",
    revenue: formData.customerRevenue || "",
    location: formData.customerLocation || ""
  });

  // Update form data when local state changes
  useEffect(() => {
    setFormData({
      ...formData,
      ...partnerInfo,
      customerLegalName: customerInfo.legalName,
      customerIndustry: customerInfo.industry,
      customerCompanySize: customerInfo.companySize,
      customerRevenue: customerInfo.revenue,
      customerLocation: customerInfo.location
    });
  }, [partnerInfo, customerInfo, formData, setFormData]);

  return (
    <div className="space-y-6">
      {/* Partner Information Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Partner Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Partner Company"
              required
              tooltip="Your registered partner company name"
            >
              <Select
                value={partnerInfo.company}
                onValueChange={(value) => setPartnerInfo({...partnerInfo, company: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="techflow-solutions">TechFlow Solutions</SelectItem>
                  <SelectItem value="digital-innovations">Digital Innovations Inc.</SelectItem>
                  <SelectItem value="cloudware-partners">CloudWare Partners</SelectItem>
                  <SelectItem value="databridge-consulting">DataBridge Consulting</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Partner Type"
              required
              tooltip="Your partner tier/type as per agreement"
            >
              <Select
                value={partnerInfo.partnerType}
                onValueChange={(value) => setPartnerInfo({...partnerInfo, partnerType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select partner type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="premier">Premier Partner</SelectItem>
                  <SelectItem value="gold">Gold Partner</SelectItem>
                  <SelectItem value="silver">Silver Partner</SelectItem>
                  <SelectItem value="certified">Certified Partner</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Submitter Name"
              required
              tooltip="Your full name as the deal submitter"
            >
              <Input
                value={partnerInfo.submitterName}
                onChange={(e) => setPartnerInfo({...partnerInfo, submitterName: e.target.value})}
                placeholder="e.g., John Smith"
              />
            </FormField>

            <FormField
              label="Submitter Email"
              required
              tooltip="Your business email address"
            >
              <Input
                type="email"
                value={partnerInfo.submitterEmail}
                onChange={(e) => setPartnerInfo({...partnerInfo, submitterEmail: e.target.value})}
                placeholder="e.g., john.smith@techflow.com"
              />
            </FormField>
          </div>

          <FormField
            label="Territory"
            required
            tooltip="Geographic territory for this deal"
          >
            <Select
              value={partnerInfo.territory}
              onValueChange={(value) => setPartnerInfo({...partnerInfo, territory: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select territory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="emea">EMEA</SelectItem>
                <SelectItem value="apac">APAC</SelectItem>
                <SelectItem value="latam">Latin America</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </CardContent>
      </Card>

      <Separator />

      {/* Customer Information Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            label="Legal Entity Name"
            required
            tooltip="Official legal name of the customer company"
            helpText="This should match official business registration"
          >
            <Input
              value={customerInfo.legalName}
              onChange={(e) => setCustomerInfo({...customerInfo, legalName: e.target.value})}
              placeholder="e.g., ACME Corporation Inc."
            />
          </FormField>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Industry"
              required
              tooltip="Primary industry/sector of the customer"
            >
              <Select
                value={customerInfo.industry}
                onValueChange={(value) => setCustomerInfo({...customerInfo, industry: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial-services">Financial Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare & Life Sciences</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="government">Government & Public Sector</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="energy">Energy & Utilities</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Company Size"
              required
              tooltip="Number of employees in the organization"
            >
              <Select
                value={customerInfo.companySize}
                onValueChange={(value) => setCustomerInfo({...customerInfo, companySize: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup (1-50)</SelectItem>
                  <SelectItem value="small">Small (51-200)</SelectItem>
                  <SelectItem value="medium">Medium (201-1000)</SelectItem>
                  <SelectItem value="large">Large (1001-5000)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (5000+)</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              label="Annual Revenue"
              tooltip="Estimated annual revenue (optional)"
            >
              <Select
                value={customerInfo.revenue}
                onValueChange={(value) => setCustomerInfo({...customerInfo, revenue: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1m">Under $1M</SelectItem>
                  <SelectItem value="1m-10m">$1M - $10M</SelectItem>
                  <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                  <SelectItem value="50m-100m">$50M - $100M</SelectItem>
                  <SelectItem value="100m-500m">$100M - $500M</SelectItem>
                  <SelectItem value="500m-1b">$500M - $1B</SelectItem>
                  <SelectItem value="over-1b">Over $1B</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Headquarters Location"
              required
              tooltip="Primary headquarters location"
            >
              <Input
                value={customerInfo.location}
                onChange={(e) => setCustomerInfo({...customerInfo, location: e.target.value})}
                placeholder="e.g., San Francisco, CA, USA"
              />
            </FormField>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};