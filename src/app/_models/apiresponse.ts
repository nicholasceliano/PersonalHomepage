export class APIResponse<T> {
    err: boolean;
    msg: string;
    data: T;
}
