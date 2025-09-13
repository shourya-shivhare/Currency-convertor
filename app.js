const BASE_URL = "https://cdn.jsdelivr.net/gh/fawadahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector("msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateRate = async () => {
    let amount = document.querySelector(".Amount input");
    let amtValue = amount.value;
    console.log(amtValue);
    if(amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(response);
    console.log(data);
    let rate = data[toCurr.value.toLowerCase()];
    
    let finalAmount = amtValue*rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    updateRate();
});

window.addEventListener = ("load" ,() => {
    updateRate();
}) 

