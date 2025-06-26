class CarManager {
    constructor() {
        this.cars = [
            {
                id: 1,
                title: "Malibu",
                brand: "Chevrolet",
                year: 2022,
                type: "Sedan",
                color: "Oq",
                price: 25000,
                engine: "Benzin",
                dateAdded: "2024-01-15"
            },
            {
                id: 2,
                title: "Captiva",
                brand: "Chevrolet",
                year: 2020,
                type: "SUV",
                color: "Qora",
                price: 22000,
                engine: "Dizel",
                dateAdded: "2024-01-16"
            }
        ];
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
        this.updateStats();
    }

    bindEvents() {
        document.getElementById('carForm').addEventListener('submit', (e) => this.handleSubmit(e));
        document.getElementById('cancelBtn').addEventListener('click', () => this.cancelEdit());
        document.getElementById('refreshBtn').addEventListener('click', () => this.updateDisplay());
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = {
            title: document.getElementById('carTitle').value.trim(),
            brand: document.getElementById('carBrand').value.trim(),
            year: parseInt(document.getElementById('carYear').value),
            type: document.getElementById('carType').value,
            color: document.getElementById('carColor').value.trim(),
            price: parseFloat(document.getElementById('carPrice').value),
            engine: document.getElementById('carEngine').value.trim(),
            dateAdded: new Date().toISOString().split('T')[0]
        };

        if (this.currentEditId !== null) {
            this.updateCar(this.currentEditId, formData);
        } else {
            this.createCar(formData);
        }

        this.resetForm();
        this.updateDisplay();
        this.updateStats();
    }

    createCar(carData) {
        const car = {
            id: Date.now(),
            ...carData
        };
        this.cars.push(car);
        this.showNotification('Avtomobil muvaffaqiyatli qo\'shildi!', 'success');
    }

    readCars() {
        return this.cars;
    }

    updateCar(id, newData) {
        const index = this.cars.findIndex(car => car.id === id);
        if (index !== -1) {
            this.cars[index] = { ...this.cars[index], ...newData };
            this.showNotification('Avtomobil muvaffaqiyatli yangilandi!', 'info');
        }
    }

    deleteCar(id) {
        if (confirm('Bu avtomobilni o\'chirmoqchimisiz?')) {
            this.cars = this.cars.filter(car => car.id !== id);
            this.updateDisplay();
            this.updateStats();
            this.showNotification('Avtomobil muvaffaqiyatli o\'chirildi!', 'warning');
        }
    }

    editCar(id) {
        const car = this.cars.find(car => car.id === id);
        if (car) {
            this.currentEditId = id;

            document.getElementById('carTitle').value = car.title;
            document.getElementById('carBrand').value = car.brand;
            document.getElementById('carYear').value = car.year;
            document.getElementById('carType').value = car.type;
            document.getElementById('carColor').value = car.color;
            document.getElementById('carPrice').value = car.price;
            document.getElementById('carEngine').value = car.engine;

            document.getElementById('formTitle').textContent = 'Avtomobilni Tahrirlash';
            document.getElementById('submitBtn').textContent = 'Yangilash';
            document.getElementById('cancelBtn').style.display = 'block';

            document.getElementById('carTitle').focus();
        }
    }

    cancelEdit() {
        this.currentEditId = null;
        this.resetForm();
    }

    resetForm() {
        document.getElementById('carForm').reset();
        document.getElementById('formTitle').textContent = 'Yangi Avtomobil Qo\'shish';
        document.getElementById('submitBtn').textContent = 'Saqlash';
        document.getElementById('cancelBtn').style.display = 'none';
        this.currentEditId = null;
    }

    // ...existing code...
updateDisplay() {
    const container = document.getElementById('carsContainer');
    const cars = this.readCars();

    if (cars.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-car"></i>
                <h5>Hozircha avtomobillar yo'q</h5>
                <p>Yangi avtomobil qo'shish uchun chap tarafdagi formani to'ldiring</p>
            </div>
        `;
        return;
    }

    const tableHTML = `
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Avtomobil Nomi</th>
                        <th>Brend</th>
                        <th>Yil</th>
                        <th>Turi</th>
                        <th>Rangi</th>
                        <th>Narxi ($)</th>
                        <th>Dvigatel</th>
                        <th>Qo'shilgan Sana</th>
                        <th>Amallar</th>
                    </tr>
                </thead>
                <tbody>
                    ${cars.map(car => `
                        <tr>
                            <td><strong>${car.title}</strong></td>
                            <td>${car.brand}</td>
                            <td>${car.year}</td>
                            <td><span class="badge bg-primary">${car.type}</span></td>
                            <td>${car.color || ''}</td>
                            <td>${car.price ? car.price.toLocaleString() : ''}</td>
                            <td>${car.engine || ''}</td>
                            <td>${car.dateAdded}</td>
                            <td>
                                <div class="d-flex gap-1">
                                    <button class="btn btn-warning btn-sm" onclick="carManager.editCar(${car.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="carManager.deleteCar(${car.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = tableHTML;
}
// ...existing code...

    updateStats() {
        const totalCars = this.cars.length;
        const today = new Date().toISOString().split('T')[0];
        const todayAdded = this.cars.filter(car => car.dateAdded === today).length;
        const lastUpdate = this.cars.length > 0 ?
            new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }) : '-';

        document.getElementById('totalCars').textContent = totalCars;
        document.getElementById('todayAdded').textContent = todayAdded;
        document.getElementById('lastUpdate').textContent = lastUpdate;
    }

    showNotification(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'success' ? 'success' : type === 'info' ? 'info' : 'warning'} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 3000);
    }
}


const carManager = new CarManager();