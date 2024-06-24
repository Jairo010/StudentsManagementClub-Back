import { createUser, login } from "../../modulos/auth/modelo";


describe('Pruebas de servicio de Users.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de creacion de nuevos usuarios en el sistema.', async () => {
        const email = "jairofreireortiz100@gmail.com";
        const password = "jairo123";
        const card = "1805273397";
        const name = "Jairo";
        const lastName = "Freire";
        const semester = "Sexto";
        const idMajor = "1";
        const idRol = "1";
        const result = await createUser(email,password, card, name, lastName, semester, idMajor, idRol);
        expect((result as { message: string; }).message).toEqual("User created successfuly");
    });
    
    test('prueba de inicio de sesion.', async () => {
        const email = "jairofreireortiz10@gmail.com";
        const password = "jairo123";
        const result = await login(email,password);
        expect(typeof result === 'object').toBe(true);
        
    });

    

});