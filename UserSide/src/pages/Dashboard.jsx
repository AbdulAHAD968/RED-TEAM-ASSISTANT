import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const vulnerabilityData = [
    { name: 'Critical', value: 5 },
    { name: 'High', value: 12 },
    { name: 'Medium', value: 23 },
    { name: 'Low', value: 42 },
  ];

  const scanHistoryData = [
    { name: 'Jan', Scans: 12 },
    { name: 'Feb', Scans: 19 },
    { name: 'Mar', Scans: 15 },
    { name: 'Apr', Scans: 22 },
    { name: 'May', Scans: 18 },
    { name: 'Jun', Scans: 25 },
  ];

  const serviceDistribution = [
    { name: 'HTTP', value: 35 },
    { name: 'HTTPS', value: 25 },
    { name: 'SSH', value: 15 },
    { name: 'FTP', value: 10 },
    { name: 'Other', value: 15 },
  ];

  const COLORS = ['#FF4560', '#FF9760', '#FEB019', '#00E396'];

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Red Team Assistant Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Scans
              </Typography>
              <Typography variant="h4" component="div" sx={{ color: 'white' }}>
                143
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Vulnerabilities Found
              </Typography>
              <Typography variant="h4" component="div" sx={{ color: 'white' }}>
                82
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Targets Monitored
              </Typography>
              <Typography variant="h4" component="div" sx={{ color: 'white' }}>
                27
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Reports Generated
              </Typography>
              <Typography variant="h4" component="div" sx={{ color: 'white' }}>
                56
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Vulnerability Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vulnerability Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={vulnerabilityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {vulnerabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Scan History Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Scan Activity (Last 6 Months)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={scanHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="Scans" stroke="#6366f1" fill="rgba(99, 102, 241, 0.2)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Scans */}
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Scan Reports
              </Typography>
              <Box sx={{ overflow: 'auto', maxHeight: 320 }}>
                {[
                  { name: '192.168.1.1', date: '2023-06-15', status: 'Completed', vulnerabilities: 5 },
                  { name: 'example.com', date: '2023-06-14', status: 'Completed', vulnerabilities: 12 },
                  { name: '10.0.0.5', date: '2023-06-13', status: 'Failed', vulnerabilities: 0 },
                  { name: 'testserver.local', date: '2023-06-12', status: 'Completed', vulnerabilities: 3 },
                  { name: 'api.company.com', date: '2023-06-11', status: 'In Progress', vulnerabilities: 0 },
                ].map((scan, index) => (
                  <Box key={index} sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" fontWeight="bold">
                        {scan.name}
                      </Typography>
                      <Chip 
                        label={scan.status} 
                        color={
                          scan.status === 'Completed' ? 'success' : 
                          scan.status === 'In Progress' ? 'warning' : 'error'
                        } 
                        size="small" 
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        {scan.date}
                      </Typography>
                      <Typography variant="body2">
                        {scan.vulnerabilities} vulnerabilities found
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;