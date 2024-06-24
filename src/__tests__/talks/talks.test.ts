import { createTalk, getTalks, getTalk, updateTalk, deleteTalk, assignTalk, deleteAssignedTalk, getSpeakersByTalk } from "../../modulos/Talks/model";


describe('Pruebas de servicio de Charlas.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de creacion de una charla en el sistema.', async () => {
        const data = {
            topic: 'Concurso',
            image: 'hola',
            startDate: '20/10/2024',
            endDate: '23/10/2024',
            status: 'activa'
        }
        const expectedResponse = {
            id_Charla: expect.any(Number), 
            Tema_Charla: 'Concurso',
            Imagen_Charla: 'hola',
            Hora_Inicio: '20/10/2024',
            Hora_Fin: '23/10/2024',
            Estado_Charla: 'activa'
        }
        const result = await createTalk(data);
        expect(typeof result === 'object').toBe(true);
        expect(result).toMatchObject(expectedResponse);

    });

    test('prueba de recuperación de todas las charlas del sistema.', async () => {
        const result = await getTalks();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de una charla en específico.', async () => {
        const idCharla: string = '29';
        const result = await getTalk(idCharla);
        expect(typeof result === 'object').toBe(true);
    });
    


    test('prueba de actualizacion de uan charla.', async () => {
        const data = {
            topic: 'Concurso',
            image: 'hola',
            startDate: '20/10/2024',
            endDate: '23/10/2024',
            status: 'activa'
        }
        const expectedResponse = {
            id_Charla: expect.any(Number), 
            Tema_Charla: 'Concurso',
            Imagen_Charla: 'hola',
            Hora_Inicio: '20/10/2024',
            Hora_Fin: '23/10/2024',
            Estado_Charla: 'activa'
        }
        const result = await updateTalk(data);
        expect(typeof result === 'object').toBe(true);
        expect(result).toMatchObject(expectedResponse);
    });

    


    test('prueba de eliminacion de una charla.', async () =>{
        const idCharla: string = '30';
        const result = await deleteTalk(idCharla);
        expect(result).toBe('talk eliminated');
    });


    test('prueba de asignar una charla a un ponente.', async () => {
        const idTalk = '30';
        const card: string = '1805273396';
        const result = await assignTalk(idTalk,card);

        expect(result).toBe(`Talk: ${idTalk} assigned to the speaker: ${card}`);

    });

    test('prueba de eliminacion de un ponente en una charla asignado.', async () =>{
        const idTalk: string = '30';
        const card: string = '1805273396';
        const result = await deleteAssignedTalk(idTalk, card);
        expect(result).toBe('assigned speaker deleted');
    });

    test('prueba de recuperacion de los ponentes por charla.', async () => {
        const idTalk: string = '29';
        const result = await getSpeakersByTalk(idTalk);
        expect(Array.isArray(result)).toBe(true);
    });
    /*
*/

});