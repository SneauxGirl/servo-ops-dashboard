import { workOrders } from "../features/workOrders/workOrders.data";

export function WorkOrders() {
    return (
        <main>
        <h1>Work Orders</h1>
        <ul>
            {workOrders.map((workOrder) => (
                <li key={workOrder.id}>
                    <h2>{workOrder.partName}</h2>
                    <p>ID: {workOrder.id}</p>
                    <p>Stage: {workOrder.stage}</p>
                    <p>Priority: {workOrder.priority}</p>
                </li>
            ))}
        </ul>
        </main>
    );
    }