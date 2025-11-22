// import utils from '../utils';
// import Auth from '../../src/Services';
// import {removeUser} from '../redux/reducers/UserReducer';
// import {BASE_URL} from '../../.env.json';
// import store from '../redux';

// const handleResponse = async response => {
//   const res = await response.json();
//   if (res.status == 'success') {
//     return {
//       status: 'success',
//       message: res.message || 'Request successful',
//       data: res?.data || null,
//     };
//   } else {
//     if (
//       res.status === 'out' ||
//       response.status === 401 ||
//       response.status === 422
//     ) {
//       await Auth.logout();
//       store.dispatch(removeUser());
//       utils.toastAlert(
//         'error',
//         res?.message || 'Session expired, please log in again',
//       );
//       throw new Error('Session expired');
//     } else {
//       utils.toastAlert(
//         'error',
//         res?.message || 'An error occurred, please try again later',
//       );
//       throw new Error(res?.message || 'Request failed');
//     }
//   }
// };

// export const fetchData = async (method, path, data = null) => {
//   try {
//     const url = `${BASE_URL}${path}`;
//     const options = {
//       method: method.toUpperCase(),
//     };

//     if (['POST', 'PUT'].includes(method.toUpperCase()) && data) {
//       options.body = JSON.stringify(data);
//     }

//     const response = await fetch(url, options);
//     // console.log((url, options));
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await handleResponse(response);
//   } catch (error) {
//     if (error.message.includes('401') || error.message.includes('422')) {
//       await Auth.logout();
//       store.dispatch(removeUser());
//       utils.toastAlert('error', 'Session expired, please log in again');
//       return {status: 'error', message: 'Session expired'};
//     } else {
//       utils.toastAlert(
//         'error',
//         error.message || 'An error occurred, please try again later',
//       );
//       return {status: 'error', message: error.message || 'Request failed'};
//     }
//   }
// };
