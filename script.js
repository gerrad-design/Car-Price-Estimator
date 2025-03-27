// Car models data
const carModels = {
    Toyota: ["Corolla", "Camry", "RAV4", "Highlander"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot"],
    Ford: ["Focus", "Fusion", "Escape", "Explorer"],
    Chevrolet: ["Malibu", "Equinox", "Traverse", "Silverado"],
    BMW: ["3 Series", "5 Series", "X3", "X5"],
    "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE"],
    Audi: ["A3", "A4", "Q5", "Q7"],
    Volkswagen: ["Golf", "Jetta", "Tiguan", "Passat"],
    Nissan: ["Altima", "Sentra", "Rogue", "Murano"],
    Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe"],
    Kia: ["Rio", "Optima", "Sportage", "Sorento"],
    Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
};

// Reference form elements
const brandSelect = document.getElementById("car-brand");
const modelSelect = document.getElementById("car-model");
const yearSelect = document.getElementById("car-year");
const priceDisplay = document.getElementById("price-display");

// Exchange rate (1 USD to KES)
const USD_TO_KES = 130;

// Populate car models when brand is selected
brandSelect.addEventListener("change", function () {
    const selectedBrand = brandSelect.value;
    modelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';
    
    if (selectedBrand in carModels) {
        carModels[selectedBrand].forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
        modelSelect.disabled = false;
    } else {
        modelSelect.disabled = true;
    }
});

// Populate year dropdown from 2000 to current year
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= 2000; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}

// Estimate price function
document.getElementById("car-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const brand = brandSelect.value;
    const model = modelSelect.value;
    const year = yearSelect.value;

    if (!brand || !model || !year) {
        priceDisplay.textContent = "Please select all fields.";
        return;
    }

    const basePrice = {
        Toyota: 20000,
        Honda: 21000,
        Ford: 22000,
        Chevrolet: 23000,
        BMW: 80000,
        "Mercedes-Benz": 75000,
        Audi: 38000,
        Volkswagen: 25000,
        Nissan: 19000,
        Hyundai: 18000,
        Kia: 17500,
        Tesla: 50000,
    };

    let priceUSD = basePrice[brand] || 20000;

    // Adjust price based on model
    priceUSD += model.length * 100; // Simulated logic

    // Adjust price based on age
    const depreciation = (currentYear - year) * 800;
    priceUSD -= depreciation;

    priceUSD = Math.max(priceUSD, 5000); // Minimum price in USD

    // Convert to KES
    const priceKES = priceUSD * USD_TO_KES;

    priceDisplay.textContent = `Price: KES ${priceKES.toLocaleString()}`;
});

// Reset form
function resetForm() {
    document.getElementById("car-form").reset();
    modelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';
    modelSelect.disabled = true;
    priceDisplay.textContent = "Price: KES 0";
}
