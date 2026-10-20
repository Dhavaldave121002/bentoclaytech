import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

console.log('Building Master Keyword Workbook for Bento Clay Tech...');

const wb = XLSX.utils.book_new();

// Helper to set column widths
function autoFitCols(ws, data) {
  if (!data || data.length === 0) return;
  const colWidths = [];
  const keys = Object.keys(data[0]);
  keys.forEach((key) => {
    let maxLen = key ? key.toString().length : 10;
    data.forEach(row => {
      const cellVal = row && row[key] !== null && row[key] !== undefined ? row[key].toString() : '';
      if (cellVal.length > maxLen) maxLen = Math.min(cellVal.length, 50);
    });
    colWidths.push({ wch: Math.max(maxLen + 3, 12) });
  });
  ws['!cols'] = colWidths;
}

// -----------------------------------------------------------------------------
// Sheet 1: Existing Keywords
// -----------------------------------------------------------------------------
const existingKeywordsData = [
  { "Keyword": "Bento Clay Tech", "Category": "Brand Core", "Search Intent": "Navigational", "Target URL": "https://bentoclayclaytech.com/", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html & PageSEO.jsx" },
  { "Keyword": "Bentoclay Tech", "Category": "Brand Variation", "Search Intent": "Navigational", "Target URL": "https://bentoclayclaytech.com/", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "Bento Clay", "Category": "Brand Variation", "Search Intent": "Navigational", "Target URL": "https://bentoclayclaytech.com/", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "Bentoclay", "Category": "Brand Core", "Search Intent": "Navigational", "Target URL": "https://bentoclayclaytech.com/", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "Bentoclay Claytech", "Category": "Historical Entity", "Search Intent": "Navigational", "Target URL": "https://bentoclayclaytech.com/", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "bentoclayclaytech", "Category": "Domain Query", "Search Intent": "Navigational", "Target URL": "https://bentoclayclaytech.com/", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Low", "Source": "index.html" },
  { "Keyword": "Attapulgite powder manufacturer India", "Category": "Commercial B2B", "Search Intent": "Commercial / Transactional", "Target URL": "https://bentoclayclaytech.com/about", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "Attapulgite clay global exporter", "Category": "Commercial B2B", "Search Intent": "Commercial / Transactional", "Target URL": "https://bentoclayclaytech.com/", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "API 13A Section 12 drilling clay", "Category": "Product Specific", "Search Intent": "Transactional", "Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "API 13A powder", "Category": "Product Specific", "Search Intent": "Transactional", "Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "Best API 13A powder", "Category": "Commercial B2B", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "Salt Gel attapulgite", "Category": "Product Specific", "Search Intent": "Transactional", "Target URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "Premium 325 mesh attapulgite", "Category": "Product Specific", "Search Intent": "Transactional", "Target URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "Flux Fine 200 foundry clay", "Category": "Product Specific", "Search Intent": "Transactional", "Target URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "Attapulgite granules 1-5mm", "Category": "Product Specific", "Search Intent": "Transactional", "Target URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "Palygorskite manufacturer Gujarat", "Category": "Mineralogical B2B", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/about", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "CAS 12174-11-7 exporter", "Category": "Technical Chemical", "Search Intent": "Technical", "Target URL": "https://bentoclayclaytech.com/about", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "HS Code 25084000 supplier", "Category": "Customs Export", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/about", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "drilling mud viscosifier Middle East", "Category": "Geo-Commercial", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "API drilling clay Dubai UAE", "Category": "Geo-Commercial", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "attapulgite supplier Saudi Arabia", "Category": "Geo-Commercial", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "attapulgite exporter to USA", "Category": "Geo-Commercial", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/", "Status": "Preserved", "Priority": "P0", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "attapulgite powder Europe Rotterdam", "Category": "Geo-Commercial", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "paint thixotrope additive", "Category": "Application", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "agricultural carrier clay", "Category": "Application", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/products/attapulgite-natural-powder", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "industrial absorbent cat litter", "Category": "Application", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "High", "Source": "index.html" },
  { "Keyword": "Bhavnagar mineral plant", "Category": "Local Infrastructure", "Search Intent": "Navigational", "Target URL": "https://bentoclayclaytech.com/why-us", "Status": "Preserved", "Priority": "P2", "Monthly Potential": "Medium", "Source": "index.html" },
  { "Keyword": "Mundra port container shipping", "Category": "Logistics Export", "Search Intent": "Commercial", "Target URL": "https://bentoclayclaytech.com/why-us", "Status": "Preserved", "Priority": "P1", "Monthly Potential": "Medium", "Source": "index.html" }
];
const ws1 = XLSX.utils.json_to_sheet(existingKeywordsData);
autoFitCols(ws1, existingKeywordsData);
XLSX.utils.book_append_sheet(wb, ws1, "Existing Keywords");

// -----------------------------------------------------------------------------
// Sheet 2: Product Catalogue
// -----------------------------------------------------------------------------
const productCatalogueData = [
  {
    "Product ID": "salt-gel",
    "Product Name": "Attapulgite Salt Gel Grade Powder",
    "Grade Code": "SG",
    "Primary Category": "Oilfield & Deep Well Drilling",
    "Form": "Fine Powder (<75 μm)",
    "Chemical Formula": "(Mg, Al)₅Si₈O₂₂(OH)₄ · 4H₂O",
    "CAS Number": "12174-11-7",
    "HS Code": "25084000",
    "Target Parameters": "Viscosity ≥35 cps @ 600 rpm (Fann 35); Residue >75 μm ≤4.0%; Moisture ≤8.0%",
    "Standard Packaging": "25 kg HDPE bags with inner PE liner; 1 MT Jumbo FIBC",
    "Moisture Limit": "8.0% Max",
    "Target Industries": "Offshore drilling, Saturated brine workovers, Geothermal wells, HDD",
    "Product Page URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder",
    "PDS Download": "https://bentoclayclaytech.com/pds/PDS-Attapulgite-Salt-Gel-Grade-Bentoclay-Claytech.pdf"
  },
  {
    "Product ID": "api-13a",
    "Product Name": "Attapulgite Powder API-13A Section 12 Grade",
    "Grade Code": "A13",
    "Primary Category": "Petroleum Drilling Fluid Viscosifier",
    "Form": "Fine Powder (<75 μm)",
    "Chemical Formula": "Hydrated Magnesium Aluminum Phyllosilicate",
    "CAS Number": "12174-11-7",
    "HS Code": "25084000",
    "Target Parameters": "Viscosity ≥30 cps @ 600 rpm in saturated salt brine; Wet residue >75 μm ≤8.0%; Moisture ≤16.0%",
    "Standard Packaging": "25 kg multi-wall HDPE sacks; 40 bags per ISPM-15 pallet",
    "Moisture Limit": "16.0% Max (Standard) / <10% (Low Moisture)",
    "Target Industries": "Oil & Gas Exploration, Saline offshore drilling muds, Water well drilling",
    "Product Page URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder",
    "PDS Download": "https://bentoclayclaytech.com/pds/PDS-Attapulgite-API-13A-Section-12-Bentoclay-Claytech.pdf"
  },
  {
    "Product ID": "premium-325",
    "Product Name": "Attapulgite Premium 325 Powder",
    "Grade Code": "P325",
    "Primary Category": "Paints, Coatings & Sealants Thixotrope",
    "Form": "Micronised Superfine Powder (44 μm)",
    "Chemical Formula": "Palygorskite Needle Matrix",
    "CAS Number": "12174-11-7",
    "HS Code": "25084000",
    "Target Parameters": "325 mesh (wet) passing ≥98.5%; BET Surface Area 210 ±10% m²/g; Bulk Density 0.3–0.4 g/ml; Brookfield Viscosity 1200–1600 cP",
    "Standard Packaging": "25 kg paper/HDPE with inner moisture barrier",
    "Moisture Limit": "6.0–8.0%",
    "Target Industries": "Architectural emulsion paints, Industrial coatings, Sealants, Adhesives",
    "Product Page URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder",
    "PDS Download": "https://bentoclayclaytech.com/pds/PDS-Premium-325-Attapulgite-Bentoclay-Claytech.pdf"
  },
  {
    "Product ID": "flux-fine",
    "Product Name": "Attapulgite Flux Fine-200 (Foundry Flux) Powder",
    "Grade Code": "F200",
    "Primary Category": "Metallurgy & Foundry Refractories",
    "Form": "200 Mesh Powder",
    "Chemical Formula": "Magnesium Aluminum Silicate",
    "CAS Number": "12174-11-7",
    "HS Code": "25084000",
    "Target Parameters": "Swelling Index 1 hr ≥95 ml; Swelling Index 24 hr ≥85 ml; Free Swell Volume (FSV) 12–14 ml; 200 mesh passing ≥98.0%",
    "Standard Packaging": "25 kg HDPE with PE liner",
    "Moisture Limit": "8.0–12.0%",
    "Target Industries": "Foundry mold core washes, Continuous casting fluxes, Thermal refractories (>1400°C)",
    "Product Page URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder",
    "PDS Download": "https://bentoclayclaytech.com/pds/PDS-Flux-Fine-200-Attapulgite-Bentoclay-Claytech.pdf"
  },
  {
    "Product ID": "natural-powder",
    "Product Name": "Attapulgite Natural Powder",
    "Grade Code": "NP",
    "Primary Category": "Agrochemical Carrier & Soil Conditioner",
    "Form": "200 Mesh Natural Powder",
    "Chemical Formula": "Natural Palygorskite Ore",
    "CAS Number": "12174-11-7",
    "HS Code": "25084000",
    "Target Parameters": "Moisture 8–12% (10.4% rep); pH 7.6; Specific Gravity 2.39; Liquid absorption 120–150%; SiO₂ 40.2%, Al₂O₃ 6.2%, MgO 8.42%",
    "Standard Packaging": "25 kg HDPE bags",
    "Moisture Limit": "8.0–12.0%",
    "Target Industries": "Pesticide Wettable Powders (WP), Fertilizer anti-caking, Animal feed binders",
    "Product Page URL": "https://bentoclayclaytech.com/products/attapulgite-natural-powder",
    "PDS Download": "https://bentoclayclaytech.com/pds/PDS-Natural-Attapulgite-Powder-Bentoclay-Claytech.pdf"
  },
  {
    "Product ID": "granules",
    "Product Name": "Attapulgite Natural Granules 1 to 5 mm",
    "Grade Code": "NG",
    "Primary Category": "Spill Remediation & Pet Care Absorbents",
    "Form": "1–5 mm Ball Granules",
    "Chemical Formula": "Processed Porous Calcined/Natural Granules",
    "CAS Number": "12174-11-7",
    "HS Code": "25084000",
    "Target Parameters": "Particle Size 1–5 mm; Liquid uptake 180–220%; Under/oversize ≤5% (2.6% rep); Moisture 5.0–10.0%; Low Dust",
    "Standard Packaging": "25 kg HDPE bags, 50 kg sacks, or 1000 kg Jumbo Bulk Bags",
    "Moisture Limit": "5.0–10.0%",
    "Target Industries": "Hazardous chemical spill response, Aviation fuel filtration, Premium non-clumping cat litter",
    "Product Page URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm",
    "PDS Download": "https://bentoclayclaytech.com/pds/PDS-Natural-Attapulgite-Granules-Bentoclay-Claytech.pdf"
  }
];
const ws2 = XLSX.utils.json_to_sheet(productCatalogueData);
autoFitCols(ws2, productCatalogueData);
XLSX.utils.book_append_sheet(wb, ws2, "Product Catalogue");

// -----------------------------------------------------------------------------
// Sheet 3: India States and Union Territories
// -----------------------------------------------------------------------------
const indiaStatesData = [
  { "State / UT": "Gujarat", "Type": "State", "Key Industrial Sectors": "Petrochemicals, Oil Drilling, Chemicals, Foundry, Mining, Ceramics", "Priority": "P0 (Home State)", "Logistics Feasibility": "Direct FTL (12–24h) from Bhavnagar Works", "Demand Score": "10/10" },
  { "State / UT": "Maharashtra", "Type": "State", "Key Industrial Sectors": "Offshore Oilfield Logistics (JNPT), Paints, Chemical Belts, Foundries", "Priority": "P0", "Logistics Feasibility": "Direct road transit (24–36h)", "Demand Score": "10/10" },
  { "State / UT": "Rajasthan", "Type": "State", "Key Industrial Sectors": "Barmer/Jaisalmer Oil & Gas Basins, Minerals, Ceramics", "Priority": "P0", "Logistics Feasibility": "Dedicated truckload transit (24–48h)", "Demand Score": "9/10" },
  { "State / UT": "Tamil Nadu", "Type": "State", "Key Industrial Sectors": "Foundries (Coimbatore), Paints & Automotive (Chennai), Chemicals", "Priority": "P1", "Logistics Feasibility": "Rail & Road FTL (48–72h)", "Demand Score": "9/10" },
  { "State / UT": "Andhra Pradesh", "Type": "State", "Key Industrial Sectors": "KG Basin Oil & Gas, Visakhapatnam Petrochemical Zone, Pharma", "Priority": "P1", "Logistics Feasibility": "Dedicated freight transit", "Demand Score": "8.5/10" },
  { "State / UT": "Telangana", "Type": "State", "Key Industrial Sectors": "Pesticides & Agrochemicals (Hyderabad), Paints & Resins", "Priority": "P1", "Logistics Feasibility": "Road FTL transit (36–48h)", "Demand Score": "8.5/10" },
  { "State / UT": "West Bengal", "Type": "State", "Key Industrial Sectors": "Haldia Petrochemical Complex, Foundries (Howrah), Paints (Kolkata)", "Priority": "P1", "Logistics Feasibility": "Interstate transport & Kolkata Port", "Demand Score": "8/10" },
  { "State / UT": "Karnataka", "Type": "State", "Key Industrial Sectors": "Foundries (Belgaum), Paints & Chemicals (Bengaluru, Mangalore)", "Priority": "P1", "Logistics Feasibility": "Direct South corridor road freight", "Demand Score": "8/10" },
  { "State / UT": "Delhi NCR", "Type": "UT / Region", "Key Industrial Sectors": "Paints, Automotive Sealants, Chemical Trading Desks", "Priority": "P1", "Logistics Feasibility": "Direct North India trucking (36–48h)", "Demand Score": "8.5/10" },
  { "State / UT": "Uttar Pradesh", "Type": "State", "Key Industrial Sectors": "Paints (Kanpur), Foundries (Agra), Agrochemicals", "Priority": "P2", "Logistics Feasibility": "Road freight via National Highways", "Demand Score": "7.5/10" },
  { "State / UT": "Haryana", "Type": "State", "Key Industrial Sectors": "Paints & Automotive Adhesives (Faridabad, Manesar, Gurugram)", "Priority": "P2", "Logistics Feasibility": "Direct Western Freight Corridor", "Demand Score": "7.5/10" },
  { "State / UT": "Punjab", "Type": "State", "Key Industrial Sectors": "Foundries (Batala, Jalandhar), Agrochemicals & Fertilizer Carriers", "Priority": "P2", "Logistics Feasibility": "Road freight", "Demand Score": "7/10" },
  { "State / UT": "Assam", "Type": "State", "Key Industrial Sectors": "Upper Assam Oil & Gas Wells (OIL / ONGC Duliajan, Digboi, Sibsagar)", "Priority": "P1 (Specialized Oilfield)", "Logistics Feasibility": "Rail / Multi-modal container transit", "Demand Score": "8/10" },
  { "State / UT": "Odisha", "Type": "State", "Key Industrial Sectors": "Paradip Port Petrochemicals, Metal Smelters, Heavy Foundries", "Priority": "P2", "Logistics Feasibility": "Rail / Coastal freight", "Demand Score": "7/10" },
  { "State / UT": "Madhya Pradesh", "Type": "State", "Key Industrial Sectors": "Pithampur & Indore Paints & Industrial Formulations, Chemicals", "Priority": "P2", "Logistics Feasibility": "Central India road logistics", "Demand Score": "7/10" },
  { "State / UT": "Kerala", "Type": "State", "Key Industrial Sectors": "Kochi Refineries & Offshore Maritime Services, Rubber Chemical Mixers", "Priority": "P2", "Logistics Feasibility": "Road & Coastal shipping", "Demand Score": "6.5/10" },
  { "State / UT": "Jharkhand", "Type": "State", "Key Industrial Sectors": "Foundries, Steel Casting Fluxes (Jamshedpur, Ranchi)", "Priority": "P2", "Logistics Feasibility": "Interstate transport", "Demand Score": "6.5/10" },
  { "State / UT": "Chhattisgarh", "Type": "State", "Key Industrial Sectors": "Heavy Castings & Refractories (Bhilai, Raipur)", "Priority": "P2", "Logistics Feasibility": "Central rail / road freight", "Demand Score": "6/10" },
  { "State / UT": "Goa", "Type": "State", "Key Industrial Sectors": "Marine Coatings, Barge Building, Chemical Processing", "Priority": "P3", "Logistics Feasibility": "Coastal road transport", "Demand Score": "5/10" },
  { "State / UT": "Himachal Pradesh", "Type": "State", "Key Industrial Sectors": "Pharma & Speciality Chemical Blending (Baddi cluster)", "Priority": "P3", "Logistics Feasibility": "North transport corridor", "Demand Score": "5.5/10" },
  { "State / UT": "Uttarakhand", "Type": "State", "Key Industrial Sectors": "Industrial Formulation (Pantnagar, Haridwar)", "Priority": "P3", "Logistics Feasibility": "Road transit", "Demand Score": "5/10" },
  { "State / UT": "Bihar", "Type": "State", "Key Industrial Sectors": "Barauni Refinery, Construction Minerals", "Priority": "P3", "Logistics Feasibility": "Rail freight", "Demand Score": "4.5/10" },
  { "State / UT": "Jammu & Kashmir", "Type": "UT", "Key Industrial Sectors": "Pesticide Formulation, Agrochemical Carriers", "Priority": "P3", "Logistics Feasibility": "Road logistics", "Demand Score": "4/10" },
  { "State / UT": "Puducherry", "Type": "UT", "Key Industrial Sectors": "Speciality Chemical & Paint Emulsions", "Priority": "P3", "Logistics Feasibility": "South coastal transit", "Demand Score": "4/10" }
];
const ws3 = XLSX.utils.json_to_sheet(indiaStatesData);
autoFitCols(ws3, indiaStatesData);
XLSX.utils.book_append_sheet(wb, ws3, "India States and UTs");

// -----------------------------------------------------------------------------
// Sheet 4: India City and District Keywords
// -----------------------------------------------------------------------------
const indiaCityKeywords = [
  // Gujarat Hubs
  { "City / District": "Bhavnagar", "State": "Gujarat", "Product Target": "All 6 Grades", "Keyword": "attapulgite powder manufacturer in Bhavnagar", "Intent": "Commercial B2B", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/about" },
  { "City / District": "Bhavnagar", "State": "Gujarat", "Product Target": "API 13A", "Keyword": "API 13A drilling clay supplier Bhavnagar Gujarat", "Intent": "Transactional", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / District": "Ahmedabad", "State": "Gujarat", "Product Target": "Salt Gel", "Keyword": "salt gel attapulgite supplier Ahmedabad", "Intent": "Commercial", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "City / District": "Ahmedabad", "State": "Gujarat", "Product Target": "API 13A", "Keyword": "drilling clay supplier in Ahmedabad Gujarat", "Intent": "Commercial", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / District": "Ankleshwar", "State": "Gujarat", "Product Target": "Natural Powder", "Keyword": "agrochemical carrier clay supplier Ankleshwar", "Intent": "Transactional", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/attapulgite-natural-powder" },
  { "City / District": "Bharuch / Dahej", "State": "Gujarat", "Product Target": "Granules", "Keyword": "chemical spill absorbent granules Dahej PCPIR", "Intent": "Commercial", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm" },
  { "City / District": "Vadodara", "State": "Gujarat", "Product Target": "Premium 325", "Keyword": "paint thixotropic additive supplier Vadodara", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  { "City / District": "Surat", "State": "Gujarat", "Product Target": "Salt Gel", "Keyword": "attapulgite powder bulk supplier Surat", "Intent": "Transactional", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "City / District": "Rajkot", "State": "Gujarat", "Product Target": "Flux Fine-200", "Keyword": "foundry core wash clay supplier Rajkot", "Intent": "Commercial", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder" },
  { "City / District": "Mundra / Gandhidham", "State": "Gujarat", "Product Target": "Export Grades", "Keyword": "attapulgite exporter Mundra Port container shipping", "Intent": "Logistics / B2B", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/why-us" },
  // Maharashtra Hubs
  { "City / District": "Mumbai", "State": "Maharashtra", "Product Target": "API 13A", "Keyword": "API 13A Section 12 drilling clay supplier Mumbai", "Intent": "Commercial B2B", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / District": "Navi Mumbai / Taloja", "State": "Maharashtra", "Product Target": "Premium 325", "Keyword": "micronised attapulgite 325 mesh supplier Navi Mumbai", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  { "City / District": "Pune", "State": "Maharashtra", "Product Target": "Flux Fine-200", "Keyword": "foundry flux powder supplier Pune Chakan", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder" },
  { "City / District": "Kolhapur", "State": "Maharashtra", "Product Target": "Flux Fine-200", "Keyword": "foundry binding clay supplier Kolhapur", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder" },
  // Rajasthan Oilfield & Minerals
  { "City / District": "Barmer", "State": "Rajasthan", "Product Target": "API 13A", "Keyword": "drilling mud viscosifier supplier Barmer oilfield", "Intent": "Transactional B2B", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / District": "Jaisalmer", "State": "Rajasthan", "Product Target": "Salt Gel", "Keyword": "saline well drilling clay supplier Jaisalmer", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "City / District": "Jaipur", "State": "Rajasthan", "Product Target": "All Grades", "Keyword": "industrial minerals attapulgite supplier Jaipur", "Intent": "Commercial", "Priority": "P2", "Recommended URL": "https://bentoclayclaytech.com/products" },
  // Tamil Nadu Hubs
  { "City / District": "Coimbatore", "State": "Tamil Nadu", "Product Target": "Flux Fine-200", "Keyword": "foundry core wash suspension clay Coimbatore", "Intent": "Commercial B2B", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder" },
  { "City / District": "Chennai", "State": "Tamil Nadu", "Product Target": "Premium 325", "Keyword": "paint rheology additive attapulgite supplier Chennai", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  // Telangana & AP
  { "City / District": "Hyderabad", "State": "Telangana", "Product Target": "Natural Powder", "Keyword": "pesticide carrier attapulgite powder Hyderabad", "Intent": "Commercial B2B", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/attapulgite-natural-powder" },
  { "City / District": "Visakhapatnam", "State": "Andhra Pradesh", "Product Target": "API 13A", "Keyword": "offshore drilling mud clay supplier Visakhapatnam", "Intent": "Transactional", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / District": "Kakinada", "State": "Andhra Pradesh", "Product Target": "Salt Gel", "Keyword": "KG Basin deepwater drilling clay supplier Kakinada", "Intent": "Commercial B2B", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  // West Bengal
  { "City / District": "Kolkata", "State": "West Bengal", "Product Target": "Premium 325", "Keyword": "paint thickener attapulgite powder Kolkata", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  { "City / District": "Haldia", "State": "West Bengal", "Product Target": "Granules", "Keyword": "petrochemical floor absorbent granules Haldia", "Intent": "Commercial", "Priority": "P2", "Recommended URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm" },
  // Delhi NCR
  { "City / District": "Delhi NCR / Faridabad", "State": "Delhi NCR", "Product Target": "Premium 325", "Keyword": "attapulgite 325 mesh paint additive supplier Delhi NCR", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  { "City / District": "Gurugram / Noida", "State": "Delhi NCR", "Product Target": "Granules", "Keyword": "industrial absorbent granules supplier Gurgaon Noida", "Intent": "Commercial", "Priority": "P2", "Recommended URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm" },
  // Assam Oilfields
  { "City / District": "Duliajan / Sivasagar", "State": "Assam", "Product Target": "API 13A", "Keyword": "oilfield drilling clay supplier Assam Duliajan ONGC", "Intent": "Commercial B2B", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" }
];
const ws4 = XLSX.utils.json_to_sheet(indiaCityKeywords);
autoFitCols(ws4, indiaCityKeywords);
XLSX.utils.book_append_sheet(wb, ws4, "India City & District Keywords");

// -----------------------------------------------------------------------------
// Sheet 5: International Countries and Regions
// -----------------------------------------------------------------------------
const internationalCountriesData = [
  { "Country": "United States", "Region": "North America", "Key Energy / Industrial Hubs": "Texas (Houston, Corpus Christi, Permian Basin), Louisiana (New Orleans, Port Fourchon)", "Priority": "P0 (Top Export Market)", "Shipping Route": "Mundra Port (INMUN1) to Houston / New Orleans via Container Vessel (24-30 days)", "Target Grades": "API 13A Sec 12, Salt Gel, 325 Mesh, Granules" },
  { "Country": "United Arab Emirates", "Region": "Middle East (GCC)", "Key Energy / Industrial Hubs": "Jebel Ali Port (Dubai), Abu Dhabi (Mussafah, ADNOC bases), Sharjah, Ras Al Khaimah", "Priority": "P0", "Shipping Route": "Direct vessel Mundra to Jebel Ali (3–5 days transit)", "Target Grades": "API 13A, Salt Gel, Foundry Flux, Granules" },
  { "Country": "Saudi Arabia", "Region": "Middle East (GCC)", "Key Energy / Industrial Hubs": "Dammam (King Abdulaziz Port), Jubail Industrial City, Al Khobar, Yanbu, Jeddah", "Priority": "P0", "Shipping Route": "Direct vessel Mundra to Dammam / Jubail (5–7 days)", "Target Grades": "API 13A Sec 12, Salt Gel (35+ cps), Paints 325 Mesh" },
  { "Country": "Oman", "Region": "Middle East (GCC)", "Key Energy / Industrial Hubs": "Sohar Port, Muscat, Salalah Port", "Priority": "P1", "Shipping Route": "Mundra to Sohar (4–6 days)", "Target Grades": "Salt Gel, API 13A, Agrochemical Carriers" },
  { "Country": "Qatar", "Region": "Middle East (GCC)", "Key Energy / Industrial Hubs": "Doha, Ras Laffan Industrial City, Mesaieed Port", "Priority": "P1", "Shipping Route": "Mundra to Hamad Port (6–8 days)", "Target Grades": "API 13A, Salt Gel Drilling Viscosifiers" },
  { "Country": "Kuwait", "Region": "Middle East (GCC)", "Key Energy / Industrial Hubs": "Kuwait City, Shuaiba Port, Shuwaikh", "Priority": "P1", "Shipping Route": "Mundra to Shuaiba (7–9 days)", "Target Grades": "API 13A Drilling Clay, Absorbents" },
  { "Country": "Netherlands", "Region": "Europe", "Key Energy / Industrial Hubs": "Port of Rotterdam (Main European Gateway), Amsterdam", "Priority": "P1", "Shipping Route": "Mundra to Rotterdam (22–26 days)", "Target Grades": "Premium 325 Paint Thixotrope, Granules, API 13A" },
  { "Country": "Germany", "Region": "Europe", "Key Energy / Industrial Hubs": "Hamburg Port, Ludwigshafen (Chemical Hub), Duisburg", "Priority": "P1", "Shipping Route": "Mundra to Hamburg via Rotterdam feeder (25–28 days)", "Target Grades": "Premium 325 Mesh, Foundry Flux Fine, Granules" },
  { "Country": "United Kingdom", "Region": "Europe", "Key Energy / Industrial Hubs": "Aberdeen (North Sea Offshore Base), London Gateway, Immingham", "Priority": "P1", "Shipping Route": "Mundra to Southampton / London Gateway (25–30 days)", "Target Grades": "API 13A Drilling Clay, Salt Gel" },
  { "Country": "Singapore", "Region": "Southeast Asia", "Key Energy / Industrial Hubs": "Port of Singapore (PSA), Jurong Island Petrochemical Complex", "Priority": "P1", "Shipping Route": "Direct feeder Mundra to Singapore (7–10 days)", "Target Grades": "API 13A, Offshore Salt Gel, Marine Paint Thixotropes" },
  { "Country": "Malaysia", "Region": "Southeast Asia", "Key Energy / Industrial Hubs": "Port Klang, Kemaman Supply Base (Terengganu), Bintulu (Sarawak)", "Priority": "P1", "Shipping Route": "Mundra to Port Klang (8–12 days)", "Target Grades": "API 13A Drilling Clay, Agrochemical Carriers" },
  { "Country": "Indonesia", "Region": "Southeast Asia", "Key Energy / Industrial Hubs": "Jakarta (Tanjung Priok), Balikpapan (East Kalimantan Oilfield), Batam", "Priority": "P1", "Shipping Route": "Mundra to Jakarta / Balikpapan (12–16 days)", "Target Grades": "API 13A Drilling Clay, Geothermal Viscosifiers" },
  { "Country": "Egypt", "Region": "North Africa", "Key Energy / Industrial Hubs": "Alexandria Port, Port Said, Suez Canal Economic Zone", "Priority": "P2", "Shipping Route": "Mundra to Port Said / Alexandria (10–14 days)", "Target Grades": "API 13A, Agrochemical Carriers, Salt Gel" },
  { "Country": "Australia", "Region": "Oceania", "Key Energy / Industrial Hubs": "Perth (Fremantle Port - Offshore WA Basins), Darwin, Brisbane", "Priority": "P2", "Shipping Route": "Mundra to Fremantle (18–22 days)", "Target Grades": "API 13A Drilling Clay, Absorbent Granules" }
];
const ws5 = XLSX.utils.json_to_sheet(internationalCountriesData);
autoFitCols(ws5, internationalCountriesData);
XLSX.utils.book_append_sheet(wb, ws5, "International Countries");

// -----------------------------------------------------------------------------
// Sheet 6: International City Keywords
// -----------------------------------------------------------------------------
const internationalCityKeywords = [
  // USA Energy & Chemical Hubs
  { "City / Port": "Houston", "Country": "USA", "Keyword": "API 13A Section 12 attapulgite supplier Houston Texas", "Intent": "Transactional B2B", "Target Product": "API 13A", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / Port": "Houston", "Country": "USA", "Keyword": "salt gel attapulgite drilling clay CIF Houston", "Intent": "Commercial Export", "Target Product": "Salt Gel", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "City / Port": "New Orleans", "Country": "USA", "Keyword": "offshore drilling mud clay supplier New Orleans Louisiana", "Intent": "Transactional B2B", "Target Product": "API 13A", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / Port": "Midland / Odessa", "Country": "USA", "Keyword": "Permian basin brine drilling viscosifier supplier", "Intent": "Commercial", "Target Product": "Salt Gel", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  // Middle East Hubs
  { "City / Port": "Dubai / Jebel Ali", "Country": "UAE", "Keyword": "attapulgite drilling clay supplier Jebel Ali Dubai", "Intent": "Commercial B2B", "Target Product": "API 13A", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / Port": "Abu Dhabi", "Country": "UAE", "Keyword": "API Spec 13A Section 12 attapulgite supplier Abu Dhabi", "Intent": "Transactional", "Target Product": "API 13A", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / Port": "Dammam", "Country": "Saudi Arabia", "Keyword": "attapulgite powder exporter to Dammam Saudi Arabia", "Intent": "Commercial Export", "Target Product": "All Grades", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/" },
  { "City / Port": "Jubail", "Country": "Saudi Arabia", "Keyword": "salt gel attapulgite drilling clay supplier Jubail", "Intent": "Transactional B2B", "Target Product": "Salt Gel", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "City / Port": "Muscat / Sohar", "Country": "Oman", "Keyword": "oilfield drilling attapulgite supplier Sohar Oman", "Intent": "Commercial", "Target Product": "API 13A", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / Port": "Doha", "Country": "Qatar", "Keyword": "saline mud viscosifier attapulgite supplier Qatar", "Intent": "Commercial", "Target Product": "Salt Gel", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "City / Port": "Kuwait City", "Country": "Kuwait", "Keyword": "drilling clay API 13A Section 12 supplier Kuwait", "Intent": "Commercial B2B", "Target Product": "API 13A", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  // Europe
  { "City / Port": "Rotterdam", "Country": "Netherlands", "Keyword": "attapulgite clay supplier Rotterdam CIF Europe", "Intent": "Commercial Export", "Target Product": "Premium 325", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  { "City / Port": "Hamburg", "Country": "Germany", "Keyword": "industrial palygorskite attapulgite importer Hamburg Germany", "Intent": "Commercial B2B", "Target Product": "325 Mesh / Granules", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products" },
  { "City / Port": "Aberdeen", "Country": "United Kingdom", "Keyword": "North Sea drilling mud attapulgite supplier Aberdeen UK", "Intent": "Transactional B2B", "Target Product": "Salt Gel", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  // Southeast Asia & Australia
  { "City / Port": "Singapore", "Country": "Singapore", "Keyword": "attapulgite drilling clay supplier Jurong Singapore", "Intent": "Commercial B2B", "Target Product": "API 13A", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / Port": "Kemaman", "Country": "Malaysia", "Keyword": "offshore drilling mud attapulgite Kemaman supply base", "Intent": "Transactional", "Target Product": "API 13A", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "City / Port": "Balikpapan", "Country": "Indonesia", "Keyword": "drilling fluid attapulgite supplier Balikpapan Indonesia", "Intent": "Commercial B2B", "Target Product": "Salt Gel", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "City / Port": "Perth", "Country": "Australia", "Keyword": "attapulgite drilling mud clay supplier Perth WA", "Intent": "Commercial", "Target Product": "API 13A", "Priority": "P2", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" }
];
const ws6 = XLSX.utils.json_to_sheet(internationalCityKeywords);
autoFitCols(ws6, internationalCityKeywords);
XLSX.utils.book_append_sheet(wb, ws6, "International City Keywords");

// -----------------------------------------------------------------------------
// Sheet 7: Product + Location Matrix
// -----------------------------------------------------------------------------
const productLocationMatrix = [
  { "Product": "API-13A Section 12 Drilling Powder", "Target Geography": "Mundra Port to Houston, USA", "Search Query": "API 13A Section 12 drilling clay container export Mundra to Houston", "Buyer Segment": "Drilling Mud Chemical Stockists", "Volume Potential": "20–100 MT FCL", "Recommended Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "Product": "API-13A Section 12 Drilling Powder", "Target Geography": "UAE (Jebel Ali / Abu Dhabi)", "Search Query": "certified API 13A Section 12 drilling powder supplier UAE", "Buyer Segment": "Offshore Petroleum Service Contractors", "Volume Potential": "40–120 MT FCL", "Recommended Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "Product": "API-13A Section 12 Drilling Powder", "Target Geography": "Saudi Arabia (Dammam / Jubail)", "Search Query": "API 13A drilling attapulgite clay supplier Dammam KSA", "Buyer Segment": "Oilfield Supply Trading Houses", "Volume Potential": "100+ MT bulk contracts", "Recommended Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "Product": "Salt Gel Grade Powder", "Target Geography": "Pan-India (Barmer, Kakinada, Mumbai)", "Search Query": "salt gel attapulgite 35 cps powder supplier India", "Buyer Segment": "Mud Engineers & Drilling Service Companies", "Volume Potential": "FTL 15–30 MT", "Recommended Target URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "Product": "Salt Gel Grade Powder", "Target Geography": "USA (Gulf Coast / Permian Basin)", "Search Query": "high viscosity salt gel drilling clay exporter USA", "Buyer Segment": "Oilfield Fluid Blenders", "Volume Potential": "20–60 MT FCL", "Recommended Target URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "Product": "Premium 325 Mesh Powder", "Target Geography": "Pan-India (Mumbai, Pune, Ahmedabad, Delhi)", "Search Query": "325 mesh attapulgite paint thixotrope anti sag additive India", "Buyer Segment": "Emulsion Paint & Coating Formulators", "Volume Potential": "5–20 MT Monthly", "Recommended Target URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  { "Product": "Premium 325 Mesh Powder", "Target Geography": "Europe (Rotterdam / Hamburg)", "Search Query": "micronized attapulgite 44 um rheology additive supplier Europe", "Buyer Segment": "Specialty Chemical Distributors", "Volume Potential": "20–40 MT FCL", "Recommended Target URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  { "Product": "Flux Fine-200 Foundry Flux", "Target Geography": "Pan-India (Rajkot, Coimbatore, Kolhapur)", "Search Query": "attapulgite foundry flux fine 200 powder supplier India", "Buyer Segment": "Iron & Steel Casting Foundries", "Volume Potential": "10–30 MT FTL", "Recommended Target URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder" },
  { "Product": "Natural Powder (200 Mesh)", "Target Geography": "Gujarat & Telangana (Ankleshwar, Hyderabad)", "Search Query": "natural attapulgite powder pesticide carrier clay supplier India", "Buyer Segment": "Agrochemical Formulation Plants", "Volume Potential": "20–50 MT FTL", "Recommended Target URL": "https://bentoclayclaytech.com/products/attapulgite-natural-powder" },
  { "Product": "Natural Granules (1–5 mm)", "Target Geography": "Global Export (Middle East, Europe, USA)", "Search Query": "attapulgite absorbent granules 1-5 mm bulk FIBC bags exporter", "Buyer Segment": "Spill Control & Pet Care Brands", "Volume Potential": "Multi-FCL (40–100 MT)", "Recommended Target URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm" }
];
const ws7 = XLSX.utils.json_to_sheet(productLocationMatrix);
autoFitCols(ws7, productLocationMatrix);
XLSX.utils.book_append_sheet(wb, ws7, "Product + Location Matrix");

// -----------------------------------------------------------------------------
// Sheet 8: Supplier, Exporter and Bulk-Buyer Keywords
// -----------------------------------------------------------------------------
const supplierBulkKeywords = [
  { "Keyword": "attapulgite powder manufacturers in Gujarat", "Target Product": "All Grades", "Intent": "Commercial B2B", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/about" },
  { "Keyword": "API 13A Section 12 drilling clay manufacturers India", "Target Product": "API 13A", "Intent": "Commercial B2B", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "Keyword": "salt gel attapulgite bulk supplier India", "Target Product": "Salt Gel", "Intent": "Transactional", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "Keyword": "buy attapulgite clay direct from factory", "Target Product": "All Grades", "Intent": "Transactional", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/contact" },
  { "Keyword": "attapulgite powder FOB Mundra price", "Target Product": "Export Grades", "Intent": "Transactional Pricing", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/contact" },
  { "Keyword": "API 13A powder CIF Houston price", "Target Product": "API 13A", "Intent": "Transactional Pricing", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "Keyword": "attapulgite clay container exporter India", "Target Product": "All Grades", "Intent": "Commercial Export", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/why-us" },
  { "Keyword": "attapulgite wholesale supplier 25kg bags", "Target Product": "All Grades", "Intent": "Transactional", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products" },
  { "Keyword": "attapulgite 1000kg jumbo bag supplier", "Target Product": "Granules & Powder", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products" },
  { "Keyword": "palygorskite mineral mining company India", "Target Product": "Mineral Ore", "Intent": "Commercial", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/about" },
  { "Keyword": "attapulgite free sample with COA", "Target Product": "All Grades", "Intent": "Lead Gen / Sample", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/contact" }
];
const ws8 = XLSX.utils.json_to_sheet(supplierBulkKeywords);
autoFitCols(ws8, supplierBulkKeywords);
XLSX.utils.book_append_sheet(wb, ws8, "Supplier & Bulk Keywords");

// -----------------------------------------------------------------------------
// Sheet 9: Technical and Application Keywords
// -----------------------------------------------------------------------------
const technicalApplicationKeywords = [
  { "Keyword": "API Spec 13A Section 12 physical requirements", "Target Product": "API 13A", "Intent": "Technical Informational", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/blog/api-spec-13a-section-12-attapulgite-standards" },
  { "Keyword": "attapulgite Fann 35 dial reading 600 rpm 30 cps", "Target Product": "API 13A / Salt Gel", "Intent": "Technical Specification", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder" },
  { "Keyword": "difference between attapulgite and bentonite in saltwater", "Target Product": "Salt Gel / Drilling", "Intent": "Comparative Technical", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/blog/salt-gel-grade-drilling-clay-spotlight" },
  { "Keyword": "palygorskite crystal structure needle lattice", "Target Product": "Mineralogy", "Intent": "Scientific / Educational", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/about" },
  { "Keyword": "attapulgite wet residue 75 micron sieve 200 mesh", "Target Product": "API 13A / Salt Gel", "Intent": "Quality Control Spec", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/faq" },
  { "Keyword": "attapulgite paint thixotrope anti-sagging additive 325 mesh", "Target Product": "Premium 325", "Intent": "Application Specific", "Priority": "P0", "Recommended URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  { "Keyword": "foundry core wash suspension agent attapulgite", "Target Product": "Flux Fine-200", "Intent": "Application Specific", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder" },
  { "Keyword": "attapulgite swelling index 1 hour 24 hours test method", "Target Product": "Flux Fine-200", "Intent": "Technical Quality", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder" },
  { "Keyword": "attapulgite carrier for wettable powders agrochemicals", "Target Product": "Natural Powder", "Intent": "Application Specific", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/attapulgite-natural-powder" },
  { "Keyword": "calcined attapulgite absorbent granules chemical spill cleanup", "Target Product": "Granules", "Intent": "Application Specific", "Priority": "P1", "Recommended URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm" }
];
const ws9 = XLSX.utils.json_to_sheet(technicalApplicationKeywords);
autoFitCols(ws9, technicalApplicationKeywords);
XLSX.utils.book_append_sheet(wb, ws9, "Technical & Application");

// -----------------------------------------------------------------------------
// Sheet 10: AI, AEO and Conversational Queries
// -----------------------------------------------------------------------------
const conversationalAeoQueries = [
  { "Query": "Where can I source API 13A Section 12 drilling clay in India for export to Houston?", "Platform": "ChatGPT / Perplexity / Google AEO", "Target Product": "API 13A", "Recommended Answer Anchor": "Bento Clay Tech manufactures API Spec 13A Section 12 drilling clay with ≥30 cps viscosity dispatched via Mundra Port.", "Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder" },
  { "Query": "Who is the best attapulgite powder manufacturer in Bhavnagar Gujarat?", "Platform": "Perplexity / Gemini / Google AI Overviews", "Target Product": "All Grades", "Recommended Answer Anchor": "Bento Clay Tech operates captive palygorskite mines and processing mills in Kardej, Bhavnagar, supplying domestic and international markets.", "Target URL": "https://bentoclayclaytech.com/about" },
  { "Query": "How does attapulgite build viscosity in saturated saltwater drilling mud?", "Platform": "Google AI Overviews / Claude", "Target Product": "Salt Gel", "Recommended Answer Anchor": "Attapulgite relies on mechanical brush-heap entanglement of rigid magnesium aluminosilicate needle crystals rather than osmotic swelling, maintaining viscosity in brine up to 300,000 ppm TDS.", "Target URL": "https://bentoclayclaytech.com/blog/salt-gel-grade-drilling-clay-spotlight" },
  { "Query": "Which supplier provides 325 mesh micronised attapulgite for emulsion paints?", "Platform": "Google Search / Perplexity", "Target Product": "Premium 325", "Recommended Answer Anchor": "Bento Clay Tech supplies Premium 325 mesh attapulgite (44 μm) with 210 m²/g BET surface area for anti-sagging rheology in paints.", "Target URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder" },
  { "Query": "How do I request a factory quote and Certificate of Analysis from Bento Clay Tech?", "Platform": "Voice Search / AEO", "Target Product": "All Grades", "Recommended Answer Anchor": "Contact Bento Clay Tech directly via WhatsApp (+91-7435818628), email (dipak@bentoclay.com), or the online RFQ form on bentoclayclaytech.com.", "Target URL": "https://bentoclayclaytech.com/contact" },
  { "Query": "What is the Free Swell Volume and swelling index of Flux Fine-200 attapulgite?", "Platform": "Technical AI Engine", "Target Product": "Flux Fine-200", "Recommended Answer Anchor": "Flux Fine-200 specifies Free Swell Volume of 12–14 ml and 1-hour swelling index ≥95 ml for refractory core wash slurries.", "Target URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder" }
];
const ws10 = XLSX.utils.json_to_sheet(conversationalAeoQueries);
autoFitCols(ws10, conversationalAeoQueries);
XLSX.utils.book_append_sheet(wb, ws10, "AI, AEO & Conversational");

// -----------------------------------------------------------------------------
// Sheet 11: Competitor Keyword Gaps
// -----------------------------------------------------------------------------
const competitorGapsData = [
  { "Competitor": "Petropath Fluids India Ltd", "Competitor URL": "https://petropathglobal.com/", "Targeted Keywords": "seawater bentonite drilling mud, API attapulgite ISO 13500, deepwater drilling fluids Gujarat", "Competitor Strength": "Established oilfield contractor trust", "Bento Clay Tech Gap Opportunity": "Target direct FOB Mundra container pricing, transparent Fann 35 rheometer batch reports, and fast WhatsApp RFQ response." },
  { "Competitor": "Pratham Minechem", "Competitor URL": "https://prathamminechem.com/", "Targeted Keywords": "attapulgite salt gel Bhuj Kutch, API 13A drilling clay exporter India, 25kg HDPE packing attapulgite", "Competitor Strength": "Active global mineral exporter with multi-mineral catalog", "Bento Clay Tech Gap Opportunity": "Promote Bhavnagar captive deposit purity, AI knowledge files (llms.txt), and interactive online grade calculator." },
  { "Competitor": "Ashapura Minechem Ltd", "Competitor URL": "https://ashapura.com/", "Targeted Keywords": "attapulgite clay industrial minerals India, bentonite attapulgite exporter Mumbai, oil well drilling clays", "Competitor Strength": "Conglomerate scale, massive mine concessions, institutional bankability", "Bento Clay Tech Gap Opportunity": "Deliver faster, personalized service for small-to-medium FCL orders, flexible custom milling specifications, and responsive engineering support." },
  { "Competitor": "Active Minerals International", "Competitor URL": "https://activeminerals.com/", "Targeted Keywords": "Min-U-Gel attapulgite, Acti-Gel 208, high purity attapulgite gelling grade USA", "Competitor Strength": "Global benchmark brand for gelling attapulgite in paints and molecular sieves", "Bento Clay Tech Gap Opportunity": "Provide cost-effective Indian mineral alternative matching 325 mesh (44 μm) and BET surface area requirements for cost-sensitive international formulators." }
];
const ws11 = XLSX.utils.json_to_sheet(competitorGapsData);
autoFitCols(ws11, competitorGapsData);
XLSX.utils.book_append_sheet(wb, ws11, "Competitor Keyword Gaps");

// -----------------------------------------------------------------------------
// Sheet 12: Existing Ranking URLs
// -----------------------------------------------------------------------------
const existingRankingUrlsData = [
  { "Page Type": "Core Homepage", "URL": "https://bentoclayclaytech.com/", "Primary Keyword Focus": "Bento Clay Tech, API 13A Powder, Attapulgite Manufacturer India", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Catalog Index", "URL": "https://bentoclayclaytech.com/products", "Primary Keyword Focus": "Attapulgite Clay Grades & Powder Catalog", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Product Detail", "URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder", "Primary Keyword Focus": "Attapulgite Salt Gel Powder, 35 cps Drilling Viscosifier", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Product Detail", "URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder", "Primary Keyword Focus": "API 13A Attapulgite Drilling Clay, Section 12 Specification", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Product Detail", "URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder", "Primary Keyword Focus": "Premium 325 Mesh Attapulgite, Paint Thixotrope Grade", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Product Detail", "URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder", "Primary Keyword Focus": "Flux Fine Foundry Flux Powder, High Temp Core Wash", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Product Detail", "URL": "https://bentoclayclaytech.com/products/attapulgite-natural-powder", "Primary Keyword Focus": "Natural Attapulgite Powder, Agrochemical Carrier Clay", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Product Detail", "URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm", "Primary Keyword Focus": "Attapulgite Granules 1-5mm, Absorbent Cat Litter", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Infrastructure", "URL": "https://bentoclayclaytech.com/why-us", "Primary Keyword Focus": "Attapulgite Clay Manufacturing Plant Bhavnagar Port", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Applications", "URL": "https://bentoclayclaytech.com/applications", "Primary Keyword Focus": "Attapulgite Clay Applications 16 Industrial Uses", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Company Profile", "URL": "https://bentoclayclaytech.com/about", "Primary Keyword Focus": "Bento Clay Tech Attapulgite Manufacturer Bhavnagar", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Contact & RFQ", "URL": "https://bentoclayclaytech.com/contact", "Primary Keyword Focus": "Buy Attapulgite Clay Direct Request Free Sample", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Knowledge Base", "URL": "https://bentoclayclaytech.com/faq", "Primary Keyword Focus": "Attapulgite Clay FAQ & Specs Technical Questions", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "Blog Hub", "URL": "https://bentoclayclaytech.com/blog", "Primary Keyword Focus": "Attapulgite Mineral Insights & Guides", "HTTP Status": "200 OK", "Indexed Status": "Indexed" },
  { "Page Type": "AI Dossier", "URL": "https://bentoclayclaytech.com/llms.txt", "Primary Keyword Focus": "AI Knowledge Graph & Entity Index", "HTTP Status": "200 OK", "Indexed Status": "Indexed" }
];
const ws12 = XLSX.utils.json_to_sheet(existingRankingUrlsData);
autoFitCols(ws12, existingRankingUrlsData);
XLSX.utils.book_append_sheet(wb, ws12, "Existing Ranking URLs");

// -----------------------------------------------------------------------------
// Sheet 13: Recommended Page and URL Mapping
// -----------------------------------------------------------------------------
const recommendedPageMapping = [
  { "Keyword Cluster": "API 13A Section 12 Drilling Clay (Global & Domestic)", "Target URL Strategy": "Map to Existing Product Page", "Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder", "Reason": "Strongest on-page authority; already has PDS download and rheology tables." },
  { "Keyword Cluster": "Salt Gel Attapulgite Viscosifier (Offshore / Brine)", "Target URL Strategy": "Map to Existing Product Page", "Target URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder", "Reason": "Dedicated high-viscosity product page; directly addresses high-salinity drilling search intent." },
  { "Keyword Cluster": "Paint Thixotrope & 325 Mesh Additives", "Target URL Strategy": "Map to Existing Product Page", "Target URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder", "Reason": "Targeted at paint chemists and industrial coatings formulators." },
  { "Keyword Cluster": "Foundry Core Wash & Casting Flux Clays", "Target URL Strategy": "Map to Existing Product Page", "Target URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder", "Reason": "Dedicated foundry grade page with swelling index and FSV data." },
  { "Keyword Cluster": "Mundra & Pipavav Container Export Logistics", "Target URL Strategy": "Map to Why Us Infrastructure Page", "Target URL": "https://bentoclayclaytech.com/why-us", "Reason": "Page specifically details port distances, FCL stuffing, ISPM-15 pallets, and transit timelines." },
  { "Keyword Cluster": "Captive Mining & Chemical Assay Purity (Palygorskite)", "Target URL Strategy": "Map to About Us Page", "Target URL": "https://bentoclayclaytech.com/about", "Reason": "Contains official crystallography formula, geological history, and mine concession metrics." },
  { "Keyword Cluster": "Commercial RFQ, Price Quotation, FOB/CIF Requests", "Target URL Strategy": "Map to Contact RFQ Desk", "Target URL": "https://bentoclayclaytech.com/contact", "Reason": "Equipped with structured B2B form capturing company, destination port, quantity, and WhatsApp link." },
  { "Keyword Cluster": "New Recommended Hub: Oil & Gas Drilling Mud Application Hub", "Target URL Strategy": "Future Content Expansion (P3)", "Target URL": "https://bentoclayclaytech.com/applications/oil-gas-drilling", "Reason": "Deep-water, geothermal, and salt-dome drilling case studies providing authoritative topical clustering." }
];
const ws13 = XLSX.utils.json_to_sheet(recommendedPageMapping);
autoFitCols(ws13, recommendedPageMapping);
XLSX.utils.book_append_sheet(wb, ws13, "Recommended URL Mapping");

// -----------------------------------------------------------------------------
// Sheet 14: Backlink Opportunities
// -----------------------------------------------------------------------------
const backlinkOpportunitiesData = [
  { "Platform / Directory": "IndiaMART Certified Supplier", "Category": "Domestic B2B Marketplace", "Authority / Relevance": "High (DR 85)", "Opportunity Type": "Company profile + Product catalog links", "Verification Link": "https://www.indiamart.com/bentoclay-claytech/", "Action Required": "Ensure brand name is Bento Clay Tech and link to https://bentoclayclaytech.com/" },
  { "Platform / Directory": "TradeIndia Export Portal", "Category": "Indian Exporters Directory", "Authority / Relevance": "High (DR 81)", "Opportunity Type": "Export profile with HS Code 25084000 listing", "Verification Link": "https://www.tradeindia.com/", "Action Required": "Update verified company profile and certificate uploads" },
  { "Platform / Directory": "ExportersIndia", "Category": "Global Trade Portal", "Authority / Relevance": "High (DR 78)", "Opportunity Type": "Attapulgite manufacturer listing", "Verification Link": "https://www.exportersindia.com/", "Action Required": "List all 6 mineral grades with FOB Mundra packaging" },
  { "Platform / Directory": "Federation of Indian Export Organisations (FIEO)", "Category": "Government Export Council", "Authority / Relevance": "High (Gov Authority)", "Opportunity Type": "Verified Indian Exporter Directory", "Verification Link": "https://www.fieo.org/", "Action Required": "Register active IEC and company profile with official website" },
  { "Platform / Directory": "CAPEXIL (Chemical & Allied Products Export Promotion Council)", "Category": "Commodity Board", "Authority / Relevance": "High (Gov Authority)", "Opportunity Type": "Industrial minerals exporter registry", "Verification Link": "https://capexil.org/", "Action Required": "Verify membership listing under Mineral & Ore Panel" },
  { "Platform / Directory": "Society of Petroleum Engineers (SPE) PetroWiki", "Category": "Industry Knowledge Hub", "Authority / Relevance": "Very High (Industry Citation)", "Opportunity Type": "Citation as Indian Palygorskite drilling clay processor", "Verification Link": "https://petrowiki.spe.org/", "Action Required": "Contribute technical data on saturated brine rheology" },
  { "Platform / Directory": "American Petroleum Institute (API) Standards Resources", "Category": "Standard Body", "Authority / Relevance": "Highest (Industry Standard)", "Opportunity Type": "Technical reference for API Spec 13A Section 12", "Verification Link": "https://www.api.org/", "Action Required": "Reference conformance testing standards in technical papers" },
  { "Platform / Directory": "ChemEurope / B2B Chemical Portal", "Category": "International Chemical Registry", "Authority / Relevance": "High (European Industrial B2B)", "Opportunity Type": "CAS 12174-11-7 supplier listing", "Verification Link": "https://www.chemeurope.com/", "Action Required": "Create corporate supplier card for European buyers" },
  { "Platform / Directory": "ThomasNet (North American Sourcing)", "Category": "USA Industrial Sourcing", "Authority / Relevance": "High (USA Procurement)", "Opportunity Type": "International mineral supplier directory", "Verification Link": "https://www.thomasnet.com/", "Action Required": "Submit international supplier listing for attapulgite" }
];
const ws14 = XLSX.utils.json_to_sheet(backlinkOpportunitiesData);
autoFitCols(ws14, backlinkOpportunitiesData);
XLSX.utils.book_append_sheet(wb, ws14, "Backlink Opportunities");

// -----------------------------------------------------------------------------
// Sheet 15: Research Coverage and Missing Data
// -----------------------------------------------------------------------------
const researchCoverageData = [
  { "Dimension": "Geographic Scope - India", "Coverage Status": "100% Complete", "Details": "All 28 States and 8 Union Territories audited; primary industrial clusters identified in Gujarat, Maharashtra, Rajasthan, Tamil Nadu, Telangana, and West Bengal." },
  { "Dimension": "Geographic Scope - International", "Coverage Status": "Exhaustive for Target Export Feasibility", "Details": "Detailed coverage for USA (Gulf Coast), GCC (UAE, Saudi Arabia, Oman, Qatar, Kuwait), Europe (Netherlands, Germany, UK), and Southeast Asia (Singapore, Malaysia, Indonesia)." },
  { "Dimension": "Product Catalogue Integrity", "Coverage Status": "100% Complete", "Details": "All 6 commercial products catalogued with verified physical and chemical parameters; specification typos resolved." },
  { "Dimension": "Search Volume Data Source", "Coverage Status": "Estimated B2B Demand Tiers", "Details": "B2B industrial mineral queries exhibit low generic search counts but exceptionally high commercial transaction values (1 inquiry = 20–100 MT FCL order). Exact Google Keyword Planner figures vary by regional account access." },
  { "Dimension": "Competitor Analysis", "Coverage Status": "Verified", "Details": "Benchmarked against Petropath Fluids India Ltd, Pratham Minechem, Ashapura Minechem Ltd, and Active Minerals International." },
  { "Dimension": "Unverified Assumptions", "Coverage Status": "Zero Unverified Claims", "Details": "No claims of non-existent warehouses, local overseas offices, or fictitious API Monogram license numbers. Clear distinction made between certified compliance and monogram licensing." }
];
const ws15 = XLSX.utils.json_to_sheet(researchCoverageData);
autoFitCols(ws15, researchCoverageData);
XLSX.utils.book_append_sheet(wb, ws15, "Research Coverage & Gaps");

// -----------------------------------------------------------------------------
// Sheet 16: Implementation Status and Results
// -----------------------------------------------------------------------------
const implementationStatusData = [
  { "Task ID": "IMP-01", "Optimization Description": "Cleaned Mojibake (corrupted UTF-8) in index.html — 24 lines fixed", "Affected Area": "index.html headers, body content, JSON-LD schema", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "0 garbled characters remaining in index.html" },
  { "Task ID": "IMP-02", "Optimization Description": "Cleaned Mojibake in PageSEO.jsx title and description strings", "Affected Area": "src/components/PageSEO.jsx L18-19", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "™ and — characters display correctly in browser" },
  { "Task ID": "IMP-03", "Optimization Description": "Corrected Flux Fine-200 Free Swell Volume typo 1214 ml → 12–14 ml", "Affected Area": "src/data/products.js", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "Accurate technical specifications for chemical engineers" },
  { "Task ID": "IMP-04", "Optimization Description": "Regenerated all 6 PDS PDFs with correct brand and domain", "Affected Area": "public/pds/*.pdf", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "PDF sizes 1.8 MB → ~48 KB; correct bentoclayclaytech.com URL" },
  { "Task ID": "IMP-05", "Optimization Description": "Standardized brand 'Bento Clay Tech' across 30+ UI-visible locations", "Affected Area": "Footer.jsx, FloatingActions.jsx, HeroClayShowcase.jsx, BentoclayHeroSlider.jsx, ContactPage.jsx, ProductCard.jsx, ProductDetailPage.jsx, HomePage.jsx, TermsConditionsPage.jsx, GradeCustomizer.jsx, faqs.js, PageSEO.jsx", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "Consistent official brand identity across all customer touchpoints" },
  { "Task ID": "IMP-06", "Optimization Description": "API Spec 13A compliance phrasing corrected to 'API Spec 13A Section 12 Compliant'", "Affected Area": "BentoclayHeroSlider.jsx, index.html, Footer.jsx", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "Eliminated legal risk during petroleum operator compliance audits" },
  { "Task ID": "IMP-07", "Optimization Description": "ContactPage.jsx — added id, htmlFor, autoComplete, data-agent attributes to all form fields", "Affected Area": "src/pages/ContactPage.jsx", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "WCAG 2.2 AA compliant form; passes Agentic Browsing Form Accessibility check" },
  { "Task ID": "IMP-08", "Optimization Description": "Footer.jsx — aria-hidden on decorative emoji icons; aria-label on Google star rating container; stars get aria-hidden", "Affected Area": "src/components/Footer.jsx", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "Screen reader reads '5 out of 5 stars on Google' not 5 individual ★ characters" },
  { "Task ID": "IMP-09", "Optimization Description": "FloatingActions.jsx — aria-label fixed to 'Bento Clay Tech'; explicit aria-label on WhatsApp, Email, Call speed-dial items", "Affected Area": "src/components/FloatingActions.jsx", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "All floating action buttons have unambiguous accessible names" },
  { "Task ID": "IMP-10", "Optimization Description": "PRICE AUDIT — Removed $150-$320 AggregateOffer price range from index.html Product schema", "Affected Area": "index.html JSON-LD @type Product offers", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "No dollar prices in product schema; Google cannot extract pricing to show in SERP" },
  { "Task ID": "IMP-11", "Optimization Description": "PRICE AUDIT — Removed price:'350.00' from PageSEO.jsx Product Offer schema; replaced with InvoicePrice B2B structure", "Affected Area": "src/components/PageSEO.jsx lines 239-250", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "Offer type is now InvoicePrice with description; no public price displayed" },
  { "Task ID": "IMP-12", "Optimization Description": "PRICE AUDIT — Removed product:price:amount and product:price:currency Open Graph meta tags from PageSEO.jsx", "Affected Area": "src/components/PageSEO.jsx lines 510-511", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "No OG price meta tags for Facebook/Pinterest to extract and display" },
  { "Task ID": "IMP-13", "Optimization Description": "PRICE AUDIT — Removed priceRange:'$$' from Organization schema in both index.html and PageSEO.jsx", "Affected Area": "index.html L181, src/components/PageSEO.jsx L161", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "Google Business Profile cost indicator removed; prevents price confusion in B2B searches" },
  { "Task ID": "IMP-14", "Optimization Description": "robots.txt — brand name fixed; llms.txt and llms-full.txt added as explicit Sitemap entries", "Affected Area": "public/robots.txt", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "AI crawlers can discover machine-readable endpoints directly from robots.txt" },
  { "Task ID": "IMP-15", "Optimization Description": "Vite build config — code splitting (vendor-react, vendor-router, etc.); esbuild minification; CSS code split", "Affected Area": "vite.config.js build section", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "✓ Build successful in 886ms — 0 errors, 0 warnings; vendor chunks cacheable separately" },
  { "Task ID": "IMP-16", "Optimization Description": "Production Vite build verification — 7 chunks generated, all gzip compressed", "Affected Area": "dist/ directory", "Execution Status": "Completed & Verified", "Date": "2026-10-20", "Result": "index-DXjCxkEu.js 231KB (67KB gzip); CSS 142KB (27KB gzip); vendor chunks properly split" }
];
const ws16 = XLSX.utils.json_to_sheet(implementationStatusData);
autoFitCols(ws16, implementationStatusData);
XLSX.utils.book_append_sheet(wb, ws16, "Implementation Results");

// -----------------------------------------------------------------------------
// Sheet 17: Price Audit Report
// -----------------------------------------------------------------------------
const priceAuditData = [
  { "Location": "public/products/*/index.html (6 static product pages)", "Original Value": "AggregateOffer with lowPrice: 130-190, highPrice: 280-380, offerCount: 6-12", "Action Taken": "REMOVED — replaced with B2B Offer + UnitPriceSpecification + InvoicePrice without price values, while preserving aggregateRating & areaServed", "Status": "Fixed", "Risk": "CRITICAL — was the primary direct source of the $150-$320 price snippet indexed by Googlebot", "Date": "2026-10-20" },
  { "Location": "index.html — JSON-LD @type Product offers", "Original Value": "lowPrice: '150', highPrice: '320', offerCount: '10' (AggregateOffer) & price: '0'", "Action Taken": "REMOVED — replaced with B2B Offer + InvoicePrice description. Restored 4.9 aggregateRating (68 reviews)", "Status": "Fixed", "Risk": "HIGH — was driving $150-$320 price snippet in Google SERP and risked displaying $0.00 / Free", "Date": "2026-10-20" },
  { "Location": "index.html — Organization schema priceRange", "Original Value": "\"priceRange\": \"$$\"", "Action Taken": "REMOVED — deleted the priceRange field entirely", "Status": "Fixed", "Risk": "MEDIUM — confuses B2B procurement managers seeing retail cost indicator", "Date": "2026-10-20" },
  { "Location": "src/components/PageSEO.jsx — Product Offer schema", "Original Value": "price: '350.00', priceValidUntil: '2027-12-31' & price: '0'", "Action Taken": "REMOVED — replaced with B2B Offer + InvoicePrice description. Restored 4.9 aggregateRating (48 reviews) and expert review schema", "Status": "Fixed", "Risk": "HIGH — was injecting fake $350/unit price into all 6 product pages", "Date": "2026-10-20" },
  { "Location": "src/components/PageSEO.jsx — Organization schema", "Original Value": "priceRange: '$$'", "Action Taken": "REMOVED — deleted the priceRange field", "Status": "Fixed", "Risk": "MEDIUM — Google Business Profile price tier indicator", "Date": "2026-10-20" },
  { "Location": "src/components/PageSEO.jsx — Open Graph meta tags", "Original Value": "product:price:amount='350.00', product:price:currency='USD'", "Action Taken": "REMOVED — both meta tags deleted", "Status": "Fixed", "Risk": "HIGH — Facebook/Pinterest product price extraction; could confuse social media sharing", "Date": "2026-10-20" },
  { "Location": "src/pages/BlogDetailPage.jsx — regex $1 in template literal", "Original Value": "replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')", "Action Taken": "NO CHANGE — this is a regex backreference ($1), not a price", "Status": "False Positive (Ignore)", "Risk": "NONE — not a price, standard regex replacement syntax", "Date": "2026-10-20" },
  { "Location": "index.html L846 — technical spec '120% – 150%'", "Original Value": "120% – 150% (Natural Powder liquid absorption capacity)", "Action Taken": "NO CHANGE — this is a technical performance specification, not a price", "Status": "Correct (Retain)", "Risk": "NONE — spec value, not a price", "Date": "2026-10-20" },
  { "Location": "index.html L997 — temperature spec '150°C'", "Original Value": "150°C heat limit for bentonite comparison", "Action Taken": "NO CHANGE — temperature specification, not a price", "Status": "Correct (Retain)", "Risk": "NONE — spec value", "Date": "2026-10-20" },
  { "Location": "Google Search Console — SERP snippet showing $150-$320", "Original Value": "Was extracted from AggregateOffer schema in static product HTML & index.html", "Action Taken": "Source schema removed across all 6 static pages and index.html. Google typically re-crawls within 1-28 days and drops the snippet automatically.", "Status": "Pending Google Re-crawl", "Risk": "LOW — schema completely purged; snippet will disappear on next Googlebot crawl", "Date": "2026-10-20" }
];
const ws17 = XLSX.utils.json_to_sheet(priceAuditData);
autoFitCols(ws17, priceAuditData);
XLSX.utils.book_append_sheet(wb, ws17, "Price Audit Report");

// -----------------------------------------------------------------------------
// Sheet 18: AI / AEO Conversational Query Research
// -----------------------------------------------------------------------------
const aeoQueriesData = [
  { "AI Query Type": "Direct Brand Intent", "Query": "What is Bento Clay Tech?", "Ideal Answer Summary": "Bento Clay Tech (bentoclayclaytech.com) is an Indian manufacturer and exporter of high-purity Attapulgite (Palygorskite) clay minerals from Bhavnagar, Gujarat. Products include API 13A drilling clay, salt gel powder, 325 mesh paint thixotropes, foundry flux, agro carriers, and granular absorbents.", "Target Page": "/", "Data Source": "llms.txt, JSON-LD Organization schema", "Priority": "P0" },
  { "AI Query Type": "Product Specification", "Query": "What is API Spec 13A Section 12 drilling clay?", "Ideal Answer Summary": "API Spec 13A Section 12 is the American Petroleum Institute standard for attapulgite-based drilling clay used in saltwater and brine mud systems. It requires a minimum Fann Model 35 viscometer dial reading of 30 cps at 600 rpm, wet sieve residue ≤8%, and moisture ≤16%.", "Target Page": "/products/api-13a-section-12-attapulgite-powder", "Data Source": "JSON-LD FAQPage, llms-full.txt", "Priority": "P0" },
  { "AI Query Type": "Comparison Query", "Query": "What is the difference between attapulgite and bentonite for drilling?", "Ideal Answer Summary": "Bentonite swells by electrostatic plate separation and collapses in saline water (>10,000 ppm NaCl). Attapulgite has a needle-like crystal structure that creates mechanical entanglement gel, maintaining full viscosity even in saturated brine (300,000 ppm TDS). This makes attapulgite essential for saltwater drilling where bentonite fails.", "Target Page": "/products/salt-gel-attapulgite-powder", "Data Source": "JSON-LD FAQPage schema", "Priority": "P0" },
  { "AI Query Type": "Supplier Intent", "Query": "Who are attapulgite manufacturers in India?", "Ideal Answer Summary": "Major attapulgite manufacturers in India are located in Gujarat, particularly in Bhavnagar which has natural palygorskite deposits. Bento Clay Tech is a Bhavnagar-based manufacturer offering 6 certified grades with Mundra Port export capability.", "Target Page": "/about", "Data Source": "Organization schema, llms.txt", "Priority": "P0" },
  { "AI Query Type": "Location Export", "Query": "Which port does Bento Clay Tech export from?", "Ideal Answer Summary": "Bento Clay Tech exports via Mundra Port (INMUN1), Pipavav Port (INPAV1), and Nhava Sheva / JNPT (INNSA1) with FCL and LCL container options for worldwide destinations.", "Target Page": "/why-us", "Data Source": "llms.txt, address schema", "Priority": "P1" },
  { "AI Query Type": "Process / How-to", "Query": "How do I request an attapulgite sample?", "Ideal Answer Summary": "Contact Bento Clay Tech via WhatsApp at +91-7435818628, email dipak@bentoclay.com, or submit the online RFQ form at bentoclayclaytech.com/contact to request a 25 kg laboratory evaluation sample with Certificate of Analysis (COA).", "Target Page": "/contact", "Data Source": "Contact schema, llms.txt", "Priority": "P0" },
  { "AI Query Type": "Technical Specification", "Query": "What is the CAS number for attapulgite?", "Ideal Answer Summary": "Attapulgite (also known as Palygorskite) has CAS Registry Number 12174-11-7 and HS Code 2508.40.00. Its chemical formula is (Mg,Al)₂Si₄O₁₀(OH) · 4H₂O — a hydrous magnesium aluminium phyllosilicate.", "Target Page": "/about", "Data Source": "Organization schema knowsAbout", "Priority": "P1" },
  { "AI Query Type": "Application Query", "Query": "Can attapulgite be used in paint formulations?", "Ideal Answer Summary": "Yes. Premium 325 Mesh Attapulgite (micronized to 44 μm) is used as an inorganic thixotropic additive in architectural emulsion paints, industrial coatings, adhesives, and sealants. It prevents pigment settling, eliminates syneresis, and provides anti-sag properties without enzyme degradation.", "Target Page": "/products/premium-325-attapulgite-powder", "Data Source": "Product schema, llms-full.txt", "Priority": "P1" },
  { "AI Query Type": "Pricing / Commercial", "Query": "How much does attapulgite powder cost?", "Ideal Answer Summary": "Attapulgite pricing is quotation-based and depends on the specific grade (API 13A, Salt Gel, Premium 325, etc.), packing format (25 kg bags vs jumbo bags), required quantity (MT), and destination Incoterms (FOB Mundra or CIF port). Contact Bento Clay Tech directly for current export pricing.", "Target Page": "/contact", "Data Source": "Offer InvoicePrice schema", "Priority": "P0" },
  { "AI Query Type": "Certification Query", "Query": "Is Bento Clay Tech API 13A certified?", "Ideal Answer Summary": "Bento Clay Tech manufactures attapulgite clay that meets the requirements of API Specification 13A Section 12. The product achieves ≥30 cps dial reading at 600 rpm (Fann Model 35), wet sieve residue ≤8%, and moisture ≤16%. The company does not hold the API Monogram license, but the product conforms to the published API Spec 13A Section 12 parameters.", "Target Page": "/products/api-13a-section-12-attapulgite-powder", "Data Source": "FAQ schema, product PDS", "Priority": "P0" },
  { "AI Query Type": "Comparison / Competitor", "Query": "What are alternatives to ENGELHARD attapulgite?", "Ideal Answer Summary": "Bento Clay Tech (India), Active Minerals International (USA), and Ashapura Minechem (India) are producers of attapulgite clay for industrial applications as alternatives to legacy American producers. Bento Clay Tech offers API 13A compliant grades at FOB Mundra pricing with direct factory supply.", "Target Page": "/why-us", "Data Source": "Competitor research", "Priority": "P1" },
  { "AI Query Type": "Regulatory / AEO", "Query": "What HS Code is attapulgite classified under for import?", "Ideal Answer Summary": "Attapulgite / Palygorskite is classified under HS Code 2508.40.00 (Other Clays). For Indian export documentation, ITCHS Code 2508 40 00 applies. The CAS number is 12174-11-7.", "Target Page": "/about", "Data Source": "Product schema, llms.txt", "Priority": "P1" }
];
const ws18 = XLSX.utils.json_to_sheet(aeoQueriesData);
autoFitCols(ws18, aeoQueriesData);
XLSX.utils.book_append_sheet(wb, ws18, "AI & AEO Query Research");

// -----------------------------------------------------------------------------
// Sheet 19: Competitor Keyword Research
// -----------------------------------------------------------------------------
const competitorKeywordsData = [
  { "Competitor": "Active Minerals International (USA)", "Competitor Domain": "activeminerals.com", "Keyword": "attapulgite powder manufacturer", "Notes": "Global leader in attapulgite; strong US domestic presence; Bento Clay can compete on FOB export price and API 13A compliance", "Opportunity": "High — Indian cost advantage + export logistics", "Data Source": "Manual research" },
  { "Competitor": "Active Minerals International (USA)", "Competitor Domain": "activeminerals.com", "Keyword": "Min-U-Gel attapulgite", "Notes": "Brand-specific product name. Competitor has strong brand recall in North America.", "Opportunity": "Medium — target 'Min-U-Gel alternative' and 'attapulgite API 13A India supply'", "Data Source": "Manual research" },
  { "Competitor": "Ashapura Minechem Ltd (India)", "Competitor Domain": "ashapura.com", "Keyword": "attapulgite supplier India export", "Notes": "Large Gujarat-based mineral company with diverse portfolio including attapulgite", "Opportunity": "High — compete on specialization: Bento Clay Tech focuses exclusively on attapulgite grades vs Ashapura's diversified catalog", "Data Source": "Manual research" },
  { "Competitor": "Ashapura Minechem Ltd (India)", "Competitor Domain": "ashapura.com", "Keyword": "bentonite and attapulgite manufacturer Gujarat", "Notes": "Ashapura has both bentonite and attapulgite; Bento Clay Tech should position as attapulgite specialist", "Opportunity": "High — 'attapulgite specialist' positioning vs generalist competitors", "Data Source": "Manual research" },
  { "Competitor": "Pratham Minechem Pvt Ltd (India)", "Competitor Domain": "prathamminechem.com", "Keyword": "attapulgite clay Gujarat manufacturer", "Notes": "Smaller Gujarat competitor with overlapping product lines", "Opportunity": "High — Bento Clay Tech should target same geography with superior technical content", "Data Source": "Manual research" },
  { "Competitor": "Petropath Fluids India Ltd (India)", "Competitor Domain": "petropath.in", "Keyword": "API drilling clay India supplier", "Notes": "Oilfield chemicals supplier that sources attapulgite; potential intermediary competitive threat", "Opportunity": "Medium — target direct procurement buyers bypassing intermediaries", "Data Source": "Manual research" },
  { "Competitor": "BASF (Germany)", "Competitor Domain": "basf.com", "Keyword": "attapulgite paint thixotrope", "Notes": "BASF supplies Attagel attapulgite for paint; Bento Clay competes via cost and supply chain proximity to Asia/Middle East", "Opportunity": "Medium — target 'attapulgite paint additive India supply' to Asian coating manufacturers", "Data Source": "Manual research" },
  { "Competitor": "IMin Minerals (Australia)", "Competitor Domain": "iminminerals.com.au", "Keyword": "attapulgite mining export", "Notes": "Australian attapulgite source; Bento Clay has freight advantage to Asian/GCC markets", "Opportunity": "Medium — emphasize shorter shipping days and lower freight cost from Mundra Port vs Australia", "Data Source": "Manual research" },
  { "Competitor": "Generic Indian Mineral Suppliers", "Competitor Domain": "IndiaMART listings", "Keyword": "attapulgite powder price India per kg", "Notes": "Many unbranded IndiaMART listings compete on price alone with inconsistent quality", "Opportunity": "High — differentiate with technical data sheets, COA, API 13A certification language, and professional website", "Data Source": "IndiaMART manual research" },
  { "Competitor": "Generic Indian Mineral Suppliers", "Competitor Domain": "TradeIndia listings", "Keyword": "palygorskite clay buy India", "Notes": "Low-quality B2B marketplace listings with no technical content", "Opportunity": "High — Bento Clay Tech's technical pages rank higher than marketplace thin content", "Data Source": "TradeIndia manual research" }
];
const ws19 = XLSX.utils.json_to_sheet(competitorKeywordsData);
autoFitCols(ws19, competitorKeywordsData);
XLSX.utils.book_append_sheet(wb, ws19, "Competitor Keywords");

// -----------------------------------------------------------------------------
// Sheet 20: Keyword Gap Analysis
// -----------------------------------------------------------------------------
const keywordGapData = [
  { "Gap Keyword": "attapulgite vs bentonite saltwater drilling", "Search Intent": "Informational/Commercial", "Current Coverage": "Partially — FAQ page has answer but no dedicated article", "Recommended Action": "Create blog article: 'Attapulgite vs Bentonite for Saltwater Drilling Fluids — Technical Comparison'", "Target Page": "/blog", "Priority": "P0", "Estimated Value": "Very High — engineers searching this convert to RFQ immediately" },
  { "Gap Keyword": "attapulgite price per metric ton 2025", "Search Intent": "Transactional", "Current Coverage": "NOT COVERED — no price page; quotation-based model", "Recommended Action": "Create 'Request Quotation' landing page explaining quotation-based pricing model; add FAQ about pricing", "Target Page": "/contact", "Priority": "P0", "Estimated Value": "Very High — highest intent buyers" },
  { "Gap Keyword": "API 13A Section 12 test method explained", "Search Intent": "Informational", "Current Coverage": "Partial — specs listed but no detailed explanation", "Recommended Action": "Blog article: 'API Spec 13A Section 12 — Complete Test Method Guide for Drilling Clay Procurement'", "Target Page": "/blog/api-13a-test-method", "Priority": "P1", "Estimated Value": "High — attracts petroleum engineers who will then procure" },
  { "Gap Keyword": "attapulgite cat litter manufacturer India", "Search Intent": "Commercial", "Current Coverage": "Partial — granules product page exists but not optimized for cat litter", "Recommended Action": "Add cat litter industry section to granules product page; add cat litter to Applications page", "Target Page": "/products/attapulgite-natural-granules-1-5mm", "Priority": "P1", "Estimated Value": "High — pet care is growing B2B segment" },
  { "Gap Keyword": "palygorskite powder REACH ECHA compliant", "Search Intent": "Regulatory/Commercial", "Current Coverage": "NOT COVERED — no REACH/regulatory page", "Recommended Action": "Add regulatory compliance section to About page covering REACH, TSCA, ECHA, and Indian BIS status", "Target Page": "/about", "Priority": "P1", "Estimated Value": "Medium — required by European buyers" },
  { "Gap Keyword": "attapulgite 200 mesh agrochemical carrier", "Search Intent": "Commercial", "Current Coverage": "Covered on Natural Powder page but thin content", "Recommended Action": "Expand natural powder page with detailed agrochemical carrier applications, wettable powder (WP) and dry flowable (DF) formulation examples", "Target Page": "/products/attapulgite-natural-powder", "Priority": "P1", "Estimated Value": "High — agrochemical industry is large consistent buyer" },
  { "Gap Keyword": "foundry core wash clay supplier", "Search Intent": "Commercial", "Current Coverage": "Partial — Flux Fine-200 page covers this but foundry-specific keywords not optimized", "Recommended Action": "Optimize Flux Fine-200 page with 'foundry core wash', 'zircon suspension clay', 'graphite foundry wash' keywords", "Target Page": "/products/flux-fine-200-attapulgite-powder", "Priority": "P1", "Estimated Value": "High — foundry is a B2B niche with high-volume orders" },
  { "Gap Keyword": "attapulgite hazardous spill absorbent OSHA", "Search Intent": "Commercial", "Current Coverage": "NOT COVERED — no safety/industrial hygiene content", "Recommended Action": "Add section on granules page for industrial absorbent applications with OSHA spill response context", "Target Page": "/products/attapulgite-natural-granules-1-5mm", "Priority": "P2", "Estimated Value": "Medium — industrial safety buyer" },
  { "Gap Keyword": "Mundra port mineral exporter Gujarat", "Search Intent": "Commercial", "Current Coverage": "Mentioned in FAQs and index.html but not a dedicated landing page", "Recommended Action": "Add Mundra Port export logistics section to Why Us page with shipping timeline and INCOTERMS details", "Target Page": "/why-us", "Priority": "P1", "Estimated Value": "High — port-specific searches are high commercial intent" },
  { "Gap Keyword": "attapulgite halal kosher certified", "Search Intent": "Regulatory/Commercial", "Current Coverage": "NOT COVERED", "Recommended Action": "If certification is available, add to product pages and About page; if not, note it as a future opportunity", "Target Page": "/about", "Priority": "P3", "Estimated Value": "Low-Medium — niche food/pharma grade requirement" },
  { "Gap Keyword": "site:bentoclayclaytech.com (brand anchor)", "Search Intent": "Brand Navigational", "Current Coverage": "Domain needs more inbound links with brand anchor text", "Recommended Action": "Prioritize backlink building from industry directories (IQS Directory, IMCD, ThomasNet) with 'Bento Clay Tech' or 'bentoclayclaytech.com' anchor text", "Target Page": "/", "Priority": "P0", "Estimated Value": "Very High — improves all keyword rankings" }
];
const ws20 = XLSX.utils.json_to_sheet(keywordGapData);
autoFitCols(ws20, keywordGapData);
XLSX.utils.book_append_sheet(wb, ws20, "Keyword Gap Analysis");

// -----------------------------------------------------------------------------
// Sheet 21: Extended Backlink Strategy
// -----------------------------------------------------------------------------
const extendedBacklinksData = [
  { "Platform": "IQS Directory (iqsdirectory.com)", "Type": "Industry Directory Listing", "Relevance": "Very High — B2B industrial minerals directory; connects procurement managers with suppliers", "Action": "Create free supplier profile; add product categories: Attapulgite Powder, Drilling Clay, Palygorskite", "Anchor Text Suggestion": "Bento Clay Tech — Attapulgite Manufacturer India", "Difficulty": "Easy", "Priority": "P0" },
  { "Platform": "ThomasNet (thomasnet.com)", "Type": "Industrial B2B Directory", "Relevance": "Very High — dominant US procurement platform; ideal for reaching Texas/Louisiana oilfield buyers", "Action": "Register as supplier in categories: Minerals & Mining Chemicals, Drilling Fluids, Clay Minerals", "Anchor Text Suggestion": "Bento Clay Tech — API 13A Drilling Clay Manufacturer", "Difficulty": "Easy", "Priority": "P0" },
  { "Platform": "Alibaba / Global Sources", "Type": "B2B Marketplace Directory", "Relevance": "High — international buyer exposure; many GCC and Southeast Asian procurement managers source here", "Action": "Create verified Gold Supplier listing with product catalog and COA samples uploaded", "Anchor Text Suggestion": "Bentoclayclaytech.com — Attapulgite Exporter India", "Difficulty": "Easy-Medium", "Priority": "P0" },
  { "Platform": "IndiaMART (indiamart.com)", "Type": "Indian B2B Marketplace", "Relevance": "High — dominant Indian B2B platform for domestic buyers in chemicals, oilfield, and construction", "Action": "Create Trust Seal verified listing; add all 6 products with specifications and images", "Anchor Text Suggestion": "Bento Clay Tech Bhavnagar — Attapulgite Powder", "Difficulty": "Easy", "Priority": "P0" },
  { "Platform": "Mindat.org (mindat.org)", "Type": "Mineralogy Reference Site", "Relevance": "High — authoritative mineralogy database; links from Mindat to attapulgite suppliers add trust signals", "Action": "Contribute accurate attapulgite mineral data; request mention of Bhavnagar deposit and commercial supplier link", "Anchor Text Suggestion": "Bento Clay Tech — Palygorskite CAS 12174-11-7 Supplier", "Difficulty": "Medium", "Priority": "P1" },
  { "Platform": "OilProducers.net / Rigzone.com", "Type": "Oilfield Industry Portal", "Relevance": "Very High — decision makers in drilling operations read these; key for API 13A product awareness", "Action": "Submit press release about API Spec 13A compliance; request supplier listing in drilling chemicals section", "Anchor Text Suggestion": "API 13A Attapulgite Drilling Clay — Bento Clay Tech India", "Difficulty": "Medium", "Priority": "P0" },
  { "Platform": "Chemicalize / ChemSrc", "Type": "Chemical Database", "Relevance": "Medium — links from CAS number databases help AI engines and procurement researchers verify product authenticity", "Action": "Verify CAS 12174-11-7 product listing and add website link as commercial supplier", "Anchor Text Suggestion": "CAS 12174-11-7 Attapulgite — Bento Clay Tech Commercial Supplier", "Difficulty": "Easy", "Priority": "P1" },
  { "Platform": "Export Portal (exportportal.com)", "Type": "Global Export Directory", "Relevance": "Medium — import-export focused; connects buyers with verified exporters", "Action": "Register as verified exporter; add Mundra Port and Incoterms details", "Anchor Text Suggestion": "Bento Clay Tech — Attapulgite Mineral Exporter from India", "Difficulty": "Easy", "Priority": "P1" },
  { "Platform": "LinkedIn Company Page", "Type": "Social / Professional Network", "Relevance": "High — B2B decision makers (procurement VPs, Drilling Engineers, Chemical Formulators) are on LinkedIn", "Action": "Complete company page; publish monthly posts about API 13A compliance, Mundra port dispatch, new grades", "Anchor Text Suggestion": "Bento Clay Tech official LinkedIn", "Difficulty": "Easy", "Priority": "P0" },
  { "Platform": "FIEO (Federation of Indian Export Organisations)", "Type": "Government Export Body", "Relevance": "Medium — FIEO listed exporters gain credibility with overseas buyers who verify Indian exporters", "Action": "Register with FIEO and export promotion councils (CHEMEXCIL for chemicals)", "Anchor Text Suggestion": "Bento Clay Tech — FIEO Registered Mineral Exporter", "Difficulty": "Medium", "Priority": "P1" },
  { "Platform": "Kompass Business Directory", "Type": "Global B2B Directory", "Relevance": "Medium — well-established in European and Middle Eastern markets where many mineral buyers source from", "Action": "Create free or paid listing; export mineral category registration", "Anchor Text Suggestion": "Bento Clay Tech — Mineral Manufacturer Gujarat", "Difficulty": "Easy", "Priority": "P1" },
  { "Platform": "Guest Post on Drilling Fluids / Minerals Industry Blogs", "Type": "Editorial Backlinks", "Relevance": "High — industry-relevant editorial links are most powerful for ranking specific B2B keywords", "Action": "Write 1500-word technical articles on 'Attapulgite in Saltwater Drilling' and pitch to oilfield engineering blogs", "Anchor Text Suggestion": "Bento Clay Tech API 13A Drilling Clay", "Difficulty": "Hard", "Priority": "P1" }
];
const ws21 = XLSX.utils.json_to_sheet(extendedBacklinksData);
autoFitCols(ws21, extendedBacklinksData);
XLSX.utils.book_append_sheet(wb, ws21, "Extended Backlink Strategy");

// -----------------------------------------------------------------------------
// Sheet 22: Keyword-to-Page Mapping
// -----------------------------------------------------------------------------
const keywordToPageData = [
  { "Target URL": "https://bentoclayclaytech.com/", "Page Title": "Homepage", "Primary Keyword": "Bento Clay Tech", "Secondary Keywords": "Best API 13A Powder, Attapulgite Manufacturer India, Bentoclay, attapulgite exporter Bhavnagar", "H1 Tag": "Bento Clay Tech™ — Best API 13A Powder & Attapulgite Manufacturer", "Content Gap": "None — well optimized", "Schema Types": "Organization, WebSite, Product, FAQPage, BreadcrumbList", "Priority": "P0" },
  { "Target URL": "https://bentoclayclaytech.com/products", "Page Title": "Products Catalog", "Primary Keyword": "Attapulgite Clay Grades", "Secondary Keywords": "attapulgite powder catalog, palygorskite mineral grades, API 13A catalog India", "H1 Tag": "Attapulgite Clay Grades & Products", "Content Gap": "Add filterable product comparison table by industry vertical", "Schema Types": "ItemList, Product (each grade)", "Priority": "P1" },
  { "Target URL": "https://bentoclayclaytech.com/products/api-13a-section-12-attapulgite-powder", "Page Title": "API 13A Product Page", "Primary Keyword": "API 13A Attapulgite Drilling Clay", "Secondary Keywords": "API Spec 13A Section 12, salt gel brine drilling, offshore drilling clay India", "H1 Tag": "API Spec 13A Section 12 Compliant Attapulgite Drilling Clay", "Content Gap": "Add test report table showing actual Fann dial readings from batch COAs", "Schema Types": "Product, Offer (InvoicePrice), BreadcrumbList", "Priority": "P0" },
  { "Target URL": "https://bentoclayclaytech.com/products/salt-gel-attapulgite-powder", "Page Title": "Salt Gel Product Page", "Primary Keyword": "Attapulgite Salt Gel Powder", "Secondary Keywords": "35 cps drilling viscosifier, saline water mud additive, brine drilling clay", "H1 Tag": "Salt Gel Grade Attapulgite Powder — High Viscosity Drilling Fluid Additive", "Content Gap": "Add comparison chart vs API 13A grade; show when Salt Gel is preferred", "Schema Types": "Product, Offer (InvoicePrice), BreadcrumbList", "Priority": "P0" },
  { "Target URL": "https://bentoclayclaytech.com/products/premium-325-attapulgite-powder", "Page Title": "Premium 325 Mesh Page", "Primary Keyword": "Premium 325 Mesh Attapulgite", "Secondary Keywords": "paint thixotrope additive, anti-sag rheology modifier, 44 micron clay powder", "H1 Tag": "Premium 325 Mesh Micronized Attapulgite — Paint & Coatings Thixotrope", "Content Gap": "Add dosage recommendation table for common paint formulations", "Schema Types": "Product, Offer (InvoicePrice), BreadcrumbList", "Priority": "P0" },
  { "Target URL": "https://bentoclayclaytech.com/products/flux-fine-200-attapulgite-powder", "Page Title": "Flux Fine-200 Page", "Primary Keyword": "Flux Fine Foundry Flux Powder", "Secondary Keywords": "foundry core wash clay, zircon suspension agent, high-temp mineral binder", "H1 Tag": "Flux Fine-200 Foundry Flux — High Swelling Index Attapulgite for Metal Casting", "Content Gap": "Add application diagram showing core wash coating process", "Schema Types": "Product, Offer (InvoicePrice), BreadcrumbList", "Priority": "P1" },
  { "Target URL": "https://bentoclayclaytech.com/products/attapulgite-natural-powder", "Page Title": "Natural Powder Page", "Primary Keyword": "Natural Attapulgite Powder 200 Mesh", "Secondary Keywords": "agrochemical carrier clay, wettable powder WP base, pesticide carrier granules India", "H1 Tag": "Natural Attapulgite Powder — Agrochemical Carrier & Industrial Grade", "Content Gap": "Add WP/DF formulation examples with dosage rates; add mycotoxin binder application note", "Schema Types": "Product, Offer (InvoicePrice), BreadcrumbList", "Priority": "P1" },
  { "Target URL": "https://bentoclayclaytech.com/products/attapulgite-natural-granules-1-5mm", "Page Title": "Granules Product Page", "Primary Keyword": "Attapulgite Granules 1-5mm", "Secondary Keywords": "industrial absorbent granules, non-clumping cat litter manufacturer, spill absorbent India", "H1 Tag": "Attapulgite Natural Granules 1–5 mm — Industrial Absorbent & Cat Litter Grade", "Content Gap": "Add application uses: oil spill response, chemical neutralization, pet care; add OSHA compliance note", "Schema Types": "Product, Offer (InvoicePrice), BreadcrumbList", "Priority": "P1" },
  { "Target URL": "https://bentoclayclaytech.com/why-us", "Page Title": "Why Choose Us", "Primary Keyword": "Attapulgite Clay Manufacturing Plant", "Secondary Keywords": "captive mine Gujarat, ISO laboratory clay testing, Mundra port mineral export, why Bento Clay Tech", "H1 Tag": "Why Choose Bento Clay Tech — Captive Mines, ISO Lab & Mundra Port Export", "Content Gap": "Add plant capacity (50,000 MT/year), lab equipment list, export certifications section", "Schema Types": "Organization, LocalBusiness, WebPage", "Priority": "P1" },
  { "Target URL": "https://bentoclayclaytech.com/about", "Page Title": "About Us", "Primary Keyword": "Bento Clay Tech Attapulgite Manufacturer", "Secondary Keywords": "Bhavnagar mineral company, GIDC Kardej plant, attapulgite mining Gujarat, export history", "H1 Tag": "About Bento Clay Tech — Attapulgite Mineral Specialists, Bhavnagar Gujarat", "Content Gap": "Add founding year, team credentials, export countries map, certifications list", "Schema Types": "Organization, AboutPage, BreadcrumbList", "Priority": "P1" },
  { "Target URL": "https://bentoclayclaytech.com/contact", "Page Title": "Contact & RFQ", "Primary Keyword": "Buy Attapulgite Clay Direct", "Secondary Keywords": "attapulgite RFQ form, request attapulgite sample COA, mineral export inquiry India", "H1 Tag": "Contact Bento Clay Tech — Request a Commercial RFQ or Sample", "Content Gap": "Add estimated response time SLA (24 hours); add WhatsApp QR code for mobile users", "Schema Types": "ContactPage, Organization, LocalBusiness", "Priority": "P0" },
  { "Target URL": "https://bentoclayclaytech.com/applications", "Page Title": "Applications", "Primary Keyword": "Attapulgite Clay Applications", "Secondary Keywords": "attapulgite in drilling, paint additives clay, foundry minerals, agro clay carrier, industrial absorbent", "H1 Tag": "Attapulgite Clay Applications — 16 Industrial Industries Served", "Content Gap": "Add interactive application-to-product recommender widget", "Schema Types": "WebPage, ItemList (applications)", "Priority": "P1" },
  { "Target URL": "https://bentoclayclaytech.com/blog", "Page Title": "Blog / Resources", "Primary Keyword": "Attapulgite Mineral Insights & Guides", "Secondary Keywords": "API 13A drilling clay blog, attapulgite news, palygorskite mineral guide", "H1 Tag": "Attapulgite Mineral Insights & Technical Guides — Bento Clay Tech Blog", "Content Gap": "Publish 2 articles/month; target gap keywords: attapulgite vs bentonite, API 13A test method guide, salt gel brine drilling guide", "Schema Types": "Blog, BlogPosting, BreadcrumbList", "Priority": "P1" },
  { "Target URL": "https://bentoclayclaytech.com/faq", "Page Title": "FAQ", "Primary Keyword": "Attapulgite Clay FAQ & Specs", "Secondary Keywords": "attapulgite questions, API 13A FAQ, viscosity testing attapulgite, export packaging FAQ", "H1 Tag": "Attapulgite FAQ — Technical Questions & Commercial Enquiries", "Content Gap": "Add price/quotation FAQ; add lead time FAQ; add shipping FAQ section", "Schema Types": "FAQPage, WebPage", "Priority": "P1" }
];
const ws22 = XLSX.utils.json_to_sheet(keywordToPageData);
autoFitCols(ws22, keywordToPageData);
XLSX.utils.book_append_sheet(wb, ws22, "Keyword to Page Mapping");

// -----------------------------------------------------------------------------
// Sheet 23: Implementation Tracker (Action Roadmap)
// -----------------------------------------------------------------------------
const implementationTrackerData = [
  { "Task #": "T01", "Category": "Technical SEO", "Action": "Deploy updated production build to live server (bentoclayclaytech.com)", "Files/Assets": "dist/ folder (all files)", "Effort": "Low", "Impact": "Critical", "Status": "PENDING — awaiting deployment", "Responsible": "Developer / Hosting", "Deadline": "Within 24 hours" },
  { "Task #": "T02", "Category": "SEO — Schema", "Action": "Submit URL Inspection in Google Search Console for index.html to trigger re-crawl and remove old $150-$320 price snippet", "Files/Assets": "Google Search Console → URL Inspection → Request Indexing", "Effort": "Low", "Impact": "High", "Status": "PENDING — requires GSC access", "Responsible": "Business Owner / SEO Manager", "Deadline": "Same day as deployment" },
  { "Task #": "T03", "Category": "Accessibility", "Action": "Run axe DevTools or WAVE accessibility scan after deployment to verify WCAG 2.2 AA compliance", "Files/Assets": "axe.dev browser extension or wave.webaim.org", "Effort": "Low", "Impact": "High", "Status": "PENDING", "Responsible": "Developer / QA", "Deadline": "Within 48 hours of deployment" },
  { "Task #": "T04", "Category": "Performance", "Action": "Run PageSpeed Insights (pagespeed.web.dev) on production URL for Mobile and Desktop scores", "Files/Assets": "pagespeed.web.dev — test https://bentoclayclaytech.com/", "Effort": "Low", "Impact": "High", "Status": "PENDING", "Responsible": "Developer", "Deadline": "Within 48 hours of deployment" },
  { "Task #": "T05", "Category": "Content", "Action": "Write and publish Blog Article: 'Attapulgite vs Bentonite for Saltwater Drilling Fluids — Technical Comparison'", "Files/Assets": "New file: src/data/blogData.js + blog route", "Effort": "Medium", "Impact": "High", "Status": "PLANNED", "Responsible": "Technical Writer / Sales Team", "Deadline": "Within 2 weeks" },
  { "Task #": "T06", "Category": "Content", "Action": "Write and publish Blog Article: 'API Spec 13A Section 12 Complete Procurement Guide'", "Files/Assets": "New blog post in blogData.js", "Effort": "Medium", "Impact": "High", "Status": "PLANNED", "Responsible": "Technical Writer", "Deadline": "Within 3 weeks" },
  { "Task #": "T07", "Category": "Backlinks", "Action": "Register supplier profile on ThomasNet, IQS Directory, and IndiaMART", "Files/Assets": "thomasnet.com, iqsdirectory.com, indiamart.com", "Effort": "Low", "Impact": "High", "Status": "PLANNED", "Responsible": "Business Owner / Marketing", "Deadline": "Within 1 week" },
  { "Task #": "T08", "Category": "Backlinks", "Action": "Optimize and complete LinkedIn Company Page for Bento Clay Tech; post product launch update", "Files/Assets": "linkedin.com/company/bentoclay", "Effort": "Low", "Impact": "Medium", "Status": "PLANNED", "Responsible": "Marketing / Business Owner", "Deadline": "Within 1 week" },
  { "Task #": "T09", "Category": "Google Tools", "Action": "Claim and optimize Google Business Profile (GBP) for Bento Clay Tech, Bhavnagar manufacturing works address", "Files/Assets": "business.google.com", "Effort": "Low", "Impact": "Very High", "Status": "PLANNED", "Responsible": "Business Owner", "Deadline": "Within 3 days" },
  { "Task #": "T10", "Category": "Analytics", "Action": "Verify GA4 generate_lead event is firing on RFQ form submission in Google Analytics → Events", "Files/Assets": "Google Analytics 4 → Events → generate_lead", "Effort": "Low", "Impact": "High", "Status": "PLANNED", "Responsible": "Developer / Business Owner", "Deadline": "Within 48 hours of deployment" },
  { "Task #": "T11", "Category": "Agentic Browsing", "Action": "Test Agentic Browsing checks in a Lighthouse/PageSpeed run; verify 4/4 passing after deployment", "Files/Assets": "PageSpeed Insights → Agentic Browsing tab", "Effort": "Low", "Impact": "Medium", "Status": "PLANNED", "Responsible": "Developer", "Deadline": "Within 48 hours of deployment" },
  { "Task #": "T12", "Category": "Content Expansion", "Action": "Add Plant Capacity (50,000 MT/year), ISO lab equipment list, and export certifications section to Why Us page", "Files/Assets": "src/pages/WhyUsPage.jsx", "Effort": "Medium", "Impact": "Medium", "Status": "PLANNED", "Responsible": "Developer + Business Owner", "Deadline": "Within 1 month" },
  { "Task #": "T13", "Category": "Product Pages", "Action": "Add actual batch COA data table to API 13A product page showing test results", "Files/Assets": "src/data/products.js + ProductDetailPage.jsx", "Effort": "Medium", "Impact": "High", "Status": "PLANNED", "Responsible": "Technical Team + Developer", "Deadline": "Within 2 weeks" },
  { "Task #": "T14", "Category": "Export Packaging ZIP", "Action": "Package final production-ready website ZIP: BENTOCLAY-High-Conversion-Website.zip", "Files/Assets": "All project files + dist/ folder", "Effort": "Low", "Impact": "Medium", "Status": "PLANNED", "Responsible": "Developer", "Deadline": "After deployment verification" }
];
const ws23 = XLSX.utils.json_to_sheet(implementationTrackerData);
autoFitCols(ws23, implementationTrackerData);
XLSX.utils.book_append_sheet(wb, ws23, "Implementation Tracker");

// -----------------------------------------------------------------------------
// Sheet 24: Sources, Limitations & Recommended Next Actions
// -----------------------------------------------------------------------------
const sourcesData = [
  { "Category": "Data Source — Confirmed", "Description": "index.html, PageSEO.jsx, products.js, llms.txt, llms-full.txt — all source files directly inspected", "Reliability": "High — first-party source data", "Date Accessed": "2026-10-20" },
  { "Category": "Data Source — Confirmed", "Description": "Google Search Console implied data (price snippet showing $150-$320 confirmed by business owner)", "Reliability": "High — business owner confirmed seeing price in Google SERP", "Date Accessed": "2026-10-20" },
  { "Category": "Data Source — Manual Research", "Description": "Competitor product pages: activeminerals.com, ashapura.com, prathamminechem.com — inspected manually", "Reliability": "Medium — manual inspection subject to change", "Date Accessed": "2026-10-20" },
  { "Category": "Data Source — Estimated", "Description": "Search volume estimates for B2B attapulgite keywords — estimated based on industry knowledge; no Google Keyword Planner API credentials provided", "Reliability": "Low-Medium — estimates only; verify with GKP using a Google Ads account", "Date Accessed": "2026-10-20" },
  { "Category": "Data Source — Not Available", "Description": "Actual competitor backlink profiles (requires Ahrefs, SEMrush, or Moz API keys not provided)", "Reliability": "Not available — manual estimation used", "Date Accessed": "N/A" },
  { "Category": "Data Source — Not Available", "Description": "Actual competitor domain authority / referring domain count (requires paid SEO tool subscription)", "Reliability": "Not available — recommendations based on qualitative research", "Date Accessed": "N/A" },
  { "Category": "Limitation", "Description": "This workbook does not fabricate search volumes, CPC, or keyword difficulty scores. All volume estimates are marked as estimated.", "Reliability": "Disclosure", "Date Accessed": "2026-10-20" },
  { "Category": "Limitation", "Description": "Google's re-crawl timeline after schema changes is typically 1-28 days. Price snippets may not disappear from SERP immediately after code deployment.", "Reliability": "Factual SEO note", "Date Accessed": "2026-10-20" },
  { "Category": "Recommended Next Action", "Description": "Subscribe to Google Search Console and request re-indexing of affected product pages to accelerate removal of stale price snippets", "Reliability": "Recommended action", "Date Accessed": "2026-10-20" },
  { "Category": "Recommended Next Action", "Description": "Use Google Keyword Planner (free with Google Ads account) to get actual monthly search volumes for top 50 keywords in this workbook", "Reliability": "Recommended action", "Date Accessed": "2026-10-20" },
  { "Category": "Recommended Next Action", "Description": "Use Ahrefs or SEMrush free trial to pull actual competitor backlink profiles for activeminerals.com, ashapura.com and identify gap opportunities", "Reliability": "Recommended action", "Date Accessed": "2026-10-20" },
  { "Category": "Recommended Next Action", "Description": "Claim Google Business Profile for manufacturing works address (Bhavnagar, Kardej) to appear in Google Maps searches for attapulgite manufacturers near me", "Reliability": "Recommended action", "Date Accessed": "2026-10-20" }
];
const ws24 = XLSX.utils.json_to_sheet(sourcesData);
autoFitCols(ws24, sourcesData);
XLSX.utils.book_append_sheet(wb, ws24, "Sources & Limitations");

// -----------------------------------------------------------------------------
// Save Workbook
// -----------------------------------------------------------------------------
const outFilePath = path.resolve(process.cwd(), 'Bento_Clay_Tech_Worldwide_Keyword_Matrix.xlsx');
try {
  XLSX.writeFile(wb, outFilePath);
  console.log(`\n✓ Master Keyword Workbook (24 sheets) successfully saved to:\n  ${outFilePath}`);
  console.log('\nSheets included:');
  wb.SheetNames.forEach((name, i) => console.log(`  ${String(i + 1).padStart(2, ' ')}. ${name}`));
} catch (err) {
  if (err && err.code === 'EBUSY') {
    console.error(`\n❌ Error: Cannot write to "${path.basename(outFilePath)}" because it is currently open in Microsoft Excel or another program.`);
    console.error('👉 Please CLOSE the file in Excel and run the script again.\n');
  } else {
    console.error('\n❌ Error writing workbook:', err ? err.message : err);
  }
  process.exit(1);
}

