export type Fn<T, U> = (t: T) => U;
export type UnionKeys<T> = T[keyof T];
export type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

export type AsStrings<T> = {
    [P in keyof T]: string;
};
export type ValueOf<T> = T[keyof T];

export type ActionType<TActions extends { [k: string]: any }> = ReturnType<ValueOf<TActions>>;

export type ArgumentsType<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never;
export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
export type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any;
export type ThirdArgument<T> = T extends (arg1: any, arg2: any, arg3: infer U, ...args: any[]) => any ? U : any;
