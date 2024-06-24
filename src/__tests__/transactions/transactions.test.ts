import { createTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction} from "../../modulos/Transactions/model";


describe('Pruebas de servicio de Transacciones.', () => {
    beforeAll(() => {
        expect(process.env.SUPABASEKEYPUBLIC).toBeDefined();
        expect(process.env.SUPABASEKEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de creacion de una transaccion en el sistema.', async () => {
        const data = {
            amount: 30,
            typeRegister: 'Pago',
            typeTransaction: 'Ingreso',
            idCompetition: '2',
            idGroup: '5',
            total: 100,
            description: 'Pagado'
        }
        const expectedResponse = {
            id_Transaccion: expect.any(Number), 
            Fecha_Transaccion: expect.any(String),
            amount: 30,
            typeRegister: 'Pago',
            typeTransaction: 'Ingreso',
            idCompetition: '2',
            idGroup: '5',
            total: 100,
            description: 'Pagado'
        }
        const result = await createTransaction(data);
        expect(typeof result === 'object').toBe(true);
        expect(result).toMatchObject(expectedResponse);

    });

    test('prueba de recuperación de todos las transacciones del sistema.', async () => {
        const result = await getTransactions();
        expect(Array.isArray(result)).toBe(true);
    });
    

    test('prueba de recuperacion de la información de una transaccion en específico.', async () => {
        const idTransaction: string = '29';
        const result = await getTransaction(idTransaction);
        expect(typeof result === 'object').toBe(true);
    });
    


    test('prueba de actualizacion de una transaccion.', async () => {
        const data = {
            amount: 30,
            typeRegister: 'Pago',
            typeTransaction: 'Ingreso',
            idCompetition: '2',
            idGroup: '5',
            total: 100,
            description: 'Pagado'
        }
        const expectedResponse = {
            id_Transaccion: expect.any(Number), 
            Fecha_Transaccion: expect.any(String),
            amount: 30,
            typeRegister: 'Pago',
            typeTransaction: 'Ingreso',
            idCompetition: '2',
            idGroup: '5',
            total: 100,
            description: 'Pagado'
        }
        const result = await updateTransaction(data);
        expect(typeof result === 'object').toBe(true);
        expect(result).toMatchObject(expectedResponse);
    });


    test('prueba de eliminacion de una transaccion.', async () =>{
        const idTransaccion: string = '30';
        const result = await deleteTransaction(idTransaccion);
        expect(result).toBe('transaction eliminated');
    });


    /*
*/

});