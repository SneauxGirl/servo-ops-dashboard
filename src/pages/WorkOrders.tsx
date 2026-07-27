import { useAppSelector } from "../app/hooks";

export function WorkOrders() {
    const workOrders = useAppSelector(
        (state) => state.workOrders.items,
    );

    return (
        <main>
        <h1>Work Orders</h1>
        <p>
            {workOrders.length}work orders
        </p>
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