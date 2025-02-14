export class Email {
    name!: string;
    lastName!: string;
    email!: string;
    subject!: string;
    message!: string;

    reset() {
        this.name = "";
        this.lastName = "";
        this.email = ""
        this.subject = "";
        this.message = "";
    }

}
