// =============================================
// TRADING BUSINESS MANAGEMENT SYSTEM – Complete Dummy Data
// =============================================

export const COMPANY = {
  name: 'Trading Business Management System',
  tagline: 'Reliable Trading, Seamless Management',
  gstin: '27AABCM1234D1Z5',
  address: 'Plot No. 14, Sector 5, MIDC, Pune – 411018',
  phone: '+91 98765 43210',
  email: 'info@tbms.com',
};

// ── CUSTOMERS ──────────────────────────────
export const customers = [
  { id: 'C001', name: 'Rajesh Kumar Sharma', company: 'Alpha Industries Pvt Ltd', gstin: '27AABCA0001A1Z1', mobile: '9876543210', email: 'rajesh@alphaindustries.com', city: 'Pune', state: 'Maharashtra', creditLimit: 500000, paymentTerms: '30 Days', outstanding: 125000, status: 'Active' },
  { id: 'C002', name: 'Priya Mehta', company: 'Beta Enterprises', gstin: '27AABCB0002B1Z2', mobile: '9876543211', email: 'priya@betaent.com', city: 'Mumbai', state: 'Maharashtra', creditLimit: 300000, paymentTerms: '15 Days', outstanding: 45000, status: 'Active' },
  { id: 'C003', name: 'Amit Desai', company: 'Gamma Tech Solutions', gstin: '24AABCG0003C1Z3', mobile: '9876543212', email: 'amit@gammatech.com', city: 'Ahmedabad', state: 'Gujarat', creditLimit: 750000, paymentTerms: '45 Days', outstanding: 312000, status: 'Active' },
  { id: 'C004', name: 'Sunita Joshi', company: 'Delta Corp', gstin: '27AABCD0004D1Z4', mobile: '9876543213', email: 'sunita@deltacorp.com', city: 'Nagpur', state: 'Maharashtra', creditLimit: 200000, paymentTerms: 'Immediate', outstanding: 0, status: 'Active' },
  { id: 'C005', name: 'Vikram Singh', company: 'Epsilon Manufacturing', gstin: '09AABCE0005E1Z5', mobile: '9876543214', email: 'vikram@epsilonmfg.com', city: 'Lucknow', state: 'Uttar Pradesh', creditLimit: 1000000, paymentTerms: '60 Days', outstanding: 678000, status: 'Active' },
  { id: 'C006', name: 'Meena Patel', company: 'Zeta Pharma', gstin: '24AABCZ0006F1Z6', mobile: '9876543215', email: 'meena@zetapharma.com', city: 'Surat', state: 'Gujarat', creditLimit: 250000, paymentTerms: '30 Days', outstanding: 89000, status: 'Inactive' },
  { id: 'C007', name: 'Suresh Rajan', company: 'Eta Infra Ltd', gstin: '33AABCE0007G1Z7', mobile: '9876543216', email: 'suresh@etainfra.com', city: 'Chennai', state: 'Tamil Nadu', creditLimit: 600000, paymentTerms: '45 Days', outstanding: 210000, status: 'Active' },
  { id: 'C008', name: 'Kavita Nair', company: 'Theta Textiles', gstin: '32AABCT0008H1Z8', mobile: '9876543217', email: 'kavita@thetatextiles.com', city: 'Kochi', state: 'Kerala', creditLimit: 400000, paymentTerms: '30 Days', outstanding: 156000, status: 'Active' },
];

