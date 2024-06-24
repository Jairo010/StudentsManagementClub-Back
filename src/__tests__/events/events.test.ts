import { createEvent, getEvents, getEvent, updateEvent, deleteEvent, assignCompetition, assignTalk, deleteAssignedCompetition, deleteAssignedTalk, getCompetitionsByEvent, getTalksByEvent} from "../../modulos/events/model";


describe('Pruebas de servicio de Clubs.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de creacion de un evento en el sistema.', async () => {
        const data = {
            name: 'Feature',
            description: 'Develop',
            startDate: '20/12/2024',
            endDate: '25/12/2024',
            typeEvent: 'charla',
            status: 'En curso'
        }
        const result = await createEvent(data);
        expect(typeof result === 'object').toBe(true);

    });

    test('prueba de recuperación de todos los eventos del sistema.', async () => {
        const result = await getEvents();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de un evento en específico.', async () => {
        const id_event: string = '29';
        const result = await getEvent(id_event);
        expect(typeof result === 'object').toBe(true);
    });
    


    test('prueba de actualizacion de un evento.', async () => {
        const data = {
            id: '2',
            name: 'Feature',
            description: 'Develop',
            startDate: '20/12/2024',
            endDate: '25/12/2024',
            typeEvent: 'charla',
            status: 'En curso'
        }

        const result = await updateEvent(data);
        expect(typeof result === 'object').toBe(true);
    });

    


    test('prueba de eliminacion de un evento.', async () =>{
        const id_event: string = '3';
        const result = await deleteEvent(id_event);
        expect(result).toBe('event eliminated');
    });

    test('prueba de asiganr un concurso a un evento.', async () => {
        const idCompetition: string = '30';
        const idEvent: string = '2';
        const result = await assignCompetition(idEvent, idCompetition);

        expect(result).toBe(`competition: ${idCompetition} assigned to the event: ${idEvent}`);

    });

    test('prueba de asiganr una charla a un evento.', async () => {
        const idTalk: string = '30';
        const idEvent: string = '2';
        const result = await assignTalk(idEvent, idTalk);

        expect(result).toBe(`talk: ${idTalk} assigned to the event: ${idEvent}`);

    });

    test('prueba de eliminacion de un concurso en un evento asignado.', async () =>{
        const idCompetition: string = '4';
        const idEvent: string = '2';
        const result = await deleteAssignedCompetition(idEvent, idCompetition);
        expect(result).toBe('assigned competition deleted');
    });

    test('prueba de eliminacion de una charla en un evento asignado.', async () =>{
        const idTalk: string = '4';
        const idEvent: string = '2';
        const result = await deleteAssignedTalk(idEvent, idTalk);
        expect(result).toBe('assigned talk deleted');
    });

    test('prueba de recuperacion de los concursos por evento.', async () => {
        const idEvent: string = '29';
        const result = await getCompetitionsByEvent(idEvent);
        expect(Array.isArray(result)).toBe(true);
    });

    test('prueba de recuperacion de las charlas por evento.', async () => {
        const idEvent: string = '29';
        const result = await getTalksByEvent(idEvent);
        expect(Array.isArray(result)).toBe(true);
    });

    /*
*/

});