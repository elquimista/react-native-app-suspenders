/* eslint-disable no-param-reassign */

export function createMethodDecorator(createHof) {
  return (target, key, descriptor) => {
    const method = descriptor.value;
    descriptor.value = createHof(method);
    return descriptor;
  };
}

export default {};
