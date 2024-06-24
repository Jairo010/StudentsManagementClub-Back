import { createProject, getProjects, getProject, updateProject, deleteProject} from "../../modulos/Projects/model";


describe('Pruebas de servicio de Proyectos.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de creacion de un proyecto en el sistema.', async () => {
        const data = {
            name: "Developers",
            description: "Fun developers",
            startDate: "12/12/2022",
            endDate: "12/12/2024",
            idClub: "27"
        }
        const result = await createProject(data);
        expect((result as { message: string;}).message).toEqual("Created project successfuly");
        
    });
    

    test('prueba de recuperación de todos los proyectos del sistema.', async () => {
        const result = await getProjects();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de un proyecto en específico.', async () => {
        const id_project: string = '38';
        const result = await getProject(id_project);
        expect(typeof result === 'object').toBe(true);
    });
    

    test('prueba de actualizacion de un proyecto.', async () => {
        const data = {
            id: "39",
            name: "Developers",
            description: "Sad developers",
            startDate: "12/12/2022",
            endDate: "12/12/2024",
            idClub: "28"
        }

        const result = await updateProject(data);
        expect(typeof result === 'object').toBe(true);
        expect((result as { message: string }).message).toEqual("Update project successfuly");
    });

    
    test('prueba de eliminacion de un proyecto.', async () =>{
        const id_project: string = '41';
        const result = await deleteProject(id_project);
        expect(result).toBe('project eliminated');
    });
    /*
*/

});