// ── VENDORS ───────────────────────────────
export const vendors = [
  { id: 'V001', name: 'Sanjay Gupta', company: 'Techno Components Pvt Ltd', gstin: '07AABCT0001A1Z1', mobile: '9811223344', email: 'sanjay@technocomp.com', city: 'Delhi', state: 'Delhi', bankName: 'HDFC Bank', accountNo: '12345678901234', ifsc: 'HDFC0001234', type: 'Equipment', outstanding: 85000, status: 'Active' },
  { id: 'V002', name: 'Ramesh Agarwal', company: 'Prime Spare Parts', gstin: '27AABCP0002B1Z2', mobile: '9822334455', email: 'ramesh@primespares.com', city: 'Pune', state: 'Maharashtra', bankName: 'SBI', accountNo: '98765432109876', ifsc: 'SBIN0001234', type: 'Spare Parts', outstanding: 35000, status: 'Active' },
  { id: 'V003', name: 'Neha Sharma', company: 'Volt Electricals', gstin: '27AABCV0003C1Z3', mobile: '9833445566', email: 'neha@voltelectrical.com', city: 'Nashik', state: 'Maharashtra', bankName: 'ICICI Bank', accountNo: '11223344556677', ifsc: 'ICIC0001234', type: 'Installation Material', outstanding: 12000, status: 'Active' },
  { id: 'V004', name: 'Arun Kumar', company: 'FastLogistics India', gstin: '06AABCF0004D1Z4', mobile: '9844556677', email: 'arun@fastlogistics.com', city: 'Gurugram', state: 'Haryana', bankName: 'Axis Bank', accountNo: '22334455667788', ifsc: 'UTIB0001234', type: 'Logistics', outstanding: 0, status: 'Active' },
  { id: 'V005', name: 'Pooja Verma', company: 'Global Tech Supplies', gstin: '07AABCG0005E1Z5', mobile: '9855667788', email: 'pooja@globaltech.com', city: 'Noida', state: 'Uttar Pradesh', bankName: 'Kotak Bank', accountNo: '33445566778899', ifsc: 'KKBK0001234', type: 'Equipment', outstanding: 145000, status: 'Active' },
];

// ── PRODUCTS ──────────────────────────────
export const products = [
  { id: 'P001', name: 'Industrial Air Compressor 5HP', code: 'IAC-5HP', category: 'Compressors', brand: 'Atlas Copco', model: 'GA5', hsn: '84141090', gst: 18, purchaseRate: 45000, salesRate: 62000, warranty: 24, unit: 'Nos', installRequired: true, serviceType: 'Preventive', stock: 8 },
  { id: 'P002', name: 'Industrial Air Compressor 10HP', code: 'IAC-10HP', category: 'Compressors', brand: 'Atlas Copco', model: 'GA10', hsn: '84141090', gst: 18, purchaseRate: 82000, salesRate: 115000, warranty: 24, unit: 'Nos', installRequired: true, serviceType: 'Preventive', stock: 5 },
  { id: 'P003', name: 'Water Purification System 1000 LPH', code: 'WPS-1000', category: 'Water Systems', brand: 'Aquapure', model: 'AP-1000', hsn: '84219900', gst: 18, purchaseRate: 38000, salesRate: 52000, warranty: 12, unit: 'Nos', installRequired: true, serviceType: 'AMC', stock: 12 },
  { id: 'P004', name: 'HVAC Split Unit 1.5 Ton', code: 'HVAC-15T', category: 'HVAC', brand: 'Daikin', model: 'FTKM35', hsn: '84151010', gst: 28, purchaseRate: 32000, salesRate: 45000, warranty: 12, unit: 'Nos', installRequired: true, serviceType: 'AMC', stock: 15 },
  { id: 'P005', name: 'Air Filter Cartridge', code: 'AFC-001', category: 'Spare Parts', brand: 'Generic', model: 'AFC-STD', hsn: '84213990', gst: 18, purchaseRate: 850, salesRate: 1400, warranty: 3, unit: 'Nos', installRequired: false, serviceType: 'None', stock: 120 },
  { id: 'P006', name: 'Pneumatic Valve 1/2 inch', code: 'PV-12', category: 'Spare Parts', brand: 'Festo', model: 'JMFH-5-1/2', hsn: '84818090', gst: 18, purchaseRate: 2200, salesRate: 3500, warranty: 6, unit: 'Nos', installRequired: false, serviceType: 'None', stock: 45 },
  { id: 'P007', name: 'Vacuum Pump 2HP', code: 'VP-2HP', category: 'Pumps', brand: 'Leybold', model: 'D16B', hsn: '84141020', gst: 18, purchaseRate: 28000, salesRate: 39000, warranty: 12, unit: 'Nos', installRequired: true, serviceType: 'Preventive', stock: 6 },
  { id: 'P008', name: 'Control Panel 3 Phase', code: 'CP-3P', category: 'Electrical', brand: 'Siemens', model: 'CP3-400V', hsn: '85371000', gst: 18, purchaseRate: 15000, salesRate: 22000, warranty: 12, unit: 'Nos', installRequired: true, serviceType: 'Preventive', stock: 10 },
];

