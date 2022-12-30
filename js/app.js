/*
1. declar objcet
-------------
2. declar displaySevice function
3. call the funtion
4. get the main-container using id
5. create div element
6. div k main-container a display kora appenChild use kore
-----------
7. wite the function name handleBooking
8. parameter hobe object
9. JSON.stringify() use kore onClick handler er modde diye object a paTate hoy
10. handleBooking function a modde modal body k pete hobe
11. modal body er innerHTML er modde Card add korte hobe and daynamic vabe sob value dite hobe
12. card er submit button a onClick event handler add korte hobe
13. input er value niye calculate kore ভাড়া te set korte hobe
*/
const carObject = {
    vehicle: 'Car',
    imgUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    fareParKilo: 3,
    capacity: 4,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque perspiciatis accusamus."

}

const bikeObject = {
    vehicle: 'Bike',
    imgUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmlrZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
    fareParKilo: 4,
    capacity: 2,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque perspiciatis accusamus."

}

const busObject = {
    vehicle: 'Bus',
    imgUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    fareParKilo: 7,
    capacity: 30,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque perspiciatis accusamus."

}
const trainObject = {
    vehicle: 'Train',
    imgUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhaW58ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    fareParKilo: 65,
    capacity: 145,
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque perspiciatis accusamus."

}


const serviceArray = [carObject, bikeObject, busObject, trainObject];


function displayService(service) {
    const mainContainer = document.getElementById('main-container');
    const stringified = JSON.stringify(service);
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card my-3 mx-auto" style="max-width: 640px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${service.imgUrl}" class="img-fluid rounded-start h-100" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Transport Mode: ${service.vehicle}</h5>
                        <p class="card-text">${service.description}</p>
                        <p class="card-text"><small class="text-muted">Fare Par Kilo: ${service.fareParKilo}</small> <small class="text-muted">Capdity: ${service.capacity}</small></p>
                        <button type="button" onclick='handleBooking(${stringified})' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    mainContainer.appendChild(div);
}

// displayService(carObject);
// displayService(busObject);
// displayService(bikeObject);



function displayAllArticles(arr) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        displayService(element);
    }
}
displayAllArticles(serviceArray);



function handleBooking(obj) {
    const modalBody = document.getElementById('modal-body');
    const stringified = JSON.stringify(obj);
    modalBody.innerHTML = `
        <div class="card mx-auto" style="width: 20rem;">
        <img src=${obj.imgUrl} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Transfort Mode: ${obj.vehicle}</h5>

            <p>ভাড়া: <small id="fare" class="text-muted"></small></p>
            <p>ট্যাক্স: <small id="tax" class="text-muted"></small></p>
            <p>মোট খরচ: <small id="total-cost" class="text-muted"></small></p>

            <div class="d-flex flex-column" role="search">
                <input id="distance" class="form-control my-2" type="number" placeholder="কত কিলো যাব?" aria-label="Search">
                <input id="quantity" class="form-control my-2" type="number" placeholder="কয়টা গাড়ি লাগবে?" aria-label="Search">
                <button class="btn btn-outline-success" type="submit" onClick='calculateCost(${stringified})'>Submit</button>
            </div>
        </div>
        </div>
    `;
}



function calculateCost(obj) {
    const distance = document.getElementById('distance').value;
    const quantity = document.getElementById('quantity').value;
    const fare = document.getElementById('fare');
    const tax = document.getElementById('tax');
    const totalCostElement = document.getElementById('total-cost');
    if (distance < 1 || quantity < 1) {
        alert('সঠিক ভাবে ফর্ম ফিলাপ করোন!!')
        return;
    }
    const fareCost = distance * quantity * obj.fareParKilo;
    fare.innerText = fareCost;

    const totalTax = fareCost * (10 / 100);
    tax.innerText = totalTax;

    const totalCost = fareCost + totalTax;
    totalCostElement.innerText = totalCost;
}


document.getElementById('search-btn').addEventListener('click', function () {
    const searchValueInput = document.getElementById('search-input');
    const searchValue = searchValueInput.value;
    searchValueInput.value = "";

    for (let i = 0; i < serviceArray.length; i++) {
        const element = serviceArray[i];

        if (searchValue.toLowerCase() == element.vehicle.toLowerCase()) {
            document.getElementById("main-container").innerHTML = "";
            displayService(element);
            return;
        }
    }

})