import { useState } from "react";
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText } from "@mui/material";

function AnalysisIntelligence() {
  const [software, setSoftware] = useState("");
  const [vector, setVector] = useState("");
  const [exploits, setExploits] = useState([]);
  const [cvss, setCvss] = useState(null);

  const handleExploitSearch = async () => {
    const res = await fetch(`/api/exploits/${software}`);
    const data = await res.json();
    setExploits(data);
  };

  const handleCvssCalc = async () => {
    const res = await fetch(`/api/cvss?vector=${encodeURIComponent(vector)}`);
    const data = await res.json();
    setCvss(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analysis & Intelligence
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6">Exploit Mapping</Typography>
        <TextField
          fullWidth
          label="Software / Version (e.g. Apache 2.4.49)"
          value={software}
          onChange={(e) => setSoftware(e.target.value)}
          sx={{ my: 2 }}
        />
        <Button variant="contained" onClick={handleExploitSearch}>
          Search Exploits
        </Button>

        <List>
          {exploits.map((exp, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={exp.Title}
                secondary={exp.Path}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6">Risk Scoring (CVSS)</Typography>
        <TextField
          fullWidth
          label="CVSS Vector (e.g. AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)"
          value={vector}
          onChange={(e) => setVector(e.target.value)}
          sx={{ my: 2 }}
        />
        <Button variant="contained" onClick={handleCvssCalc}>
          Calculate CVSS
        </Button>

        {cvss && (
          <Box sx={{ mt: 2 }}>
            <Typography>Base Score: {cvss.base_score}</Typography>
            <Typography>Severity: {cvss.severity}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default AnalysisIntelligence;