// ── LEADS / CRM ───────────────────────────
export const leads = [
  { id: 'L001', name: 'Dinesh Patil', company: 'Patil Casting Works', mobile: '9870001111', email: 'dinesh@patilcasting.com', city: 'Kolhapur', source: 'Reference', product: 'Industrial Air Compressor 5HP', value: 65000, status: 'Hot', salesperson: 'Rohan Joshi', nextFollowup: '2026-04-10', notes: 'Very interested, asked for demo', stage: 'Quotation Shared', enquiryDate: '2026-03-28', conversionProb: 75 },
  { id: 'L002', name: 'Anita Sawant', company: 'Sawant Textiles', mobile: '9870002222', email: 'anita@sawanttextiles.com', city: 'Ichalkaranji', source: 'Website', product: 'HVAC Split Unit 1.5 Ton', value: 90000, status: 'Warm', salesperson: 'Priya Sharma', nextFollowup: '2026-04-12', notes: 'Comparing with other vendors', stage: 'Follow-up', enquiryDate: '2026-04-01', conversionProb: 40 },
  { id: 'L003', name: 'Ravi Tiwari', company: 'Tiwari Construction', mobile: '9870003333', email: 'ravi@tiwariconstruction.com', city: 'Pune', source: 'Cold Call', product: 'Water Purification System 1000 LPH', value: 55000, status: 'Cold', salesperson: 'Rohan Joshi', nextFollowup: '2026-04-20', notes: 'Not responding to calls', stage: 'Enquiry', enquiryDate: '2026-03-15', conversionProb: 10 },
  { id: 'L004', name: 'Seema Kulkarni', company: 'Kulkarni Food Processing', mobile: '9870004444', email: 'seema@kulkarnifood.com', city: 'Satara', source: 'Exhibition', product: 'Industrial Air Compressor 10HP', value: 120000, status: 'Hot', salesperson: 'Amit Verma', nextFollowup: '2026-04-09', notes: 'Wants delivery before May', stage: 'Negotiation', enquiryDate: '2026-04-02', conversionProb: 85 },
  { id: 'L005', name: 'Manoj Bhatt', company: 'Bhatt Auto Parts', mobile: '9870005555', email: 'manoj@bhattauto.com', city: 'Aurangabad', source: 'Reference', product: 'Vacuum Pump 2HP', value: 42000, status: 'Warm', salesperson: 'Priya Sharma', nextFollowup: '2026-04-15', notes: 'Trial machine requested', stage: 'Demo Scheduled', enquiryDate: '2026-04-03', conversionProb: 55 },
  { id: 'L006', name: 'Krishnakant Dave', company: 'Dave Engineering', mobile: '9870006666', email: 'krishna@daveeng.com', city: 'Nashik', source: 'Google Ads', product: 'Control Panel 3 Phase', value: 25000, status: 'Hot', salesperson: 'Amit Verma', nextFollowup: '2026-04-08', notes: 'Urgent requirement', stage: 'Order Confirmation', enquiryDate: '2026-04-05', conversionProb: 90 },
  { id: 'L007', name: 'Farida Sheikh', company: 'Sheikh Garments', mobile: '9870007777', email: 'farida@sheikhgarments.com', city: 'Mumbai', source: 'Social Media', product: 'HVAC Split Unit 1.5 Ton', value: 47000, status: 'Cold', salesperson: 'Rohan Joshi', nextFollowup: '2026-04-25', notes: 'Budget constraints', stage: 'Enquiry', enquiryDate: '2026-03-20', conversionProb: 15 },
  { id: 'L008', name: 'Deepak Nair', company: 'Nair Plastics Pvt Ltd', mobile: '9870008888', email: 'deepak@nairplastics.com', city: 'Thane', source: 'Reference', product: 'Industrial Air Compressor 5HP', value: 63000, status: 'Warm', salesperson: 'Amit Verma', nextFollowup: '2026-04-11', notes: 'Interested, confirming internal budget', stage: 'Quotation Shared', enquiryDate: '2026-04-04', conversionProb: 50 },
];

