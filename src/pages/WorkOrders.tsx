import { Container, Stack, Typography} from "@mui/material";
import { useMemo, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { SearchBar } from "../components/SearchBar";
import { WorkOrderList } from "../features/workOrders/components/WorkOrdersList";

export function WorkOrders() {
    const workOrders = useAppSelector(
        (state) => state.workOrders.items,
    );

    const [searchTerm, setSearchTerm] = useState("");

    const filteredWorkOrders = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            return workOrders;
        }

        return workOrders.filter((workOrder) => {
            return(
                workOrder.id.toLowerCase().includes(query) ||
                workOrder.partName.toLowerCase().includes(query) ||
                workOrder.partNumber.toLowerCase().includes(query));
        });
    }, [searchTerm, workOrders]);
        

    return (
        <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <div>
          <Typography component="h1" variant="h4">
            Work Orders
          </Typography>

          <Typography color="text.secondary">
            {filteredWorkOrders.length} work orders
          </Typography>
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm}/>

        <WorkOrderList workOrders={filteredWorkOrders} />
      </Stack>
    </Container>
    );
    }