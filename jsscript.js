
        function calculate() {
            try {
                // Get values from inputs
                const value1 = parseFloat(document.getElementById('value_entry1').value);
                const value2 = parseFloat(document.getElementById('value_entry2').value);
                const value3 = parseFloat(document.getElementById('value_entry3').value);
                
                // Get value from UUCSetting_var select
                const standard_value = parseFloat(document.getElementById('UUCSetting_var').value);

                // Calculate uncertainty
                const values = [value1, value2, value3];
                const UU1 = standardDeviation(values);
                const U1 = UU1 / Math.sqrt(3);  // Adjusted standard deviation

                const UU2 = 0.1 / 2;
                const U2 = UU2 / Math.sqrt(3);
                const UU3 = 0.1 / 2;
                const U3 = UU3 / Math.sqrt(3);

                const average = (value1 + value2 + value3) / 3;  // Calculate average
                const UU4 = (average * 0.005);
                const U4 = UU4 / Math.sqrt(3);  // Calculate U4

                const U5 = 0 / 2;
                const U6 = 0.01 * Math.sqrt(3);

                const SUM = Math.sqrt((U1 ** 2) + (U2 ** 2) + (U3 ** 2) + (U4 ** 2) + (U5 ** 2) + (U6 ** 2));

                const x1 = (((SUM) ** 4) * 4);
                const x2 = U1 ** 4;
                const veff = x1 / x2;
                const U95 = 2 * SUM;

                // Calculate standard reading before displaying results
                const StandardReading = (value1 + value2 + value3) / 3;
                const result = StandardReading - standard_value;  
                const Error1 = Math.abs(result * (100 / standard_value));
                
                // Display results in HTML
                document.getElementById('result_label1').innerText = `Standard Reading: ${StandardReading.toFixed(2)} °C`;
                document.getElementById('result_label2').innerText = `Uncertainty: ±${SUM.toFixed(2)} °C`;
                document.getElementById('result_label5').innerText = `Error: ${result.toFixed(2)} °C`;
                document.getElementById('result_label4').innerText = `%Error: ${Error1.toFixed(2)} °C`;
                document.getElementById('result_label3').innerText = `%U-95%: ${U95.toFixed(2)} °C`;
                
                // Activate the result display when clicking the button
                const infant = document.querySelector(".infant");
            infant.classList.add("active"); // Add active class on button click
            
            // Reset the position after a short delay
            setTimeout(() => {
                infant.classList.remove("active"); // Remove active class after animation
            }, 1000); // Adjust time as needed
        } catch (error) {
            console.error('Error:', error);
        }
        }

        function standardDeviation(values, usePopulation = false) {
            // Calculate mean
            const mean = values.reduce((acc, val) => acc + val, 0) / values.length;

            // Calculate sum of squared differences
            const sumOfSquaredDifferences = values.reduce((acc, val) => acc + (val - mean) ** 2, 0);

            // Calculate standard deviation
            return Math.sqrt(sumOfSquaredDifferences / (values.length - (usePopulation ? 0 : 1)));
        }