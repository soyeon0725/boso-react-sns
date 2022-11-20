export const checkId = id => {
    const regId = /^\w{4,20}$/; // 63개 문자(Word, 영문 대소문자 52개 + 숫자 10개 + _)에 일치
    return regId.test(id);
}

export const checkPassword = password => {
    const regPassword = /^(?=.*[A-Z|a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Z|a-z|\d|$@$!%*#?&]{10,}$/;
    // const regPassword = /^.*(?=^.{10,}$)(?=.*\d)(?=.*[a-z|A-Z])(?=.*[!@#$%^&+=]).*$/;
    return regPassword.test(password);
}

export const checkName = name => {
    const regId = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
    return regId.test(name);
}

export const checkPhoneNumber = number => {
    const regPhone = /^01([0|1|6|7|9])(\d{4})(\d{4})$/;
    return regPhone.test(number);
};

export const checkBirth = birth => {
    const regBirth = /^(19\d\d|20\d{2})(0\d|1[0-2])(0[1-9]|[1-2]\d|3[0-1])$/;
    return regBirth.test(birth);
};
