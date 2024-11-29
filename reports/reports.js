const reportsData = [
    "Discharge Summary",
    "History and Physical Report",
    "Progress Notes",
    "Consultation Report",
    "Referral Report",
    "Emergency Room Report",
    "Telemedicine Report",
    "Operative Report",
    "Radiology Report",
    "Pathology Report",
    "Laboratory Report",
    "Immunization Record",
    "Allergy Report",
    "Genetic Counseling Report",
    "Psychiatric Evaluation Report",
    "Rehabilitation Report",
    "Nursing Report",
    "Home Health Care Report",
    "Palliative Care Report"
];

const clinics = [
    "Sunshine Hospital", 
    "Central Health Clinic", 
    "General Health Center", 
    "City Medical", 
    "Green Valley Hospital", 
    "Family Health Clinic",
    "Downtown Medical Center",
    "Healthy Living Clinic",
    "Community Health Services",
    "Wellness Hospital",
    "Hope Clinic",
    "CareFirst Clinic"
];

// Function to generate random date
function getRandomDate(start, end) {
    const date = new Date(+start + Math.random() * (end - start));
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

// Function to create records dynamically
function createReportRecords() {
    const reportsContainer = document.getElementById('reports');

    reportsData.forEach(reportType => {
        const reportDiv = document.createElement('div');
        reportDiv.classList.add('report');

        const reportHeader = document.createElement('div');
        reportHeader.classList.add('report-header');
        reportHeader.innerHTML = `<h3>${reportType}</h3> <span class="delete-icon" onclick="deleteReport(this)">&times;</span>`;
        
        const reportRecords = document.createElement('div');
        reportRecords.classList.add('report-records');

        for (let i = 0; i < 3; i++) {
            const recordDiv = document.createElement('div');
            recordDiv.classList.add('record');

            const recordInfo = document.createElement('div');
            recordInfo.classList.add('record-info');
            recordInfo.innerHTML = `
                <span>Date: ${getRandomDate(new Date(2023, 0, 1), new Date())}</span>
                <span>Clinic: ${clinics[Math.floor(Math.random() * clinics.length)]}</span>
                <span>Agenda: ${reportType} conducted for various health assessments.</span>
            `;

            const recordActions = document.createElement('div');
            recordActions.classList.add('record-actions');
            recordActions.innerHTML = `
                <button class="view-btn">View Report</button>
                <button class="analysis-btn">Analysis</button>
                <button class="consulted-btn">Consulte again</button>
            `;

            recordDiv.appendChild(recordInfo);
            recordDiv.appendChild(recordActions);
            reportRecords.appendChild(recordDiv);
        }

        reportDiv.appendChild(reportHeader);
        reportDiv.appendChild(reportRecords);
        reportsContainer.appendChild(reportDiv);
    });
}

// Function to delete a report
function deleteReport(element) {
    const reportDiv = element.closest('.report');
    reportDiv.remove();
}

// Initialize report records on page load
createReportRecords();
