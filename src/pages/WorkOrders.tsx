import { Box, Button, Container, Stack, Typography} from "@mui/material";
import { useMemo, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { SearchBar } from "../components/SearchBar";
import { WorkOrderList } from "../features/workOrders/components/WorkOrdersList";
import { WorkOrderStageFilter, type StageFilter } from "../features/workOrders/components/WorkOrderStageFilter";
import { WorkOrderSort, type WorkOrderSortOption, } from "../features/workOrders/components/WorkOrderSort";
import { Link } from "react-router";

export function WorkOrders() {
    const workOrders = useAppSelector(
        (state) => state.workOrders.items,
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStage, setSelectedStage] = useState<StageFilter>("all");
    const [sortBy, setSortBy] = useState<WorkOrderSortOption>("partName");

    const stages = useMemo(() =>
        Array.from(
            new Set(
                workOrders.map((workOrder) => workOrder.stage),
            ),
        ), [workOrders]
    );

    const filteredWorkOrders = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

       const filtered = workOrders.filter((workOrder) => {
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

            return filtered.sort((a, b) => {
                switch (sortBy) {
                    case "priority": {
                        const priorityOrder = {
                            critical: 0,
                            high: 1,
                            normal: 2,
                            low: 3,
                        };

                        return (
                            priorityOrder[a.priority] - priorityOrder[b.priority]);
                    }
                    
                    case "stage": return a.stage.localeCompare(b.stage)

                    case "partName": default: return a.partName.localeCompare(b.partName);
                }
            });
   
    }, [searchTerm, workOrders, selectedStage, sortBy]);
        

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", }}>
            <div>
            <Typography component="h1" variant="h4">
                Work Orders
            </Typography>

            <Typography color="text.secondary">
                {filteredWorkOrders.length} work orders
            </Typography>
            </div>
            <Button component={Link} to="/" variant="outlined">
                View Dashboard
            </Button>
        </Box>

        <Box sx={{display: "grid", gap: 2, 
                gridTemplateColumns:{xs: "1fr", md: "2fr 1fr 1fr",
                },
            }}
        >
            <SearchBar value={searchTerm} onChange={setSearchTerm}/>
            <WorkOrderStageFilter value={selectedStage} stages={stages} onChange={setSelectedStage} />

            <WorkOrderSort value={sortBy} onChange={setSortBy}/>
        </Box>

{filteredWorkOrders.length === 0 ? (
    <Box sx={{ py: 8, textAlign: "center", }}>
        <Typography variant="h6">
            No work orders match your current search or filter
        </Typography>
    </Box> ): (<WorkOrderList workOrders={filteredWorkOrders} />)
}
        
      </Stack>
    </Container>
    );
    }