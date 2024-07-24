import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
// const stateInput = document.querySelectorAll('input[name="state"]');
// const state1 = document.querySelector('input[name="state"]:checked');

// console.log(stateInput);
// console.log(state1);
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const delay = Number(delayInput.value);
  console.log(typeof delay);
  const state = document.querySelector('input[name="state"]:checked').value;
  //   const state = stateInput.checked.value;
  console.log(state);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(` Fulfilled promise in ${delay}ms`);
      } else {
        reject(` Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(value => {
      iziToast.success({
        backgroundColor: 'green',
        message: value,
        position: 'topRight',
        messageColor: 'white',
      });
    })
    .catch(err => {
      iziToast.error({
        backgroundColor: 'red',
        message: err,
        position: 'topRight',
        messageColor: 'white',
      });
    });
}

// const promise = new Promise((resolve, reject) => {
//* resolve - фукнція, яка переведе проміс у стан Fullfilled
//* reject - функція, яка переведе проміс у стан Rejected

// const isPromiseFullfilled = Math.random() > 0.5;
// console.log(isPromiseFullfilled);

//   setTimeout(() => {
//     if (isPromiseFullfilled) {
//       resolve(
//         "Проміс виконався успішно, із результатом (виконаний, fulfilled)"
//       );
//     } else {
//       reject("Проміс виконався з помилкою (відхилений, rejected)");
//     }
//   }, 1000);
// });

// console.log(promise); // побачимо обʼєкт промісу у стані пендінг, наголошую увагу на тому, що витягнути результат виконання промісу у синхронний код не можна!!! (можна зробити імітацію через async/await, але це розглянемо пізніше, або обробити результат промісу за допомогою методів then() та catch())

// promise
//   .then((value) => {
//     console.log(`✅ ${value}`);
//   })
//   .catch((err) => {
//     console.log(`❌ ${err}`);
//   })
//   .finally(() => {
//     console.log("проміс завершений!");
//   });
