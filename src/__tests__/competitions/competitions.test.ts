import { createCompetition, getCompetitions, getCompetition, updateCompetition, deleteCompetition, assignCompetition, deleteAssignedCompetition, getGroupsByCompetition } from "../../modulos/Competitions/model";


describe('Pruebas de servicio de Concursos.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de creacion de un concurso en el sistema.', async () => {
        const data = {
            type: 'Concurso',
            numParticipants: 2,
            price: 20,
            status: 'abierta'
        }
        const expectedResponse = {
            id: expect.any(Number), 
            Tipo_Concurso: 'Concurso',
            Num_Max_Integrantes: 2,
            Valor_Inscripcion: 20,
            Estado: 'abierta'
        }
        const result = await createCompetition(data);
        expect(typeof result === 'object').toBe(true);
        expect(result).toMatchObject(expectedResponse);

    });

    test('prueba de recuperación de todos los concursos del sistema.', async () => {
        const result = await getCompetitions();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de un concurso en específico.', async () => {
        const idCompetition: string = '29';
        const result = await getCompetition(idCompetition);
        expect(typeof result === 'object').toBe(true);
    });
    


    test('prueba de actualizacion de un concurso.', async () => {
        const data = {
            id: '30',
            type: 'Concurso',
            numParticipants: 2,
            price: 20,
            status: 'abierta'
        }

        const expectedResponse = {
            id: '30', 
            Tipo_Concurso: 'Concurso',
            Num_Max_Integrantes: 2,
            Valor_Inscripcion: 20,
            Estado: 'abierta'
        }

        const result = await updateCompetition(data);
        expect(typeof result === 'object').toBe(true);
        expect(result).toMatchObject(expectedResponse);
    });

    


    test('prueba de eliminacion de un concurso.', async () =>{
        const idCompetition: string = '30';
        const result = await deleteCompetition(idCompetition);
        expect(result).toBe('competition eliminated');
    });


    test('prueba de asiganr un grupo a un concurso.', async () => {
        const idCompetition: string = '30';
        const idGroup: string = '2';
        const result = await assignCompetition(idCompetition,idGroup);

        expect(result).toBe(`Competition: ${idCompetition} assigned to the group: ${idGroup}`);

    });

    test('prueba de eliminacion de un grupo en un concurso asignado.', async () =>{
        const idCompetition: string = '4';
        const idGroup: string = '2';
        const result = await deleteAssignedCompetition(idCompetition, idGroup);
        expect(result).toBe('assigned group deleted');
    });

    test('prueba de recuperacion de los grupos de un concurso.', async () => {
        const idCompetition: string = '29';
        const result = await getGroupsByCompetition(idCompetition);
        expect(Array.isArray(result)).toBe(true);
    });
    /*
*/

});