module.exports = class User {
    constructor(obj={}){
        this.username = obj.username;
        this.email = obj.email;
        this.password = obj.password;
        obj.id && (this.id = obj.id);
    }
};