export const checkPhoneNumber = number => {
    const regPhone = /^01([0|1|6|7|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return regPhone.test(number);
};

export const checkBirth = birth => {
    const regBirth = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/g;
    return regBirth.test(birth);
};
