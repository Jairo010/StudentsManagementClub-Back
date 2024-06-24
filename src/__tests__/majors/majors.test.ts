import { getMajors, getMajor} from "../../modulos/Majors/model";


describe('Pruebas de servicio de Carreras.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    

    test('prueba de recuperación de todos las carreras del sistema.', async () => {
        const result = await getMajors();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de una carrera en específico.', async () => {
        const id_major: string = '38';
        const result = await getMajor(id_major);
        expect(typeof result === 'object').toBe(true);
    });
    


    /*
*/

});