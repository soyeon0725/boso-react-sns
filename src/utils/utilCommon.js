export const checkId = id => {
    const regId = /^\w{4,20}$/; // 63개 문자(Word, 영문 대소문자 52개 + 숫자 10개 + _)에 일치
    return regId.test(id);
}

export const checkPassword = password => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
    return regPassword.test(password);
}

export const checkPhoneNumber = number => {
    const regPhone = /^01([0|1|6|7|9])-?([0-9]{4})-?([0-9]{4})$/;
    return regPhone.test(number);
};

export const checkBirth = birth => {
    const regBirth = /^(19\d\d|20\d{2})(0\d|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return regBirth.test(birth);
};