// ── SALES ORDERS ──────────────────────────
export const salesOrders = [
  { id: 'SO001', date: '2026-03-05', customer: 'C001', customerName: 'Alpha Industries Pvt Ltd', product: 'P001', productName: 'Industrial Air Compressor 5HP', qty: 2, rate: 62000, amount: 124000, gst: 22320, total: 146320, type: 'Credit', status: 'Delivered', installStatus: 'Completed', paymentStatus: 'Paid', salesperson: 'Rohan Joshi' },
  { id: 'SO002', date: '2026-03-10', customer: 'C002', customerName: 'Beta Enterprises', product: 'P003', productName: 'Water Purification System 1000 LPH', qty: 1, rate: 52000, amount: 52000, gst: 9360, total: 61360, type: 'Cash', status: 'Delivered', installStatus: 'Completed', paymentStatus: 'Paid', salesperson: 'Priya Sharma' },
  { id: 'SO003', date: '2026-03-15', customer: 'C003', customerName: 'Gamma Tech Solutions', product: 'P002', productName: 'Industrial Air Compressor 10HP', qty: 1, rate: 115000, amount: 115000, gst: 20700, total: 135700, type: 'Credit', status: 'Delivered', installStatus: 'Pending', paymentStatus: 'Partial', salesperson: 'Amit Verma' },
  { id: 'SO004', date: '2026-03-20', customer: 'C005', customerName: 'Epsilon Manufacturing', product: 'P004', productName: 'HVAC Split Unit 1.5 Ton', qty: 4, rate: 45000, amount: 180000, gst: 50400, total: 230400, type: 'Credit', status: 'Dispatched', installStatus: 'Scheduled', paymentStatus: 'Unpaid', salesperson: 'Rohan Joshi' },
  { id: 'SO005', date: '2026-03-25', customer: 'C007', customerName: 'Eta Infra Ltd', product: 'P007', productName: 'Vacuum Pump 2HP', qty: 2, rate: 39000, amount: 78000, gst: 14040, total: 92040, type: 'Cash', status: 'Delivered', installStatus: 'Completed', paymentStatus: 'Paid', salesperson: 'Priya Sharma' },
  { id: 'SO006', date: '2026-04-01', customer: 'C001', customerName: 'Alpha Industries Pvt Ltd', product: 'P005', productName: 'Air Filter Cartridge', qty: 20, rate: 1400, amount: 28000, gst: 5040, total: 33040, type: 'Credit', status: 'Delivered', installStatus: 'N/A', paymentStatus: 'Paid', salesperson: 'Amit Verma' },
  { id: 'SO007', date: '2026-04-03', customer: 'C004', customerName: 'Delta Corp', product: 'P008', productName: 'Control Panel 3 Phase', qty: 1, rate: 22000, amount: 22000, gst: 3960, total: 25960, type: 'Cash', status: 'Processing', installStatus: 'Pending', paymentStatus: 'Paid', salesperson: 'Rohan Joshi' },
  { id: 'SO008', date: '2026-04-06', customer: 'C008', customerName: 'Theta Textiles', product: 'P001', productName: 'Industrial Air Compressor 5HP', qty: 1, rate: 62000, amount: 62000, gst: 11160, total: 73160, type: 'Credit', status: 'Confirmed', installStatus: 'Not Scheduled', paymentStatus: 'Unpaid', salesperson: 'Amit Verma' },
];

