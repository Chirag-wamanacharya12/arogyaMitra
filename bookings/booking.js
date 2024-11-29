document.addEventListener('DOMContentLoaded', () => {
    const upcomingBookings = [
        {
            date: 'October 10, 2024',
            time: '10:00 AM',
            clinic: 'City Health Clinic'
        },
        {
            date: 'October 15, 2024',
            time: '12:30 PM',
            clinic: 'Wellness Center'
        },
        {
            date: 'October 22, 2024',
            time: '03:00 PM',
            clinic: 'Downtown Clinic'
        }
    ];

    const completedBookings = [
        {
            date: 'September 15, 2024',
            time: '09:00 AM',
            clinic: 'City Health Clinic'
        },
        {
            date: 'September 10, 2024',
            time: '11:00 AM',
            clinic: 'Wellness Center'
        },
        {
            date: 'September 8, 2024',
            time: '02:00 PM',
            clinic: 'Downtown Clinic'
        },
        {
            date: 'August 29, 2024',
            time: '01:00 PM',
            clinic: 'City Health Clinic'
        },
        // Add 8 more completed bookings here...
    ];

    // Function to create and append booking records
    function createBookingRecord(booking, isUpcoming) {
        const recordDiv = document.createElement('div');
        recordDiv.classList.add('booking-record');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('booking-info');
        infoDiv.innerHTML = `<p><strong>Date:</strong> ${booking.date}</p>
                             <p><strong>Time:</strong> ${booking.time}</p>
                             <p><strong>Clinic:</strong> ${booking.clinic}</p>`;

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-container');

        const viewDetailsBtn = document.createElement('button');
        viewDetailsBtn.classList.add('view-details-btn');
        viewDetailsBtn.innerText = 'View Details';

        if (isUpcoming) {
            const rescheduleBtn = document.createElement('button');
            rescheduleBtn.classList.add('reschedule-btn');
            rescheduleBtn.innerText = 'Reschedule';
            buttonDiv.appendChild(rescheduleBtn);
        } else {
            const checkReportsBtn = document.createElement('button');
            checkReportsBtn.classList.add('check-reports-btn');
            checkReportsBtn.innerText = 'Check Reports';
            buttonDiv.appendChild(checkReportsBtn);
        }

        buttonDiv.appendChild(viewDetailsBtn);
        recordDiv.appendChild(infoDiv);
        recordDiv.appendChild(buttonDiv);

        return recordDiv;
    }

    // Populate upcoming bookings
    const upcomingBookingsDiv = document.getElementById('upcoming-bookings');
    upcomingBookings.forEach(booking => {
        const record = createBookingRecord(booking, true);
        upcomingBookingsDiv.appendChild(record);
    });

    // Populate completed bookings
    const completedBookingsDiv = document.getElementById('completed-bookings');
    completedBookings.forEach(booking => {
        const record = createBookingRecord(booking, false);
        completedBookingsDiv.appendChild(record);
    });
});
