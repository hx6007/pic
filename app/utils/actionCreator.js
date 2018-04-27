
/**
 * action 生成器
 * @param type
 * @param argNames
 * @returns {Function}
 */
export function createAction(type, ...argNames) {
  return function (...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}
