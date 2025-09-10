import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";

function SubdomainEnum() {
  const [domain, setDomain] = useState("");

  const handleRun = () => {
    console.log("Running Subfinder/Amass for:", domain);
    // later you can hook API/backend here
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Subdomain Enumeration
      </Typography>
      <Typography variant="body1" gutterBottom>
        Run asset discovery with Subfinder / Amass to enumerate subdomains.
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <TextField
          fullWidth
          label="Target Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRun}
        >
          Run Enumeration
        </Button>
      </Paper>
    </Box>
  );
}

export default SubdomainEnum;
