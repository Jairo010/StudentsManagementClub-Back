import { createGroup, getGroups, getGroup, updateGroup, deleteGroup, assignGroup, deleteAssignedGroup, getParticipantsByGroup, getCompetitionsOfGroup } from "../../modulos/Groups/model";


describe('Pruebas de servicio de Groups.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

   
    test('prueba de creacion de un grupo en el sistema.', async () => {
        const data = {
            name: 'Feature',
            description: 'Develop',
            clave: false,
            status: 'En curso'
        }
        const result = await createGroup(data);
        expect(typeof result === 'object').toBe(true);

    });

    test('prueba de recuperación de todos los grupos del sistema.', async () => {
        const result = await getGroups();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de un grupo en específico.', async () => {
        const id_group: string = '2';
        const result = await getGroup(id_group);
        expect(typeof result === 'object').toBe(true);
    });
    


    test('prueba de actualizacion de un grupo.', async () => {
        const data = {
            id: '2',
            name: 'Feature',
            description: 'Develop',
            clave: false,
            status: 'En curso'
        }

        const result = await updateGroup(data);
        expect(typeof result === 'object').toBe(true);
    });

    

    test('prueba de eliminacion de un grupo.', async () =>{
        const id_group: string = '3';
        const result = await deleteGroup(id_group);
        expect(result).toBe('group eliminated');
    });
    


    test('prueba de asignacion de un usuario a un grupo.', async () =>{
        const id_group: string = '1';
        const card: string = '';
        const key : string = '';
        const result = await assignGroup(id_group, card, key);
        expect(result).toBe(`Group: ${id_group} assigned to the participant: ${card}`);
    });

    test('prueba de eliminacion de un usuario de un grupo.', async () =>{
        const id_group: string = '1';
        const card: string = '';
        const result = await deleteAssignedGroup(id_group, card);
        expect(result).toBe(`assigned participant deleted`);
    });

    test('prueba de recuperación de todos los participantes de un grupo.', async () => {
        const result = await getParticipantsByGroup();
        expect(Array.isArray(result)).toBe(true);
    });


    test('prueba de recuperacion de concursos por grupo.', async () => {
        const id_group: string = '2';
        const result = await getCompetitionsOfGroup(id_group);
        expect(Array.isArray(result)).toBe(true);
    });


   /* 
*/

});