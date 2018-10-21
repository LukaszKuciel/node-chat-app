const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Mike',
                room: 'Node course'
            },
            {
                id: 2,
                name: 'Jen',
                room: 'React course'
            },
            {
                id: 3,
                name: 'Julie',
                room: 'Node course'
            }
        ];
    })

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id : '123',
            name : 'Lukasz',
            room : 'Room 12'
        }
        let res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
        expect(res).toEqual(user);
    })

    it('should remove user', () => {
        let res = users.removeUser(1);
        expect(res.id).toBe(1);
        expect(users.users.length).toBe(2);
    })

    it('should not remove user', () => {
        let res = users.removeUser(4);
        expect(res).toNotExist();
        expect(users.users.length).toBe(3);
    })

    it('should find user', () => {
        let res = users.getUser(1);
        expect(res).toEqual(users.users[0]);
    })

    it('should not find user', () => {
        let res = users.getUser(4);
        expect(res).toNotExist();
    })

    it('should return name for node course', () => {
        let userList = users.getUsersList('Node course');
        expect(userList).toEqual(['Mike','Julie']);
    })

    it('should return name for react course', () => {
        let userList = users.getUsersList('React course');
        expect(userList).toEqual(['Jen']);
    })
})