// ── PURCHASES ─────────────────────────────
export const purchases = [
  { id: 'PO001', date: '2026-03-02', vendor: 'V001', vendorName: 'Techno Components Pvt Ltd', product: 'P001', productName: 'Industrial Air Compressor 5HP', qty: 5, rate: 45000, amount: 225000, gst: 40500, total: 265500, status: 'Received', paymentStatus: 'Paid' },
  { id: 'PO002', date: '2026-03-08', vendor: 'V002', vendorName: 'Prime Spare Parts', product: 'P005', productName: 'Air Filter Cartridge', qty: 100, rate: 850, amount: 85000, gst: 15300, total: 100300, status: 'Received', paymentStatus: 'Paid' },
  { id: 'PO003', date: '2026-03-12', vendor: 'V001', vendorName: 'Techno Components Pvt Ltd', product: 'P002', productName: 'Industrial Air Compressor 10HP', qty: 3, rate: 82000, amount: 246000, gst: 44280, total: 290280, status: 'Received', paymentStatus: 'Partial' },
  { id: 'PO004', date: '2026-03-18', vendor: 'V005', vendorName: 'Global Tech Supplies', product: 'P004', productName: 'HVAC Split Unit 1.5 Ton', qty: 6, rate: 32000, amount: 192000, gst: 53760, total: 245760, status: 'Received', paymentStatus: 'Unpaid' },
  { id: 'PO005', date: '2026-03-22', vendor: 'V003', vendorName: 'Volt Electricals', product: 'P008', productName: 'Control Panel 3 Phase', qty: 3, rate: 15000, amount: 45000, gst: 8100, total: 53100, status: 'Received', paymentStatus: 'Paid' },
  { id: 'PO006', date: '2026-04-01', vendor: 'V002', vendorName: 'Prime Spare Parts', product: 'P006', productName: 'Pneumatic Valve 1/2 inch', qty: 30, rate: 2200, amount: 66000, gst: 11880, total: 77880, status: 'In Transit', paymentStatus: 'Unpaid' },
  { id: 'PO007', date: '2026-04-04', vendor: 'V001', vendorName: 'Techno Components Pvt Ltd', product: 'P007', productName: 'Vacuum Pump 2HP', qty: 4, rate: 28000, amount: 112000, gst: 20160, total: 132160, status: 'Ordered', paymentStatus: 'Unpaid' },
];

// ── EXPENSES ──────────────────────────────
export const expenses = [
  { id: 'E001', date: '2026-04-01', category: 'Travel', desc: 'Site visit – Gamma Tech, Ahmedabad', amount: 3500, submittedBy: 'Rohan Joshi', project: 'SO003', paymentMethod: 'Cash', status: 'Approved' },
  { id: 'E002', date: '2026-04-01', category: 'Office', desc: 'Stationery and printing', amount: 1200, submittedBy: 'Admin', project: 'Office', paymentMethod: 'Cash', status: 'Approved' },
  { id: 'E003', date: '2026-04-02', category: 'Installation', desc: 'Labour charges – Alpha Industries AC install', amount: 8500, submittedBy: 'Sunil Yadav', project: 'SO001', paymentMethod: 'Cash', status: 'Approved' },
  { id: 'E004', date: '2026-04-02', category: 'Fuel', desc: 'Diesel for service van', amount: 2800, submittedBy: 'Raju Driver', project: 'Service', paymentMethod: 'Cash', status: 'Approved' },
  { id: 'E005', date: '2026-04-03', category: 'Hotel', desc: 'Client meeting – Mumbai stay', amount: 4500, submittedBy: 'Priya Sharma', project: 'Lead', paymentMethod: 'Account', status: 'Approved' },
  { id: 'E006', date: '2026-04-03', category: 'Service', desc: 'Tools and consumables for service call', amount: 950, submittedBy: 'Manoj Tiwari', project: 'Complaint', paymentMethod: 'Cash', status: 'Approved' },
  { id: 'E007', date: '2026-04-04', category: 'Food', desc: 'Team lunch after site visit', amount: 2200, submittedBy: 'Amit Verma', project: 'SO004', paymentMethod: 'Cash', status: 'Pending' },
  { id: 'E008', date: '2026-04-05', category: 'Repair', desc: 'Vehicle repair – service bike', amount: 3800, submittedBy: 'Workshop', project: 'Admin', paymentMethod: 'Cash', status: 'Approved' },
  { id: 'E009', date: '2026-04-06', category: 'Travel', desc: 'Train fare – Pune to Nashik', amount: 620, submittedBy: 'Rohan Joshi', project: 'Lead', paymentMethod: 'Cash', status: 'Approved' },
  { id: 'E010', date: '2026-04-07', category: 'Misc', desc: 'Courier charges', amount: 350, submittedBy: 'Admin', project: 'Office', paymentMethod: 'Cash', status: 'Approved' },
  { id: 'E011', date: '2026-04-08', category: 'Installation', desc: 'Labour – Epsilon HVAC installation', amount: 12000, submittedBy: 'Sunil Yadav', project: 'SO004', paymentMethod: 'Account', status: 'Pending' },
];

