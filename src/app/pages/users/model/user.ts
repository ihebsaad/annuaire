export class User {

    constructor(
        public fullName: string,
        public email: string,
        public status: string,
        public password: string,
       public company: string,
        public cat1: boolean=false,
        public cat2: boolean=false,
        public cat3: boolean=false,
        public cat4: boolean=false,
        public cat5: boolean=false,
        public cat6: boolean=false,
        public cat7: boolean=false,
        public cat8: boolean=false,
    ) {  }
}
