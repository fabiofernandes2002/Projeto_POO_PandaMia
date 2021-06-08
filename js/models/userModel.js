export default class userModel {
    constructor(id, nameSurname,username, address , postalCode, city, birthDate, email, password, type ) {
        
        this.id = id
        this.nameSurname = nameSurname
        this.username = username
        this.address = address
        this.postalCode = postalCode
        this.city = city
        this.birthDate = birthDate
        this.email = email
        this.password = password
        this.type = type
    }
}