// ── COMPLAINTS / SERVICE ───────────────────
export const complaints = [
  { id: 'CMP001', date: '2026-03-28', customer: 'C001', customerName: 'Alpha Industries Pvt Ltd', product: 'Industrial Air Compressor 5HP', machine: 'IAC-5HP-S001', type: 'Warranty', priority: 'High', status: 'Resolved', engineer: 'Manoj Tiwari', complaintDesc: 'Compressor not building pressure', resolution: 'Replaced pressure switch', partsUsed: 'Pressure Switch x1', cost: 0, openDate: '2026-03-28', closeDate: '2026-03-30', tat: 2, satisfaction: 'Good' },
  { id: 'CMP002', date: '2026-04-01', customer: 'C003', customerName: 'Gamma Tech Solutions', product: 'Industrial Air Compressor 10HP', machine: 'IAC-10HP-S001', type: 'Non-Warranty', priority: 'Medium', status: 'In Progress', engineer: 'Sunil Yadav', complaintDesc: 'Abnormal noise during startup', resolution: '', partsUsed: 'Bearing kit', cost: 3500, openDate: '2026-04-01', closeDate: null, tat: null, satisfaction: '' },
  { id: 'CMP003', date: '2026-04-03', customer: 'C007', customerName: 'Eta Infra Ltd', product: 'Vacuum Pump 2HP', machine: 'VP-2HP-S001', type: 'Warranty', priority: 'Low', status: 'Open', engineer: 'Manoj Tiwari', complaintDesc: 'Pump not starting', resolution: '', partsUsed: '', cost: 0, openDate: '2026-04-03', closeDate: null, tat: null, satisfaction: '' },
  { id: 'CMP004', date: '2026-04-05', customer: 'C002', customerName: 'Beta Enterprises', product: 'Water Purification System 1000 LPH', machine: 'WPS-1000-S001', type: 'AMC', priority: 'Medium', status: 'Scheduled', engineer: 'Ravi Kumar', complaintDesc: 'Scheduled quarterly maintenance', resolution: '', partsUsed: 'Filter set', cost: 2800, openDate: '2026-04-05', closeDate: null, tat: null, satisfaction: '' },
];

// ── INSTALLATIONS ─────────────────────────
export const installations = [
  { id: 'INS001', salesOrder: 'SO001', customer: 'Alpha Industries Pvt Ltd', product: 'Industrial Air Compressor 5HP', site: 'Plot 12, MIDC, Pune', scheduledDate: '2026-03-08', completedDate: '2026-03-09', engineer: 'Sunil Yadav', status: 'Completed', warrantyStart: '2026-03-09', warrantyEnd: '2028-03-09' },
  { id: 'INS002', salesOrder: 'SO002', customer: 'Beta Enterprises', product: 'Water Purification System 1000 LPH', site: 'Andheri East, Mumbai', scheduledDate: '2026-03-12', completedDate: '2026-03-12', engineer: 'Ravi Kumar', status: 'Completed', warrantyStart: '2026-03-12', warrantyEnd: '2027-03-12' },
  { id: 'INS003', salesOrder: 'SO003', customer: 'Gamma Tech Solutions', product: 'Industrial Air Compressor 10HP', site: 'Naroda GIDC, Ahmedabad', scheduledDate: '2026-04-10', completedDate: null, engineer: 'Sunil Yadav', status: 'Scheduled', warrantyStart: null, warrantyEnd: null },
  { id: 'INS004', salesOrder: 'SO004', customer: 'Epsilon Manufacturing', product: 'HVAC Split Unit 1.5 Ton (x4)', site: 'Lucknow Factory', scheduledDate: '2026-04-15', completedDate: null, engineer: 'Manoj Tiwari', status: 'Pending', warrantyStart: null, warrantyEnd: null },
];

