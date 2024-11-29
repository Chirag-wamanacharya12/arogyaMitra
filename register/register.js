document.getElementById('user-type').addEventListener('change', function() {
    const userType = this.value;
    const conditionalFields = document.getElementById('conditional-fields');

    if (userType === 'guest') {
        conditionalFields.style.display = 'none'; // No additional fields for guest
        conditionalFields.innerHTML = ''; 
    } else {
        conditionalFields.style.display = 'block'; // Show fields for other users
        conditionalFields.innerHTML = ''; 

        // Additional fields based on user type
        let extraFields = '';

        // Common Fields for all users (except guest)
        extraFields += `
            <label for="full-name">Full Name:</label>
            <input type="text" id="full-name" name="full-name" required>

            <label for="phone-number">Phone Number:</label>
            <input type="tel" id="phone-number" name="phone-number" required>

            <label for="address">Address:</label>
            <textarea id="address" name="address" required></textarea>

            <label for="subscription-plan">Subscription Plan:</label>
            <select id="subscription-plan" name="subscription-plan" required>
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="exclusive">Exclusive</option>
            </select>
        `;

        // Patient-specific fields
        if (userType === 'patient') {
            extraFields += `
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required>

                <div class="gender">
                <label for="gender">Gender:</label>
                <span><lable>Male</lable><input type="radio" id="male" name="gender" value="Male" required></span>
                <span><lable>Female</lable><input type="radio" id="female" name="gender" value="Female" required></span>
                <span><lable>Other</lable><input type="radio" id="other" name="gender" value="Other" required></span>
                </div>

                <label for="medical-history">Medical History:</label>
                <textarea id="medical-history" name="medical-history"></textarea>

                <label for="insurance-number">Insurance Number:</label>
                <input type="text" id="insurance-number" name="insurance-number" required>

                <label for="emergency-contact">Emergency Contact:</label>
                <input type="text" id="emergency-contact" name="emergency-contact" required>
            `;
        }

        // Physician-specific fields
        else if (userType === 'physician') {
            extraFields += `
                <label for="license">Medical License Number:</label>
                <input type="text" id="license" name="license" required>

                <label for="specialization">Specialization:</label>
                <input type="text" id="specialization" name="specialization" required>

                <label for="experience">Years of Experience:</label>
                <input type="number" id="experience" name="experience" required>

                <label for="hospital-affiliation">Hospital Affiliation:</label>
                <input type="text" id="hospital-affiliation" name="hospital-affiliation" required>

                <label for="consultation-fee">Consultation Fee:</label>
                <input type="number" id="consultation-fee" name="consultation-fee" required>
            `;
        }

        // Practitioner-specific fields
        else if (userType === 'practitioner') {
            extraFields += `
                <label for="practice-area">Practice Area:</label>
                <select id="practice-area" name="practice-area" required>
                    <option value="physical-therapy">Physical Therapy</option>
                    <option value="dietetics">Dietetics</option>
                    <option value="counseling">Counseling</option>
                </select>

                <label for="certification">Certification Details:</label>
                <input type="text" id="certification" name="certification" required>

                <label for="years-of-practice">Years of Practice:</label>
                <input type="number" id="years-of-practice" name="years-of-practice" required>

                <label for="consultation-location">Consultation Location:</label>
                <input type="text" id="consultation-location" name="consultation-location" required>
            `;
        }

        // Researcher-specific fields
        else if (userType === 'researcher') {
            extraFields += `
                <label for="institution">Research Institution:</label>
                <input type="text" id="institution" name="institution" required>

                <label for="research-area">Research Area:</label>
                <input type="text" id="research-area" name="research-area" required>

                <label for="publications">Research Publications/Projects:</label>
                <textarea id="publications" name="publications"></textarea>

                <label for="funding-source">Funding Source:</label>
                <input type="text" id="funding-source" name="funding-source" required>
            `;
        }

        // Service Provider-specific fields
        else if (userType === 'service-provider') {
            extraFields += `
                <label for="service-type">Service Type:</label>
                <input type="text" id="service-type" name="service-type" required>

                <label for="company-name">Company Name:</label>
                <input type="text" id="company-name" name="company-name" required>

                <label for="business-license">Business License Number:</label>
                <input type="text" id="business-license" name="business-license" required>

                <label for="years-in-service">Years in Service:</label>
                <input type="number" id="years-in-service" name="years-in-service" required>
            `;
        }

        // Health Content Creator-specific fields with categories
        else if (userType === 'health-content-creator') {
            extraFields += `
                <label for="platform">Platform:</label>
                <input type="text" id="platform" name="platform" required>

                <label for="content-category">Content Category:</label>
                <select id="content-category" name="content-category" required>
                    <option value="preventive-health">Preventive Health</option>
                    <option value="chronic-disease-management">Chronic Disease Management</option>
                    <option value="mental-health">Mental Health</option>
                    <option value="nutrition-and-diet">Nutrition and Diet</option>
                    <option value="fitness-and-exercise">Fitness and Exercise</option>
                    <option value="maternal-child-health">Maternal and Child Health</option>
                    <option value="reproductive-health">Reproductive Health</option>
                    <option value="aging-elder-care">Aging and Elder Care</option>
                    <option value="medications-and-treatments">Medications and Treatments</option>
                    <option value="healthcare-policy-trends">Healthcare Policy and Trends</option>
                    <option value="alternative-medicine">Alternative and Complementary Medicine</option>
                    <option value="health-technology">Health Technology</option>
                </select>

                <label for="portfolio">Portfolio/Content Links:</label>
                <textarea id="portfolio" name="portfolio"></textarea>

                <label for="years-of-content-creation">Years of Content Creation:</label>
                <input type="number" id="years-of-content-creation" name="years-of-content-creation" required>
            `;
        }

        // Insert the generated fields into the form
        conditionalFields.innerHTML = extraFields;
    }
});
