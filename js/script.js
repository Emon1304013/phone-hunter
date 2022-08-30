const loadPhones = async(searcText,dataLimit) =>
{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searcText}`;
    
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit); 
}

const displayPhones = (phones,dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;
    const showAllButton = document.getElementById('btn-show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAllButton.classList.remove('d-none');
    }

    else{
        showAllButton.classList.add('d-none');
    }
    const notFoundMessage = document.getElementById('not-found');

    if(phones.length === 0){
        notFoundMessage.classList.remove('d-none');
    }
    else{
        notFoundMessage.classList.add('d-none');
    }
    phones.forEach(phone => {
        // console.log(phone);
        // [phone_name,image,]
        
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');

        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top p-4 img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${phone.phone_name}</h5>
                <p class="card-text text-center">A device of Apple</p>
            </div>
            <div class="card-footer text-center">
            <button class="btn btn-primary" role="button" onclick = "loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
            </div>
        </div>
        
        `
        phonesContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    loadPhones(inputFieldValue,dataLimit);
    console.log(dataLimit);
}


document.getElementById('input-field').addEventListener("keypress",function(event){
    if(event.key == "Enter"){
        processSearch(10);
    }
})

document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(10);
    
})

const loadPhoneDetails = async(phoneId) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data);
    
}

const displayPhoneDetails = (phone) =>{
    const {brand,mainFeatures,name} = phone.data;
    const {storage,displaySize,chipSet,memory} = mainFeatures;
 
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <ul>
        <li>${storage ? storage : "No Storage Details Found"}</li>
        <li>${displaySize}</li>
        <li>${chipSet}</li>
        <li>${memory}</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
    
    
    `
}

document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})

const toggleSpinner = (isLoading) =>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}

loadPhones('iphone');