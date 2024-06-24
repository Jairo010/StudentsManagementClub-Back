import { createClub, getClubs, getClub, updateClub, deleteClub, assignMember, deleteAssignedMember, getMembersByClub } from "../../modulos/Clubs/model";


describe('Pruebas de servicio de Clubs.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de creacion de un clubs en el sistema.', async () => {
        const name: string = 'Feature';
        const description: string = 'feature';
        const cardResponsible: string = '1600647968';
        const result = await createClub(name,description,cardResponsible);

        expect((result as { message: string;}).message).toEqual("Created club successfuly");

    });

    test('prueba de recuperación de todos los clubs del sistema.', async () => {
        const result = await getClubs();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de un club en específico.', async () => {
        const id_club: string = '29';
        const result = await getClub(id_club);
        expect(typeof result === 'object').toBe(true);
    });
    


    test('prueba de actualizacion de un club.', async () => {
        const id_club: string = '28';
        const name: string = 'Develop';
        const description: string = 'feature';
        const cardResponsible: string = '1600647968';

        const result = await updateClub(id_club,name,description,cardResponsible);
        expect(typeof result === 'object').toBe(true);
        expect((result as { message: string }).message).toEqual("Update club successfuly");
    });

    


    test('prueba de eliminacion de un club.', async () =>{
        const id_club: string = '28';
        const result = await deleteClub(id_club);
        expect(result).toBe('club eliminated');
    });


    test('prueba de asiganr un miembro a un club.', async () => {
        const idClub: string = '2';
        const idMember: string = '1600647968';
        const result = await assignMember(idClub,idMember);

        expect(result).toBe(`member: ${idMember} assigned to the club: ${idClub}`);

    });

    test('prueba de eliminacion de un miembro en un club asignado.', async () =>{
        const idMember: string = '1600647968';
        const idClub: string = '2';
        const result = await deleteAssignedMember(idClub,idMember);
        expect(result).toBe('assigned member deleted');
    });

    test('prueba de recuperacion de los miembros de un club.', async () => {
        const idClub: string = '29';
        const result = await getMembersByClub(idClub);
        expect(Array.isArray(result)).toBe(true);
    });
    /*
*/

});