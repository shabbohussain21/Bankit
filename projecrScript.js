'use strict';

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const Julia = [3, 5, 2, 12, 7];
// const Kate = [4, 1, 15, 8, 3];

// // const Julia = [9, 16, 6, 8, 3];
// // const Kate = [10, 5, 6, 1, 4];

// const checkDogs = function(dogsJulia, dogsKate){
//   // const copyJulia = dogsJulia;
//   const copyJuliaArray = dogsJulia.slice();
//   copyJuliaArray.splice(0,1);
//   // console.log(copyJuliaArray);
//   copyJuliaArray.splice(-2);
//   // console.log(copyJuliaArray);
//   const finalArray = [...copyJuliaArray,...dogsKate];
//   console.log(finalArray);

//  finalArray.forEach(function(val , i, finalArray){
//      if(val>=3){
//        console.log(`Dog number ${i+1} is an adult, and is ${val}years old`);
//      }else{
//        console.log(`Dog number ${i+1} is still a puppy 🐶`)
//      }
//  });

// }

// checkDogs(Julia , Kate);




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// top and down section 
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance =document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest= document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose =  document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');


const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// //////////////////////////////////////////////////////

const displayMovements = function(movements ,sort=false){

  containerMovements.innerHTML="";
  // .textContent= 0;

  const movs = sort?movements.slice().sort((a,b)=>a-b): movements;

   movs.forEach(function(mov , i){
    //  console.log(val);
     const type = mov>0 ?'deposit':'withdrawal';
      const html =`<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
        const position = "afterbegin";
        containerMovements.insertAdjacentHTML(position,html);
   });
}
///////////////////////////////////////////////////////////

const calcDisplayBalance = function(acc){
   const balance = acc.movements.reduce((acc,mov) => acc+mov ,0);
  acc.balance =balance;
   labelBalance.textContent = `${acc.balance}€`;
}

/////////////////////////////////////////////////////////
const calcDisplaySummary = function(acc){
// display deposit value
  const incoms = acc.movements.filter((mov)=> mov>0).reduce((acc, mov)=>acc+mov,0);
   labelSumIn.textContent = `${incoms}€`;
// display widthawal value
   const out = acc.movements.filter((mov)=> mov<0).reduce((acc,mov)=>acc+mov,0);
   labelSumOut.textContent = `${Math.abs(out)}€`;
// display intrest  value
 const interest = acc.movements.filter((mov)=>mov>0)
 .filter((int ,i,arr)=>int>=1)
 .map((deposit)=>deposit*acc.interestRate/100).reduce((acc,mov)=>acc+mov,0);
  labelSumInterest.textContent = `${interest}€`;
}
//////////////////////////////////////////////////////////

const createUserName = function(accs){
accs.forEach(function(acc){
acc.userName = acc.owner
.toLowerCase()
.split(' ')
.map(name=>name[0]
).join('');
  })
}
createUserName(accounts);
console.log(accounts);
////////////////////////////////////////////////////////////

const updateUI = function(acc){
    // Display movments
        displayMovements(acc.movements);
      // Display Balance
        calcDisplayBalance(acc);
      // Dispay Summary
      calcDisplaySummary(acc);
};
// ////////////////////////////////////////////////////
// Event handelor----
let currentAccount;
btnLogin.addEventListener('click',function(e){
    // Prevent form from submitting
    e.preventDefault();
   currentAccount = accounts.find(acc=>acc.userName === inputLoginUsername.value);
  
    if(currentAccount?.pin === Number(inputLoginPin.value)){
      // Display UI and message
         labelWelcome.innerHTML = `Welcom back ${currentAccount.owner.split(' ')[0]}`; 
        containerApp.style.opacity = 100;

        // Clear input field
        inputLoginUsername.value =inputLoginPin.value='';
        inputLoginPin.blur();
       
      updateUI(currentAccount);
    }
      
});
//////////////////////////////////////////
btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
   const amount = Number(inputTransferAmount.value);
   
   const recieverAcc = accounts.find(acc=>acc.userName === inputTransferTo.value);

    inputTransferTo.value = inputTransferAmount.value='';

     if(amount>0 && 
      recieverAcc &&
      currentAccount.balance>=amount && 
      recieverAcc?.userName !== currentAccount.userName){

        currentAccount.movements.push(-amount);
        recieverAcc.movements.push(amount);
        // update UI
        updateUI(currentAccount);
     }
});
/////////////////////////////////////////////////////////
btnLoan.addEventListener('click',function(e){
  e.preventDefault();
   const amount = inputLoanAmount.value;

   if(amount >0 && currentAccount.movements.some(mov=>mov >= amount/10));

  //  add the movement 
   currentAccount.movements.push(amount);
  //  update the UI
   updateUI(currentAccount);
    inputLoanAmount.value="";
});
/////////////////////////////////////////////////////////
btnClose.addEventListener('click',function(e){
      e.preventDefault();
    
  if(currentAccount.userName=== inputCloseUsername.value &&currentAccount?.pin ===Number(inputClosePin.value)){
         const index = accounts.findIndex(acc=>acc.userName === currentAccount.userName);
        //  delete acconut
          accounts.splice(index,1);
          // hide UI
          containerApp.style.opacity=0;
      }else{
        console.log('its not same account');
      }
      inputCloseUsername.value = inputClosePin.value='';
});
//////////////////////////////////////////////

let sorted= false;
btnSort.addEventListener('click',function(e){
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
// const user = 'Steven Thomas Williams'; // stw


// ///////////////////////////////////////////////////
/////////////////////////////////////////////////////











