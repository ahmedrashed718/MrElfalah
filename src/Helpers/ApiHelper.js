import utils from '../utils';
import Auth from '../Services';
import {removeUser} from '../redux/reducers/UserReducer';
import {BASE_URL} from '../../.env.json';
import store from '../redux';

const handleResponse = async response => {
  try {
    const res = await response.json();
    if (res.status == 'success') {
      // البيانات يمكن أن تكون في message أو data
      // في حالة الـ login، البيانات تأتي في message كـ object
      return {
        status: 'success',
        message: res.message || res.data || null,
        data: res?.data || res?.message || null,
      };
    } else {
      // في حالة الخطأ من API (مثل بيانات خاطئة)
      if (
        res.status === 'out' ||
        response.status === 401 ||
        response.status === 422
      ) {
        await Auth.logout();
        store.dispatch(removeUser());
        return {
          status: 'error',
          message: res?.message || 'Session expired, please log in again',
        };
      } else {
        // خطأ في البيانات أو أي خطأ آخر - نُرجع الخطأ للتعامل معه في الكود الذي استدعى fetchData
        return {
          status: 'error',
          message: res?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى',
        };
      }
    }
  } catch (parseError) {
    // في حالة فشل parse JSON
    return {
      status: 'error',
      message: 'فشل في قراءة الاستجابة من الخادم',
    };
  }
};

export const fetchData = async (
  method,
  path,
  data = null,
  contentType = 'application/json',
) => {
  try {
    const url = `${BASE_URL}${path}`;
    const options = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': contentType,
      },
    };

    if (['POST', 'PUT'].includes(method.toUpperCase()) && data) {
      if (contentType === 'application/json') {
        options.body = JSON.stringify(data);
      } else {
        // form-data أو x-www-form-urlencoded
        options.body = data;
      }
    }

    const response = await fetch(url, options);
    // console.log((url, options));
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await handleResponse(response);
  } catch (error) {
    if (error.message.includes('401') || error.message.includes('422')) {
      await Auth.logout();
      store.dispatch(removeUser());
      utils.toastAlert('error', 'Session expired, please log in again');
      return {status: 'error', message: 'Session expired'};
    } else {
      utils.toastAlert(
        'error',
        error.message || 'An error occurred, please try again later',
      );
      return {status: 'error', message: error.message || 'Request failed'};
    }
  }
};
