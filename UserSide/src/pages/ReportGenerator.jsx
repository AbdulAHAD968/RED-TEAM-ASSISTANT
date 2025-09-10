import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Chip,
  Alert,
  FormGroup  // Added FormGroup import
} from '@mui/material';
import { PlayArrow, Save, Download, PictureAsPdf, Description } from '@mui/icons-material';

const ReportGenerator = () => {
  const [scanData, setScanData] = useState([]);
  const [reportType, setReportType] = useState('comprehensive');
  const [reportStyle, setReportStyle] = useState('professional');
  const [includeExecutiveSummary, setIncludeExecutiveSummary] = useState(true);
  const [includeMethodology, setIncludeMethodology] = useState(true);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [includeAppendices, setIncludeAppendices] = useState(false);

  const generateReport = () => {
    console.log('Generating report with options:', {
      reportType,
      reportStyle,
      includeExecutiveSummary,
      includeMethodology,
      includeRecommendations,
      includeAppendices
    });
  };

  const exportReport = (format) => {
    console.log(`Exporting report as ${format}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Report Generator
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        This module will integrate with Claude/DeepSeek LLM APIs to generate professional penetration test reports 
        based on consolidated scan findings.
      </Alert>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Configuration
              </Typography>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={reportType}
                  label="Report Type"
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <MenuItem value="executive">Executive Summary</MenuItem>
                  <MenuItem value="technical">Technical Detailed</MenuItem>
                  <MenuItem value="comprehensive">Comprehensive</MenuItem>
                  <MenuItem value="cisa">CISA Compliance</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Report Style</InputLabel>
                <Select
                  value={reportStyle}
                  label="Report Style"
                  onChange={(e) => setReportStyle(e.target.value)}
                >
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="minimalist">Minimalist</MenuItem>
                  <MenuItem value="detailed">Highly Detailed</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Client Name (Optional)"
                margin="normal"
                variant="outlined"
                placeholder="Enter client name for report header"
              />
              
              <TextField
                fullWidth
                label="Project Name (Optional)"
                margin="normal"
                variant="outlined"
                placeholder="Enter project name for report header"
              />
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Report Sections
              </Typography>
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={includeExecutiveSummary}
                      onChange={(e) => setIncludeExecutiveSummary(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Executive Summary"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={includeMethodology}
                      onChange={(e) => setIncludeMethodology(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Methodology"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={includeRecommendations}
                      onChange={(e) => setIncludeRecommendations(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Recommendations"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={includeAppendices}
                      onChange={(e) => setIncludeAppendices(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Appendices (Raw Data)"
                />
              </FormGroup>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={generateReport}
                  size="large"
                >
                  Generate Report
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Save />}
                  size="large"
                >
                  Save Configuration
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ p: 2, mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Reports
              </Typography>
              
              {[
                { name: 'Full Infrastructure PenTest - Example Corp', date: '2023-06-15', type: 'Comprehensive' },
                { name: 'Web Application Assessment - Test Company', date: '2023-06-10', type: 'Technical' },
                { name: 'Executive Summary - Demo Inc', date: '2023-06-05', type: 'Executive' },
              ].map((report, index) => (
                <Box key={index} sx={{ 
                  p: 2, 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {report.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {report.date} • {report.type}
                    </Typography>
                  </Box>
                  <Box>
                    <Button size="small" startIcon={<Download />}>
                      PDF
                    </Button>
                    <Button size="small" startIcon={<Download />} sx={{ ml: 1 }}>
                      DOCX
                    </Button>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Export Options
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<PictureAsPdf />}
                  onClick={() => exportReport('pdf')}
                  size="large"
                  color="error"
                >
                  Export as PDF
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Description />}
                  onClick={() => exportReport('docx')}
                  size="large"
                  color="primary"
                >
                  Export as DOCX
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Description />}
                  onClick={() => exportReport('json')}
                  size="large"
                  color="secondary"
                >
                  Export as JSON
                </Button>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                LLM Integration Status
              </Typography>
              
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                borderRadius: 1,
              }}>
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Claude API:</span>
                  <Chip label="Connected" color="success" size="small" />
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <span>DeepSeek API:</span>
                  <Chip label="Connected" color="success" size="small" />
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <span>Report Templates:</span>
                  <Chip label="12 Available" color="info" size="small" />
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Sample Report Structure
              </Typography>
              
              <Typography variant="body2">
                1. Cover Page<br />
                2. Executive Summary<br />
                3. Assessment Overview<br />
                4. Methodology<br />
                5. Detailed Findings<br />
                • Vulnerability Overview<br />
                • Risk Ratings<br />
                • Technical Details<br />
                6. Recommendations<br />
                7. Appendices
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportGenerator;