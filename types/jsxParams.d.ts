declare module 'jsx-params' {
    type BasicParams<T extends string, R extends Object> = {
        funcType: T,
        params?: R
    }

    export type GetPlaceItems = BasicParams<'getplacement', never>;
}

declare module 'jsx-recived' {
    type BasicParam<S extends 'success'|'error', R  extends S extends 'success' ? Object : string> = {
        status: S,
        param: R
    }

    export type SuccessParam<T extends Object> = BasicParam<'success', T>;

    export type ErrorParam = BasicParam<'error', string>;

    export type ImageFullNames = SuccessParam<{
        placeFullNames: string[],
        doc: string
    }>;
}