// ── EMPLOYEES / ATTENDANCE ─────────────────
export const employees = [
  { id: 'EMP001', name: 'Rohan Joshi', role: 'Sales Executive', department: 'Sales', mobile: '9901234567', email: 'rohan@tbms.com', joinDate: '2024-01-15' },
  { id: 'EMP002', name: 'Priya Sharma', role: 'Sales Executive', department: 'Sales', mobile: '9901234568', email: 'priya@tbms.com', joinDate: '2024-03-01' },
  { id: 'EMP003', name: 'Amit Verma', role: 'Senior Sales Executive', department: 'Sales', mobile: '9901234569', email: 'amit@tbms.com', joinDate: '2023-06-15' },
  { id: 'EMP004', name: 'Sunil Yadav', role: 'Installation Engineer', department: 'Technical', mobile: '9901234570', email: 'sunil@tbms.com', joinDate: '2023-08-01' },
  { id: 'EMP005', name: 'Manoj Tiwari', role: 'Service Engineer', department: 'Technical', mobile: '9901234571', email: 'manoj@tbms.com', joinDate: '2024-02-10' },
  { id: 'EMP006', name: 'Ravi Kumar', role: 'Service Engineer', department: 'Technical', mobile: '9901234572', email: 'ravi@tbms.com', joinDate: '2024-04-01' },
  { id: 'EMP007', name: 'Raju Driver', role: 'Driver', department: 'Logistics', mobile: '9901234573', email: 'raju@tbms.com', joinDate: '2025-01-01' },
];

export const attendance = [
  { id: 'A001', empId: 'EMP001', name: 'Rohan Joshi', date: '2026-04-08', punchIn: '09:05', punchOut: '18:45', location: 'Pune Office', status: 'Present', travel: 12 },
  { id: 'A002', empId: 'EMP002', name: 'Priya Sharma', date: '2026-04-08', punchIn: '09:30', punchOut: '18:15', location: 'Mumbai Field', status: 'Present', travel: 48 },
  { id: 'A003', empId: 'EMP003', name: 'Amit Verma', date: '2026-04-08', punchIn: '08:55', punchOut: '19:10', location: 'Nashik Field', status: 'Present', travel: 165 },
  { id: 'A004', empId: 'EMP004', name: 'Sunil Yadav', date: '2026-04-08', punchIn: '08:30', punchOut: '17:30', location: 'Ahmedabad Site', status: 'Present', travel: 235 },
  { id: 'A005', empId: 'EMP005', name: 'Manoj Tiwari', date: '2026-04-08', punchIn: null, punchOut: null, location: '', status: 'Absent', travel: 0 },
  { id: 'A006', empId: 'EMP006', name: 'Ravi Kumar', date: '2026-04-08', punchIn: '10:15', punchOut: null, location: 'Pune Office', status: 'Late', travel: 8 },
  { id: 'A007', empId: 'EMP007', name: 'Raju Driver', date: '2026-04-08', punchIn: '07:45', punchOut: '19:30', location: 'Field', status: 'Present', travel: 310 },
];

