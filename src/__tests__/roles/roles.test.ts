import { getRoles, getRol} from "../../modulos/Roles/model";


describe('Pruebas de servicio de Roles.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    

    test('prueba de recuperación de todos los roles del sistema.', async () => {
        const result = await getRoles();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de un rol en específico.', async () => {
        const id_rol: string = '38';
        const result = await getRol(id_rol);
        expect(typeof result === 'object').toBe(true);
    });
    


    /*
*/

});