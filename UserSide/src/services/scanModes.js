// scanModes.js

export const scanModes = {
  basic: {
    nmap: "-T4 -F", // Fast scan
    rustscan: "--ulimit 5000 -t 2000 -- -sC -sV", // Quick port scan with version detection
    gobuster: "dir -u https://{target}/ -w /usr/share/wordlists/dirb/common.txt -t 50",
    whatweb: "--color=never --aggression 1",
    nikto: "-h {target} -Tuning 1",
    testssl: "--quiet --color 0",
    nuclei: "-t cves/ -severity low,medium,high -rate-limit 100",
    subdomain: "-d {target} -t 50"
  },
  advanced: {
    nmap: "-T4 -A -v -p-", // Comprehensive scan
    rustscan: "--ulimit 5000 -t 2000 -- -A -sV -sC -O",
    gobuster: "dir -u https://{target}/ -w /usr/share/wordlists/dirb/big.txt -t 100 -x php,html,js,txt",
    whatweb: "--color=never --aggression 3",
    nikto: "-h {target} -Tuning 1234567890ac",
    testssl: "--full --color 0",
    nuclei: "-t exposures/apis/ -t vulnerabilities/ -severity low,medium,high,critical -rate-limit 50",
    subdomain: "-d {target} -t 100 -recursive"
  }
};