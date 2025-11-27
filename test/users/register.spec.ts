import request from "supertest";
import app from "../../src/app.js";
import {  DataSource } from "typeorm";
import {AppDataSource} from '../../src/config/data-source'
import { truncateTables } from "../utils/index.js";
import { User } from "../../src/entity/User.js";

describe("POST /auth/register", ()=>{

    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async()=>{
        // database tuerncate
        await truncateTables(connection)
    })


    afterAll(async()=>{
        await connection.destroy()
    })

    describe("Give all fields", ()=>{

        it("should return the 201 status code ", async()=>{

            ///AAA
            const userData ={
                firstName :"Adnan",
                lastName:"karim",
                email:"adnan@gmail.com",
                password:"secret"
            };

            //act
            const response = await request(app).post("/auth/register").send(userData)

            // assest check 201 arha hai ya ni
            expect(response.statusCode).toBe(201)
        })

        it("should return valid json response",async()=>{
///AAAl
            const userData ={
                firstName :"Adnan",
                lastName:"karim",
                email:"adnan@gmail.com",
                password:"secret"
            };

            //act
            const response = await request(app).post("/auth/register").send(userData)

            // assest check 201 arha hai ya ni
            // expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
            expect(
                (response.headers as Record<string, string>)
                ['content-type']).toEqual(expect.stringContaining('json'))

        })

        it("should persist the user in the database",async()=>{
            const userData ={
                firstName :"Adnan",
                lastName:"karim",
                email:"adnan@gmail.com",
                password:"secret"
            };

            //act
            // API call karo
            // const response =
            await request(app).post("/auth/register").send(userData)

            //
            // assest check 201 arha hai ya ni
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()

            expect(users).toHaveLength(1)
            expect(users[0].firstName).toBe(userData.firstName)
            expect(users[0].lastName).toBe(userData.lastName)
            expect(users[0].email).toBe(userData.email)



        })

        it("should return id of the created user", async () => {
    // Arrange - Test data prepare karo
    const userData = {
        firstName: "Adnan",
        lastName: "karim",
        email: "adnan@gmail.com",
        password: "secret"
    };

    // Act - API call karo
    const response = await request(app).post("/auth/register").send(userData);

    // Assert - Check karo id aaya ya nahi
    expect(response.body).toHaveProperty("id");
});
    })
})