const request = require('supertest');
// express app
const app = require('./index');

// db setup
const { sequelize, Dog } = require('./db');
const seed = require('./db/seedFn');
const {dogs} = require('./db/seedData');

describe('Endpoints', () => {
    // to be used in POST test
    const testDogData = {
        breed: 'Poodle',
        name: 'Sasha',
        color: 'black',
        description: 'Sasha is a beautiful black pooodle mix.  She is a great companion for her family.'
    };

    beforeAll(async () => {
        // rebuild db before the test suite runs
        await seed();
    });

    describe('GET /dogs', () => {
        it('should return list of dogs with correct data', async () => {
            // make a request
            const response = await request(app).get('/dogs');
            // assert a response code
            expect(response.status).toBe(200);
            // expect a response
            expect(response.body).toBeDefined();
            // toEqual checks deep equality in objects
            expect(response.body[0]).toEqual(expect.objectContaining(dogs[0]));
        });
    });

    describe('GET /dogs/:id', () => {
        it('should return dog with correct data', async () => {
            // make a request
            const response = await request(app).get('/dogs/1');
            // assert a response code
            expect(response.status).toBe(200);
            // expect a response
            expect(response.body).toBeDefined();
            // toEqual checks deep equality in objects
            expect(response.body).toEqual(expect.objectContaining(dogs[0]));
        });
    });

    describe('POST /dogs', () => {
        it('Should post a new dog to the list', async () => {
            const body = {
                breed: 'Husky', name: 'Taurine', color: 'cyan', description: 'Taurine is the seeker and abolisher of evil.'
            };
            const response = await request(app).post('/dogs').send(body);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(body);
        });
    });

    describe('DELETE /dogs/:id', () => {
        it('SHould delete a dog', async () => {
            const response = await request(app).delete('/dogs/1');
            expect(response.status).toBe(200);
        });
    });
});