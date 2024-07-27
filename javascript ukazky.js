
/*
 const updateFormStep = () => {
     part.forEach( onePart => onePart.style.display = "none")
     part[currentStep].style.display = "flex"
    document.querySelector(`.part-${currentStep}`).style.display = "flex"
     stepNum.forEach(step => step.classList.remove("active"))
     stepNum[currentStep].classList.add("active");
 }


 const nextButton = (event) => {
     inputs.forEach( (input, index) => {
         if (input.value.length == 0) {
             errors[index].style.display = "block"

             input.addEventListener("change", ()=> {
                 errors[index].style.display = "none"
             })
         } else {
             event.preventDefault()
             currentStep++
             updateFormStep()
         }
     })
 }

 const backButton = (event) => {
     event.preventDefault()
     currentStep = (currentStep - 1 + part.length) % part.length
     updateFormStep()
 }
 updateFormStep();
*/





/**AI 
 const stepNum = document.querySelectorAll(".step-num");
 const part = document.querySelectorAll(".prt");
 const inputs = document.querySelectorAll(".input");
 const errors = document.querySelectorAll(".error");
 let currentStep = 0;

 const updateFormStep = () => {
     part.forEach(onePart => onePart.style.display = "none");
     part[currentStep].style.display = "flex";

     stepNum.forEach(step => step.classList.remove("active"));
     stepNum[currentStep].classList.add("active");
 }

 const validateInputs = () => {
     let allValid = true;
     inputs.forEach((input, index) => {
         if (input.value.length === 0) {
             errors[index].style.display = "block";

             input.addEventListener("change", () => {
                 if (input.value.length !== 0) {
                     errors[index].style.display = "none";
                 }
             });
             allValid = false;
         }
     });
     return allValid;
 }

 const nextButton = (event) => {
     event.preventDefault();
     if (validateInputs()) {
         currentStep++;
         updateFormStep();
     }
 }

 const backButton = (event) => {
     event.preventDefault();
     currentStep = (currentStep - 1 + part.length) % part.length;
     updateFormStep();
 }

 updateFormStep();
*/