// ── WARRANTY CLAIMS ────────────────────────
export const warrantyClaims = [
  { id: 'WC001', product: 'Industrial Air Compressor 5HP', productName: 'Industrial Air Compressor 5HP', srNo: 'IAC-5HP-S001', customerName: 'Alpha Industries Pvt Ltd', vendorName: 'Techno Components Pvt Ltd', date: '2026-03-29', issue: 'Pressure switch failure', status: 'Approved', claimAmount: 850, recoveryAmount: 750 },
  { id: 'WC002', product: 'HVAC Split Unit 1.5 Ton', productName: 'HVAC Split Unit 1.5 Ton', srNo: 'HVAC-15T-S003', customerName: 'Eta Infra Ltd', vendorName: 'Global Tech Supplies', date: '2026-04-04', issue: 'Compressor noise', status: 'Pending', claimAmount: 4500, recoveryAmount: 0 },
  { id: 'WC003', product: 'Water Purification System', productName: 'Water Purification System 1000 LPH', srNo: 'WPS-1000-S001', customerName: 'Beta Enterprises', vendorName: 'Techno Components Pvt Ltd', date: '2026-03-20', issue: 'Membrane replacement', status: 'Rejected', claimAmount: 6000, recoveryAmount: 0 },
];

// ── BILTY / DISPATCH ───────────────────────
export const bilties = [
  { id: 'B001', date: '2026-03-06', salesOrder: 'SO001', customer: 'Alpha Industries Pvt Ltd', transporter: 'FastLogistics India', lrNo: 'FL-23456', dispatchDate: '2026-03-06', deliveryDate: '2026-03-08', status: 'Delivered', weight: '280 kg', freight: 3500 },
  { id: 'B002', date: '2026-03-11', salesOrder: 'SO002', customer: 'Beta Enterprises', transporter: 'Blue Dart', lrNo: 'BD-78901', dispatchDate: '2026-03-11', deliveryDate: '2026-03-12', status: 'Delivered', weight: '120 kg', freight: 1800 },
  { id: 'B003', date: '2026-03-21', salesOrder: 'SO004', customer: 'Epsilon Manufacturing', transporter: 'FastLogistics India', lrNo: 'FL-23789', dispatchDate: '2026-03-21', deliveryDate: null, status: 'In Transit', weight: '480 kg', freight: 8500 },
  { id: 'B004', date: '2026-04-04', salesOrder: 'SO007', customer: 'Delta Corp', transporter: 'DTDC', lrNo: 'DTDC-45678', dispatchDate: '2026-04-04', deliveryDate: '2026-04-06', status: 'Delivered', weight: '35 kg', freight: 650 },
];

// ── FINANCIAL SUMMARY ─────────────────────
export const financialSummary = {
  currentMonth: 'April 2026',
  totalRevenue: { cash: 145920, account: 395040, total: 540960 },
  totalPurchase: { cash: 100300, account: 264800, total: 365100 },
  totalExpenses: { cash: 27470, account: 16500, total: 43970 },
  grossProfit: { cash: 17950, account: 113740, total: 131890 }, // monthly figures 2026-04
  netProfit: { cash: 17950 - 27470, account: 113740 - 16500, total: 131890 - 43970 },
  receivable: 1459920,
  payable: 432560,
  cashInHand: 87350,
};

// ── MONTHLY TREND (for charts) ─────────────
export const monthlyTrend = [
  { month: 'Oct', sales: 420000, purchase: 285000, expenses: 38000, profit: 97000 },
  { month: 'Nov', sales: 510000, purchase: 320000, expenses: 42000, profit: 148000 },
  { month: 'Dec', sales: 685000, purchase: 410000, expenses: 55000, profit: 220000 },
  { month: 'Jan', sales: 580000, purchase: 350000, expenses: 48000, profit: 182000 },
  { month: 'Feb', sales: 490000, purchase: 305000, expenses: 41000, profit: 144000 },
  { month: 'Mar', sales: 762000, purchase: 455000, expenses: 62000, profit: 245000 },
  { month: 'Apr', sales: 540960, purchase: 365100, expenses: 43970, profit: 131890 },
];

export const expenseByCategory = [
  { name: 'Installation', value: 20500 },
  { name: 'Travel', value: 4120 },
  { name: 'Office', value: 1200 },
  { name: 'Fuel', value: 2800 },
  { name: 'Hotel', value: 4500 },
  { name: 'Service', value: 950 },
  { name: 'Food', value: 2200 },
  { name: 'Repair', value: 3800 },
  { name: 'Misc', value: 350 },
];
