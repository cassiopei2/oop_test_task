export function ValidateLength<T = any>(minLength: number, key: keyof T) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            // Assert `this` as any to bypass the TS7053 error
            const variableValue = (this as T)[key];
            if (Array.isArray(variableValue) && variableValue.length < minLength) {
                throw new Error(`Variable "${key as string}" is too short (min length is ${minLength})`);
            }
            return originalMethod.apply(this, args);
        };
    };
}
