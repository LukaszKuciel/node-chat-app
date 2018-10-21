[
    {
        id:'asadasdas',
        name:'Andres',
        room:'The Office Fans'
    }
]


class Users{
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id){
        let user = this.getUser(id);
        if(user){
            this.users = this.users.filter(u => u.id !== id);
        }
        return user;
    }
    getUser(id){
        return this.users.find(u => u.id === id);
    }
    getUsersList(room){
        let users = this.users.filter(u => u.room === room);
        let roomUsers = users.map(u => u.name);
        return roomUsers;
    }
}

module.exports = {Users};