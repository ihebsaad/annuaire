export declare class NbUser {
    id: number;
    email: string;
    password: string;
    rememberMe: boolean;
    terms: boolean;
    confirmPassword: string;
    fullName: string;
    company: string;
    cat1: boolean;
    cat2: boolean;
    cat3: boolean;
    cat4: boolean;
    cat5: boolean;
    cat6: boolean;
    cat7: boolean;
    cat8: boolean;

    constructor(id?: number, email?: string, password?: string, rememberMe?: boolean, terms?: boolean, confirmPassword?: string, fullName?: string, company?:string,
        cat1?: boolean,
        cat2?: boolean,
        cat3?: boolean,
        cat4?: boolean,
        cat5?: boolean,
        cat6?: boolean,
        cat7?: boolean,
        cat8?: boolean,
    );
}
