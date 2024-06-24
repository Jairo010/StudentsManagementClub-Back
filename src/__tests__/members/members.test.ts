import { getMember, getMembers, updateMember, deleteMember, getMembersByCard, getId, getClubsOfMember } from "../../modulos/members/model";


describe('Pruebas de servicio de miembros.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    
    test('prueba de recuperación de todos los miembros del sistema.', async () => {
        const result = await getMembers();
        expect(Array.isArray(result)).toBe(true);
    });

    test('prueba de recuperacion de la información de un miembro en específico.', async () => {
        const id_member: string = 'dd776d6f-a92d-48f7-82a4-18f009cc5937';
        const result = await getMember(id_member);
        expect(typeof result === 'object').toBe(true);
    });

    test('prueba de actualizacion de un miembro.', async () => {
        const id_member: string = '99691ddd-e7e3-460d-95f9-cafe14942da9';
        const card: string = '172817734';
        const name: string = 'Mateo';
        const lastName: string = 'Barona';
        const semester: string = 'Tercero';
        const idMajor: string = '1';
        const idRol: string = '1';

        const result = await updateMember(id_member,card,name,lastName,semester,idMajor,idRol);
        expect(typeof result === 'object').toBe(true);
        expect((result as { message: string }).message).toEqual("Update successfuly");
    });

   
   
    test('prueba de eliminacion de un miembro.', async () =>{
        const id_memeber: string = 'b6f35b98-f78c-438e-9da7-60a406cb27ff';
        const result = await deleteMember(id_memeber);
        expect(result).toBe('Member eliminated');
    });


    test('prueba de recuperacion de la información de un miembro en específico por la cedula.', async () => {
        const card_member: string = '1805273396';
        const result = await getMembersByCard(card_member);
        expect(typeof result === 'object').toBe(true);
    });
 
    test('prueba de recuperacion de la información de un miembro en específico por el id.', async () => {
        const id_member: string = '99691ddd-e7e3-460d-95f9-cafe14942da9';
        const result = await getMembersByCard(id_member);
        expect(typeof result === 'object').toBe(true);
    });


    test('prueba de recuperacion de los clubs de un miembro.', async () => {
        const card: string = '1805273396';
        const result = await getClubsOfMember(card);
        expect(Array.isArray(result)).toBe(true);
    });


});