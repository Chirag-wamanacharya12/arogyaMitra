// Global variables for current record
let selectedRecordIndex = null;

// Function to render upcoming medications
function renderUpcomingMedications() {
    const tbody = document.querySelector("#upcomingMedicationTable tbody");
    tbody.innerHTML = '';
    demoMedications.upcoming.forEach((medication, index) => {
        const row = `<tr>
            <td>${medication.name}</td>
            <td>${medication.dosage}</td>
            <td>${medication.frequency}</td>
            <td>${medication.startDate}</td>
            <td>${medication.endDate}</td>
            <td>${medication.notes}</td>
            <td><button onclick="openModifyPopup(${index})">Modify</button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Function to render history medications
function renderHistory() {
    const historyTable = document.querySelector("#historyTable tbody");
    historyTable.innerHTML = '';
    demoMedications.history.forEach(medication => {
        const row = `<tr>
            <td>${medication.name}</td>
            <td>${medication.dosage}</td>
            <td>${medication.frequency}</td>
            <td>${medication.startDate}</td>
            <td>${medication.endDate}</td>
            <td>${medication.notes}</td>
        </tr>`;
        historyTable.innerHTML += row;
    });
}

// Function to open Modify Medication popup
function openModifyPopup(index) {
    const medication = demoMedications.upcoming[index];
    selectedRecordIndex = index;

    document.getElementById("modifyName").value = medication.name;
    document.getElementById("modifyDosage").value = medication.dosage;
    document.getElementById("modifyFrequency").value = medication.frequency;
    document.getElementById("modifyStartDate").value = medication.startDate;
    document.getElementById("modifyEndDate").value = medication.endDate;
    document.getElementById("modifyNotes").value = medication.notes;

    document.getElementById("modifyMedicationPopup").style.display = "block";
}

// Function to modify a medication
document.getElementById("modifyMedicationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const updatedMedication = {
        name: document.getElementById("modifyName").value,
        dosage: document.getElementById("modifyDosage").value,
        frequency: document.getElementById("modifyFrequency").value,
        startDate: document.getElementById("modifyStartDate").value,
        endDate: document.getElementById("modifyEndDate").value,
        notes: document.getElementById("modifyNotes").value
    };

    demoMedications.upcoming[selectedRecordIndex] = updatedMedication;
    renderUpcomingMedications();
    closePopup("modifyMedicationPopup");
});

// Function to delete medication
document.getElementById("deleteMedicationBtn").addEventListener("click", function () {
    demoMedications.upcoming.splice(selectedRecordIndex, 1);
    renderUpcomingMedications();
    closePopup("modifyMedicationPopup");
});

// Open and close popups
document.getElementById("addMedicationBtn").addEventListener("click", () => {
    document.getElementById("addMedicationPopup").style.display = "block";
});

document.getElementById("historyBtn").addEventListener("click", () => {
    renderHistory();
    document.getElementById("historyPopup").style.display = "block";
});

document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        closePopup(closeBtn.parentElement.parentElement.id);
    });
});

function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

// Initially render upcoming medications
renderUpcomingMedications();
