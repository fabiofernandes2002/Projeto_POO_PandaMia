export default class userModel {
    constructor(nameSurname, id,username, city, postalCode, address, birthDate, email, password, type ) {
        this.nameSurname = nameSurname
        this.id = id
        this.username = username
        this.city = city
        this.postalCode = postalCode
        this.address = address
        this.birthDate = birthDate
        this.email = email
        this.password = password
        this.type = type
    }
}