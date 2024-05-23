"use strict";
let fv;
let currentValue = 0;
var KTWizardPage = (function () {
    var t,
        e,
        o,
        r,
        i = [];
    return {
        init: function () {
            (t = document.querySelector("#kt_stepper")),
                (e = document.querySelector("#kt_stepper_form")),
                (o = document.querySelector('[data-kt-stepper-action="submit"]')),
                (r = new KTStepper(t)).on("kt.stepper.next", function (t) {
                    console.log("stepper.next");
                    var e = i[t.getCurrentStepIndex() - 1];
                    e
                        ? e.validate().then(function (e) {
                            // console.log("validated!"),
                            "Valid" == e
                                ? (t.goNext(), KTUtil.scrollTop())
                                : Swal.fire({
                                    text: "Looks like there are some missing fields, please complete all the required fields.",
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: { confirmButton: "btn fw-bold btn-light" },
                                }).then(function () {
                                    KTUtil.scrollTop();
                                });
                        })
                        : (t.goNext(), KTUtil.scrollTop());
                }),
                r.on("kt.stepper.previous", function (t) {
                    //console.log("stepper.previous"),
                    t.goPrevious(), KTUtil.scrollTop();
                }),
                o.addEventListener("click", function (t) {
                    t.preventDefault(),
                        Swal.fire({
                            text: "All is good! Please confirm the form submission.",
                            icon: "success",
                            showCancelButton: !0,
                            buttonsStyling: !1,
                            confirmButtonText: "Yes, submit!",
                            cancelButtonText: "No, cancel",
                            customClass: { confirmButton: "btn fw-bold btn-primary sendtxn", cancelButton: "btn fw-bold btn-active-light-primary" },
                        }).then(function (t) {
                            t.value
                                ? e.submit()
                                : "cancel" === t.dismiss &&
                                Swal.fire({ text: "Your form has not been submitted!.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn fw-bold btn-primary" } });
                        });
                }),
                i.push(
                    FormValidation.formValidation(e, {
                        fields: { 'radio_buttons_1[]': { validators: { choice: { min: 1, max: 1, message: 'Please choose a contract type.' } } } },
                        plugins: { trigger: new FormValidation.plugins.Trigger(), bootstrap: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".fv" }) },
                    })
                ),
                i.push(
                    FormValidation.formValidation(e, {
                        fields: { comnpanyname: { validators: { notEmpty: { message: "Account name is required" } } } },
                        plugins: { trigger: new FormValidation.plugins.Trigger(), bootstrap: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".fv-row" }) },
                    })
                ),
                i.push(
                    FormValidation.formValidation(e, {
                        fields: {
                            Owners: { validators: { notEmpty: { message: "Please enter a # of owners" } } },
                            Requirement: { validators: { notEmpty: { message: "Please enter a requirement #" } } },
                            Pin: { validators: { notEmpty: { message: "Pin is required" } } },
                        },
                        plugins: { trigger: new FormValidation.plugins.Trigger(), bootstrap: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".fv-row" }) },
                    })
                ),
                i.push(
                    FormValidation.formValidation(e, {
                        fields: {
                            'owneraddress[]': { validators: { notEmpty: { message: "Please enter a owners" } } }},
                        plugins: { trigger: new FormValidation.plugins.Trigger(), bootstrap: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".fv-row" }) },
                    })
                ),

            fv = i;

        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTWizardPage.init();
});


function clearArray(arr) {
    arr.length = 0;
}


let radio1 = document.getElementById('kt_radio_buttons_1_option_1');
radio1.addEventListener('click', function(){

    let contractType = document.getElementById('review_type')
    contractType.innerText = this.value;

})  


document.addEventListener('DOMContentLoaded', function () {
    const initialField = document.getElementById('initialField');
    const additionalFieldsContainer = document.getElementById('additionalFields');
    const nextButton = document.getElementById('listener');

    nextButton.addEventListener('click', function () {
        // Clear existing fields every time the input value changes
        const numberOfFields = parseInt(initialField.value, 10) || null;

        console.log(`numberOfFields: `+numberOfFields+` currentValue: `+currentValue);
       



        if(currentValue === numberOfFields ){

            let reviewContainer = document.getElementById('reviewContainer');
            reviewContainer.innerHTML = '';

            let companyname = document.getElementById('companyname');
            let review_name = document.getElementById('review_name').innerText;
            
            let Pin = document.getElementById('Pin');
            let review_pin = document.getElementById('review_pin').innerText;
            
            let Owner = document.getElementById('initialField');
            let review_owner = document.getElementById('review_owners').innerText;
            
            let Requirement = document.getElementById('Requirement');
            let review_requirement = document.getElementById('review_requirement').innerText;


            for (let i = 0; i < numberOfFields; i++){

                const reviewInput = document.createElement('div');
                reviewInput.classList.add("fv-row");
                reviewInput.classList.add("mb-10");
                let f = `owner_`+i;
                let put = document.getElementById(f);
            
                reviewInput.innerHTML = `
                        <label class="fs-6 form-label fw-bolder text-dark form-label">Account Owner: </label>
            
                        <span class="form-text ">${put.value}</span>
                `
            
                reviewContainer.appendChild(reviewInput);


            }

        }


        if (currentValue != numberOfFields) {
            console.log(fv);
            clearArray(fv[3].elements['owneraddress[]']);
            fv[3].results.clear();
    

            additionalFieldsContainer.innerHTML = `
            <div class="pb-10 pb-lg-15">
            <h3 class="fw-bolder text-dark display-6">Add Owners</h3>
            <div class="text-muted fw-bold fs-3">Enter addresses that will own this account</div>
            </div>
            `;

            currentValue = numberOfFields;


            for (let i = 0; i < numberOfFields; i++) {
                console.log('i: '+i)
                console.log('numberOFFIelds: '+numberOfFields)
                let f = `owner_`+i;
                let q = `owneraddress[${i}]`




                const newInput = document.createElement('div');
                newInput.classList.add("fv-row");
                newInput.classList.add("mb-10");

                newInput.innerHTML = `<label class="fs-6 form-label fw-bolder text-dark">Owner
                </label>
                <input type="text" class="form-control form-control-lg form-control-solid" name="owneraddress[${i}]" placeholder="Provide an owner address." value=""/ id="${f}">`

                additionalFieldsContainer.appendChild(newInput);


                let put = document.getElementById(f);
                fv[3].elements[`owneraddress[]`].push(put)



            }
            console.log(fv);




        }











    });
});



