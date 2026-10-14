import { Worker } from "./types.js";

// 2.1.2
export function getAllWorkers(): Worker[] {
  return [
    { id: 1, name: "Danylo", surname: "Romanovych", available: false, salary: 1000 },
    { id: 2, name: "Pavlo", surname: "Skoropadskyi", available: true, salary: 1500 },
    { id: 3, name: "Mykola", surname: "Mikhnovskyi", available: false, salary: 1600 },
    { id: 4, name: "Jarema", surname: "Vyshnevetskyi", available: true, salary: 1300 }
  ];
}

// 2.1.3
export function getWorkerByID(id: number): Worker | undefined {
  return getAllWorkers().find((worker) => worker.id === id);
}

// 2.1.4
export function PrintWorker(worker: Worker): void {
  console.log(`${worker.name} ${worker.surname} got salary ${worker.salary}`);
}