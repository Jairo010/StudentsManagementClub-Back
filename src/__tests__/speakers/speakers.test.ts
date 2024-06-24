import { createSpeaker, getSpeakers, getSpeaker, updateSpeaker, deleteSpeaker, getTalksOfSpeaker } from "../../modulos/Speakers/model";


describe('Pruebas de servicio de Ponentes.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

   
    test('prueba de creacion de un ponente en el sistema.', async () => {
        const data = {
            card: '1805273396',
            name: 'Jairo',
            lastName: 'Freire',
            email: 'jairofreire010@gmail.com',
            phone: '0999309622',
            biography: 'Im 20, and i like Football',
            topic: 'The software and the laboral word'
        }

        const expectedResponse = {
            Cedula_Ponente: '1805273396',
            Nombre_Ponente: 'Jairo',
            Apellido_Ponente: 'Freire',
            Correo_Ponente: 'jairofreire010@gmail.com',
            Telefono_Ponente: '0999309622',
            Biografia_Ponente: 'Im 20, and i like Football',
            Tema_Charla: 'The software and the laboral word'
        }

        const result = await createSpeaker(data);
        expect(typeof result === 'object').toBe(true);
        expect(result).toMatchObject(expectedResponse);
    });

    test('prueba de recuperación de todos los ponentes del sistema.', async () => {
        const result = await getSpeakers();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de un ponente en específico.', async () => {
        const card: string = '1805273396';
        const result = await getSpeaker(card);
        expect(typeof result === 'object').toBe(true);
    });
    


    test('prueba de actualizacion de un ponente.', async () => {
        const data = {
            card: '1805273396',
            name: 'Jairo',
            lastName: 'Freire',
            email: 'jairofreire010@gmail.com',
            phone: '0999309622',
            biography: 'Im 20, and i like Football',
            topic: 'The software and the laboral word'
        }

        const expectedResponse = {
            Cedula_Ponente: '1805273396',
            Nombre_Ponente: 'Jairo',
            Apellido_Ponente: 'Freire',
            Correo_Ponente: 'jairofreire010@gmail.com',
            Telefono_Ponente: '0999309622',
            Biografia_Ponente: 'Im 20, and i like Football',
            Tema_Charla: 'The software and the laboral word'
        }

        const result = await updateSpeaker(data);
        expect(typeof result === 'object').toBe(true);
        expect(result).toMatchObject(expectedResponse);
    });

    

    test('prueba de eliminacion de un ponente.', async () =>{
        const card: string = '1805273396';
        const result = await deleteSpeaker(card);
        expect(result).toBe('speaker eliminated');
    });
    

    test('prueba de recuperación de todos los participantes de un grupo.', async () => {
        const card: string = '1805273396';
        const result = await getTalksOfSpeaker(card);
        expect(Array.isArray(result)).toBe(true);
    });


   /* 
*/

});