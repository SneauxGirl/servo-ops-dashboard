import { Box, Container, Stack, Typography} from "@mui/material";
import { useMemo, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { SearchBar } from "../components/SearchBar";
import { WorkOrderList } from "../features/workOrders/components/WorkOrdersList";
import { WorkOrderStageFilter, type StageFilter } from "../features/workOrders/components/workOrderStageFilter";

export function WorkOrders() {
    const workOrders = useAppSelector(
        (state) => state.workOrders.items,
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStage, setSelectedStage] = useState<StageFilter>("all");

    const stages = useMemo(() =>
        Array.from(
            new Set(
                workOrders.map((workOrder) => workOrder.stage),
            ),
        ), [workOrders]
    );

    const filteredWorkOrders = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return workOrders.filter((workOrder) => {
            const matchesSearch =
                !query ||
                workOrder.id.toLowerCase().includes(query) ||
                workOrder.partName.toLowerCase().includes(query) ||
                workOrder.partNumber.toLowerCase().includes(query);

            const matchesStage =
                selectedStage === "all" ||
                workOrder.stage === selectedStage;

            return matchesSearch && matchesStage;
        });
    }, [searchTerm, workOrders, selectedStage]);
        

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

        <Box sx={{display: "grid", gap: 2, 
                gridTemplateColumns:{xs: "1fr", md: "minmax(0, 2fr) minmax(12rem, 1fr)",
                },
            }}
        >
            <SearchBar value={searchTerm} onChange={setSearchTerm}/>
            <WorkOrderStageFilter value={selectedStage} stages={stages} onChange={setSelectedStage} />
        </Box>

        <WorkOrderList workOrders={filteredWorkOrders} />
      </Stack>
    </Container>
    );
    }