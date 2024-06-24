import { createTask, getTasks, getTask, updateTask, deleteTask} from "../../modulos/Tasks/model";


describe('Pruebas de servicio de Tareas.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de creacion de una tarea en el sistema.', async () => {
        const data = {
            name: "Make login",
            description: "Login responsive",
            limitDate: "12/12/2026",
            state: "Active",
            evidence: "none",
            idProject: "39"
        }
        const result = await createTask(data);
        expect((result as { message: string; }).message).toEqual("Created task successfuly");

    });


    test('prueba de recuperación de todas las tareas del sistema.', async () => {
        const result = await getTasks();
        expect(Array.isArray(result)).toBe(true);
    });

    


    test('prueba de recuperacion de la información de una tarea en específico.', async () => {
        const id_club: string = '24';
        const result = await getTask(id_club);
        expect(typeof result === 'object').toBe(true);
    });



    test('prueba de actualizacion de una tarea.', async () => {
        const data = {
            id: "23",
            name: "Make login",
            description: "Login responsive",
            limitDate: "12/12/2026",
            state: "Active",
            evidence: "none",
            idProject: "39"
        }

        const result = await updateTask(data);
        expect(typeof result === 'object').toBe(true);
        expect((result as { message: string }).message).toEqual("Update task successfuly");
    });

    
    test('prueba de eliminacion de una tarea.', async () =>{
        const id_task: string = '22';
        const result = await deleteTask(id_task);
        expect(result).toBe('Task eliminated');
    });

    /*
*/

});