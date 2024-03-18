//1.creamos nuestro modelo
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
}

//2.creamos las UI
class UI {
    agregarCarroAlaLista(car) {
        const cartbody = document.getElementById('car-tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.year}</td>
        <td> <a href="#" class="delete">X</a></td>
        `;
        cartbody.appendChild(tr);
    }
    //agregando desde copia
    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#car-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    delete(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }
    clearFields() {
        document.getElementById('brand').value = '';
        document.getElementById('model').value = '';
        document.getElementById('year').value = '';
    }
}

//probando localStorage dedsde copia
class Store {

    static getCars() {
        let cars;
        if (localStorage.getItem('cars') === null) {
            cars = [];
        } else {
            cars = JSON.parse(localStorage.getItem('cars'));
        }
        return cars;
    }
    //probando desde copia
    static displayCars() {
        const cars = Store.getCars();

        cars.forEach(function (car) {
            const ui = new UI;
            ui.agregarCarroAlaLista(car);
        })
    }

    static addCar(car) {
        const cars = Store.getCars();
        cars.push(car);
        localStorage.setItem('cars', JSON.stringify(cars));
    }

    static removeCar(year) {
        const cars = Store.getCars();
        cars.forEach(function (car, index) {
            if (car.year === year) {
                cars.splice(index, 1);
            }
        });
        localStorage.setItem('cars', JSON.stringify(cars));
    }

}

//probando y agregando desde copia
document.addEventListener('DOMContentLoaded', Store.displayCars());
//... copia
document.getElementById('car-form').addEventListener('submit',
    function (e) {
        var brand = document.getElementById("brand").value;
        var model = document.getElementById("model").value;
        var year = document.getElementById("year").value;

        const car = new Car(brand, model, year); //asi se crea un objeto de la clase carro
        const ui = new UI(); //asi se crea un objeto de la clase

        //validando desde copia
        if (brand === '' || model === '' || year === '') {
            ui.showAlert('porfavor rellenar espacios', 'error');
        } else {
            ui.agregarCarroAlaLista(car)

            ui.showAlert('carro agregado', 'completado');
            Store.addCar(car);
            ui.clearFields();
        }

        e.preventDefault();
    });



//probando copia
document.getElementById('car-tbody').addEventListener('click', function (e) {
    const ui = new UI();
    ui.delete(e.target);

    Store.removeCar(e.target.parentElement.previousElementSibling.textContent)

    ui.showAlert('Carro Eliminado');
    e.preventDefault();
})