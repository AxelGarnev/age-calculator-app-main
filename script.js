// VARIABLES

const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const yearsAge = document.getElementById('years-result');
const monthsAge = document.getElementById('months-result');
const daysAge = document.getElementById('days-result');

const calculateButton = document.getElementById('calculate');

const actualDate = new Date();

// INITIALISATION

dayInput.focus();

// FUNCTIONS

function checkDate() {

}

function checkDay() {

    const maxLength = 2;
    const dayValue = dayInput.value;

    // Keep user from inputing more than 2 digits
    if (dayValue.length > maxLength) {
        dayValue = dayValue.slice(0, maxLength);
        dayInput.value = dayValue;
    }

    // When input is 2 digits
    if (dayValue.length == maxLength) {
        monthInput.focus();
        isValidDay();
    }
}

function isValidDay() {

    const maxLength = 2;
    const dayValue = dayInput.value;

    if (dayValue >= 1 && dayValue <= 31 && dayValue.length == maxLength) {
        document.getElementById('day-label').classList.remove('error');
        dayInput.classList.remove('error');
        document.getElementById('day-error').classList.add('hide');
        return true;
    } else {
        document.getElementById('day-label').classList.add('error');
        dayInput.classList.add('error');
        document.getElementById('day-error').classList.remove('hide');
        return false;
    }
}

function checkMonth() {
    // Keep user from inputing more than 2 digits
    const maxLength = 2;
    const monthValue = monthInput.value;

    if (monthValue.length > maxLength) {
        monthValue = monthValue.slice(0, maxLength);
        monthInput.value = monthValue;
    }

    if (monthValue.length == maxLength) {
        yearInput.focus();
        isValidMonth();
    }
}

function isValidMonth() {

    const maxLength = 2;
    const monthValue = monthInput.value;

    if (monthValue >= 1 && monthValue <= 12 && monthValue.length == maxLength) {
        document.getElementById('month-label').classList.remove('error');
        monthInput.classList.remove('error');
        document.getElementById('month-error').classList.add('hide');
        return true;
    } else {
        document.getElementById('month-label').classList.add('error');
        monthInput.classList.add('error');
        document.getElementById('month-error').classList.remove('hide');
        return false;
    }

}

function checkYear() {
    // Keep user from inputing more than 4 digits
    const maxLength = 4;
    const yearValue = yearInput.value;
    const monthValue = monthInput.value;
    const dayValue = dayInput.value;

    if (yearValue.length > maxLength) {
        yearValue = yearValue.slice(0, maxLength);
        yearInput.value = yearValue;
    }

    if (yearValue.length == maxLength) {
        isValidDate();
    }
}

function isValidDate() {
    const yearValue = yearInput.value;
    const monthValue = monthInput.value;
    const dayValue = dayInput.value;

    const maxMonthDays = getDaysMonth(monthValue, yearValue);


    // Check is dayValue is <= maxMonthDays
    if (dayValue <= maxMonthDays) {
        if (isValidDay && isValidMonth) {
            const birthdayDate = new Date(yearValue + '-' + monthValue + '-' + dayValue);
            if (birthdayDate < actualDate) {
                document.getElementById('year-label').classList.remove('error');
                yearInput.classList.remove('error');
                document.getElementById('year-error').classList.add('hide');
                calculateButton.disabled = false;
                return true;
            } else {
                document.getElementById('year-label').classList.add('error');
                yearInput.classList.add('error');
                document.getElementById('year-error').classList.remove('hide');
                calculateButton.disabled = true;
                return false;
            }
        }
    } else {
        document.getElementById('day-label').classList.add('error');
        dayInput.classList.add('error');
        document.getElementById('day-error').classList.remove('hide');
        calculateButton.disabled = true;
        return false;
    }
}

function getDaysMonth(month, year) {
    return new Date(year, month, 0).getDate();
}


function calculate() {
    // Construct a Date object with the date entered by the user
    const enteredDate = new Date(parseInt(yearInput.value), parseInt((monthInput.value) - 1), parseInt(dayInput.value));

    // Calculate the difference between this date and today's date in milliseconds and then in days
    const timeDifference = (actualDate.getTime()) - (enteredDate.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate the results from the difference in days
    const yearsResult = Math.floor((daysDifference) / 30.4375 / 12);
    const monthsResult = Math.floor(daysDifference / 30.4375 - yearsResult * 12);
    const daysResult = Math.floor(daysDifference - yearsResult * 365.25 - monthsResult * 30.4375);

    yearsAge.innerHTML = yearsResult;
    monthsAge.innerHTML = monthsResult;
    daysAge.innerHTML = daysResult;
}

// EVENT

calculateButton.addEventListener("click", calculate);

dayInput.addEventListener('input', checkDay);

monthInput.addEventListener('input', checkMonth);

yearInput.addEventListener('input', checkYear);