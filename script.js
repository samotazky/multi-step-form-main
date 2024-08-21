const stepNum = document.querySelectorAll(".step-num")
const step = document.querySelectorAll('.step')
const tabs = document.querySelectorAll(".tab")
const inputs = document.querySelectorAll(".input")
const errors = document.querySelectorAll(".error")
const nextBtn = document.querySelector(".btn-next")
const backBtn = document.querySelector(".btn-back")
const checkboxes = document.querySelectorAll(".checkbox")

let currentTab = 0

const showTab = (n) => {
    tabs[n].style.display = "flex"
}
showTab(currentTab)

// 1. Tab
const nextPrevTab = (n) => {
    let allValid = true;

    inputs.forEach((input, index) => {
        if (input.value.length == 0) {
            errors[index].style.display = "block";
            allValid = false;

            input.addEventListener("change", () => {
                if (input.value.length > 0) {
                    errors[index].style.display = "none"
                }
            })
        } else {
            errors[index].style.display = "none";
        }
    });

    if (allValid) {
        tabs[currentTab].style.display = "none";
        currentTab += n;
        showTab(currentTab);
        updateStep();
    }
}

const submitBtn = (n) => {
    tabs[currentTab].style.display = "none";
    currentTab += n;
    showTab(currentTab);
}

const validateForm = () => {
    inputs.forEach((input, index) => {
        if (input.value.length == 0) {
            errors[index].style.display = "block"
            return valid = false
        } else {
            errors[index].style.display = "none"
            return valid = true
        }
    })
}

const updateStep = () => {
    stepNum.forEach(oneStep => oneStep.classList.remove("active"))
    stepNum[currentTab].classList.add("active")
}

// 2. Plans
const obj = {
    plan: null,
    price: null,

}

const plans = document.querySelectorAll(".box")
plans.forEach((onePlan) => {
    onePlan.addEventListener("click", () => {
        plans.forEach(plan => plan.classList.remove("active-selection"))
        onePlan.classList.add("active-selection")

        updateObjPrice(onePlan)
        updateFinalTab()
    })
})

const updateObjPrice = (plan) => {
    const planName = plan.querySelector(".plan-name").textContent;
    const price = plan.querySelector(".price").textContent;

    obj.plan = planName
    obj.price = price
    return obj
}

// SwitchSlider
const switchSlider = document.getElementById("switchSlider")
switchSlider.addEventListener("change", () => {
    const priceType = switchSlider.checked ? 'yearly' : 'monthly';

    const prices = {
        arcade: { monthly: "$9/mo", yearly: "$90/yr" },
        advanced: { monthly: "$12/mo", yearly: "$120/yr" },
        pro: { monthly: "$15/mo", yearly: "$150/yr" }
    };

    // Aktualizujte ceny na stránke
    const planPrices = {
        arcade: document.getElementById("arcade-price"),
        advanced: document.getElementById("advanced-price"),
        pro: document.getElementById("pro-price")
    };

    for (const [plan, priceElement] of Object.entries(planPrices)) {
        priceElement.textContent = prices[plan][priceType];
    }

    const prices1 = {
        onlineService: { monthly: "+$1/mo", yearly: "+$10/yr" },
        largeStorage: { monthly: "+$2/mo", yearly: "+$20/yr" },
        customizableProfile: { monthly: "+$2/mo", yearly: "+$20/yr" }
    }

    const addPrices = {
        onlineService: document.getElementById("service-price"),
        largeStorage: document.getElementById("storage-price"),
        customizableProfile: document.getElementById("profile-price"),
    }

    for (const [adds, priceElement] of Object.entries(addPrices)) {
        priceElement.textContent = prices1[adds][priceType]
    }

    // Aktualizujte obj, ak je plán vybraný
    const selectedPlanElement = document.querySelector(".active-selection");
    if (selectedPlanElement) {
        updateObjPrice(selectedPlanElement);
    }

    updateFinalTab()
});


// 3.step checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            this.closest('li').classList.add("active-selection")
        } else {
            this.closest('li').classList.remove("active-selection");
        }

        updateFinalTab()
    })
})

// 4. total review 
const changeBtn = () => {
    tabs[currentTab].style.display = "none";
    currentTab = 1
    showTab(currentTab)
    updateStep()
}

const updateFinalTab = () => {
    obj.addOns = []

    const finalPlan = document.querySelector(".selected-plan")
    const finalPlanPrice = document.querySelector(".plan-price")
    finalPlan.textContent = obj.plan
    finalPlanPrice.textContent = obj.price

    // chytenie checkbox text a price už len vypísať selected v poslednom tabe
    const finalAddOns = document.querySelector(".selected-add-ons")
    const checkboxText = document.querySelectorAll(".add-on h4")
    const checkboxPrice = document.querySelectorAll(".add-ons span")

    // vyčisti predchádzajúci obsah
    finalAddOns.innerHTML = ""


    // Prejsť cez všetky checkboxy a pridať iba zaškrtnuté add-ons
    checkboxes.forEach((cb, idx) => {
        if (cb.checked) {
            let selectedAddOn = document.createElement("div")
            selectedAddOn.classList.add("selected-add-on")
            let textElement = document.createElement("p")
            textElement.classList.add("selected-add-on-text")
            let priceElement = document.createElement("p")
            priceElement.classList.add("selected-add-on-price")

            textElement.textContent = checkboxText[idx].textContent
            priceElement.textContent = checkboxPrice[idx].textContent

            selectedAddOn.appendChild(textElement)
            selectedAddOn.appendChild(priceElement)
            finalAddOns.appendChild(selectedAddOn)

            obj.addOns.push({
                name: checkboxText[idx].textContent,
                price: parseInt(checkboxPrice[idx].textContent.replace(/\D/g, ''))
            })

            let planPrice = parseInt(obj.price.replace(/\D/g, '')); // Odstráni všetky nečíselné znaky a ponechá číslo

            // Potom prejdeš cez addOns a spočítaš ich ceny
            let totalAddOnsPrice = obj.addOns.reduce((total, addOn) => {
                return total + addOn.price;
            }, 0);

            // Spočítaš cenu plánu a doplnkov
            let totalPrice = planPrice + totalAddOnsPrice;
            let finalPrice = document.querySelector(".final-price")
            finalPrice.textContent = totalPrice + "$"
        }
    })
    return obj
}



updateFinalTab()