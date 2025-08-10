import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Copy,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

// Mock data for demo
const deals = [
  {
    id: "DEA-2024-001",
    customerName: "Acme Corporation",
    dealValue: "$450,000",
    status: "pending",
    submittedDate: "2024-01-15",
    expectedClose: "2024-03-30",
    products: ["MCP Server", "Safe RAG"]
  },
  {
    id: "DEA-2024-002", 
    customerName: "Global Tech Solutions",
    dealValue: "$125,000",
    status: "approved",
    submittedDate: "2024-01-10",
    expectedClose: "2024-02-28",
    products: ["Proxima AI"]
  },
  {
    id: "DEA-2024-003",
    customerName: "Enterprise Systems Inc",
    dealValue: "$750,000", 
    status: "rejected",
    submittedDate: "2024-01-05",
    expectedClose: "2024-04-15",
    products: ["MCP Server", "Pebblo Modules", "Safe RAG"]
  }
];

const metrics = [
  {
    title: "Total Deals",
    value: "24",
    change: "+12%",
    icon: TrendingUp,
    description: "vs last month"
  },
  {
    title: "Pending Approval",
    value: "8", 
    change: "2 urgent",
    icon: Clock,
    description: "requiring attention"
  },
  {
    title: "Approved This Month",
    value: "18",
    change: "+25%",
    icon: CheckCircle,
    description: "vs last month"
  },
  {
    title: "Pipeline Value",
    value: "$2.4M",
    change: "+18%", 
    icon: TrendingUp,
    description: "total registered"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved": return "default";
    case "pending": return "secondary";
    case "rejected": return "destructive";
    default: return "outline";
  }
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || deal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Partner Dashboard</h1>
            <p className="text-muted-foreground">Manage your deal registrations and track performance</p>
          </div>
          <Button asChild>
            <a href="/register">
              <Plus className="w-4 h-4 mr-2" />
              Register New Deal
            </a>
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-primary font-medium mr-1">{metric.change}</span>
                  {metric.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="deals" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deals">Deal Registrations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deals" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Registrations</CardTitle>
                <CardDescription>View and manage all your registered deals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search deals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Deals Table */}
                <div className="space-y-4">
                  {filteredDeals.map((deal) => (
                    <Card key={deal.id} className="border-l-4 border-l-primary/20">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg">{deal.customerName}</h3>
                              <Badge variant={getStatusColor(deal.status as any)}>
                                {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span>ID: {deal.id}</span>
                              <span>Value: {deal.dealValue}</span>
                              <span>Submitted: {deal.submittedDate}</span>
                              <span>Expected Close: {deal.expectedClose}</span>
                            </div>
                            <div className="flex gap-2">
                              {deal.products.map((product) => (
                                <Badge key={product} variant="outline">{product}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Copy className="w-4 h-4 mr-1" />
                              Clone
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Track your deal registration performance and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Detailed analytics and reporting features will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Partner Settings</CardTitle>
                <CardDescription>Manage your partner profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Settings Panel</h3>
                  <p className="text-muted-foreground">
                    Partner settings and profile management features will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;