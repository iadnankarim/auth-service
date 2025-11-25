import request from "supertest";
import app from "../../src/app.js";


describe("POST /auth/register", ()=>{
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
            // const response =
            await request(app).post("/auth/register").send(userData)

            // assest check 201 arha hai ya ni

        })
    })
})