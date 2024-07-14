export default {
  isValidEmail(email: string): boolean {
    const regexStr =
      // eslint-disable-next-line quotes
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])";
    const regex = new RegExp(regexStr);
    return regex.test(email);
  },
  isValidUuidId(uuid: string): boolean {
    const regexExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return regexExp.test(uuid);
  },
};
