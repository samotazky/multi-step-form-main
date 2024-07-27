const stepNum = document.querySelectorAll(".step-num")
const step = document.querySelectorAll('.step')
const tabs = document.querySelectorAll(".tab")
const inputs = document.querySelectorAll(".input")
const errors = document.querySelectorAll(".error")
const nextBtn = document.querySelector(".btn-next")
const backBtn = document.querySelector(".btn-back")
const checkbox = document.querySelectorAll(".checkbox")

let currentTab = 0

const obj = {
    plan: null,
    kind: null,
    price: null
}


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
                if (input.value.length > 0 ) {
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
};


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
const plans = document.querySelectorAll(".box")

plans.forEach(onePlan => {
    onePlan.addEventListener("click", () => {
        plans.forEach(plan => plan.classList.remove("active-selection"))
        onePlan.classList.add("active-selection")
    })
})


// 2. step checkbox(btn-switch)
const switchSlider = document.getElementById("switchSlider")
switchSlider.addEventListener("change", () => {
    const arcadePrice = document.getElementById('arcade-price');
    const advancedPrice = document.getElementById('advanced-price');
    const proPrice = document.getElementById('pro-price');

    if (switchSlider.checked) {
        arcadePrice.textContent = "$90/yr"
        advancedPrice.textContent = "$120/yr"
        proPrice.textContent = "$150/yr"
    } else {
        arcadePrice.textContent = "$9/mo"
        advancedPrice.textContent = "$12/mo"
        proPrice.textContent = "$15/mo"
    }
})

// 3.step checkbox
checkbox.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            this.closest('li').classList.add("active-selection")
        } else {
            this.closest('li').classList.remove("active-selection");
        }
    })
})