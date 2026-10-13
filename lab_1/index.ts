import { Category } from "./types.js";
import { getAllWorkers, logFirstAvaliable, getWorkersSurnamesByCategory, logWorkersNames, getWorkerByID, сheckoutWorkers } from "./workers.js";
import { createCustomerID, CustomerIdGenerator, createCustomer } from "./customers.js";

export function lab_1(): void {
    console.log("-------- 1.1 Базові типи --------");
    const allWorkers = getAllWorkers();
    console.log("Всі робітники:", allWorkers);
    logFirstAvaliable();


    console.log("\n-------- 1.2 Робота з Enum і фільтрацією --------");
    const categor = Category.Developer;
    const surnames = getWorkersSurnamesByCategory(categor);
    console.log("Призвіща девелоперів:");
    logWorkersNames(surnames);


    console.log("\n-------- 1.3 Стрілочні функції --------");
    getAllWorkers().forEach((worker) => {
        if (worker.category === categor) {
            console.log(`${worker.name} ${worker.surname}`)
        }
    });
    const workerID = 2;
    const foundWorkerByID = getWorkerByID(workerID);

    if (foundWorkerByID) {
        console.log(`Робітник з айді ${workerID}: ${foundWorkerByID.name} ${foundWorkerByID.surname}, зарплата: ${foundWorkerByID.salary}`);
    } else {
        console.log(`Робітника з айді ${workerID} не знайдено`);
    }


    console.log("\n-------- 1.4 Типи функцій --------");
    const myID: string = createCustomerID("Максим", 4);
    console.log(`myID: ${myID}`);

    let idGenerator: CustomerIdGenerator;
    idGenerator = (name: string, id: number): string => `${name}${id}`;
    idGenerator = createCustomerID;
    console.log(`idGenerator: ${idGenerator("Someone", 12)}`);


    console.log("\n-------- 1.5. Необхідні, додаткові та залишкові параметри --------")
    console.log("Виклик з 1 параметром:");
    createCustomer("Олексій");

    console.log("\nВиклик з 2 параметрами:");
    createCustomer("Олексій", 25);

    console.log("\nВиклик з 3 параметрами:");
    createCustomer("Олексій", 25, "Київ");

    console.log("\nПрізвища людей з категорією за замовчуванням (Дизайнер):");
    const defaultSurname = getWorkersSurnamesByCategory();
    logWorkersNames(defaultSurname);

    console.log("\nПерший доступний за замовчуванням");
    logFirstAvaliable();

    const myWorkers = сheckoutWorkers("Владислав, Група ПП-32, Хобі: Сон", 1, 2, 4);
    console.log("Доступні призначені робітники:");
    myWorkers.forEach((workerFullName) => console.log(workerFullName));
}