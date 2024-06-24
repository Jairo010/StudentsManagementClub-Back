import { createUniversity, getUniversities, getUniversity, updateUniversity, deleteUniversity} from "../../modulos/Universities/model";
import {University} from '../../interfaces/university.interface';

describe('Pruebas de servicio de Universidades.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de creacion de una universidad en el sistema.', async () => {
        const data = {
            name: "Universidad Tecnica de Ambato",
            city: "Ambato",
            province: "Tungurahua"
        }

        const expectedResponse = {
            Id_Universidades: expect.any(Number), 
            Nombre_Universidad: "Universidad Tecnica de Ambato",
            Ciudad_Universidad: "Ambato",
            Provincia_Universidad: "Tungurahua"
        };
        

        const result = await createUniversity(data);
        expect(result).toMatchObject<University>(expectedResponse);

    });
    

    test('prueba de recuperación de todas las universidades del sistema.', async () => {
        const result = await getUniversities();
        expect(Array.isArray(result)).toBe(true);
    });

    
    test('prueba de recuperacion de la información de una universidad en específico.', async () => {
        const id_university: string = '3';
        const result = await getUniversity(id_university);
        expect(typeof result === 'object').toBe(true);
    });



    test('prueba de actualizacion de una universidad.', async () => {
        const data = {
            name: "Universidad Tecnica de Ambato",
            city: "Ambato",
            province: "Tungurahua",
        }

        const result = await updateUniversity(data);
        expect(typeof result === 'object').toBe(true);
    });

    
    test('prueba de eliminacion de una universidad.', async () =>{
        const id_university: string = '3';
        const result = await deleteUniversity(id_university);
        expect(result).toBe('university eliminated');
    });

  /*  
*/

});