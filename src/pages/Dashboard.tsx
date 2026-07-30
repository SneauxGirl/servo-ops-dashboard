import { useMemo } from "react";
import { Container, Card, CardContent, Box, Stack, Typography, Button, Chip, LinearProgress, Paper, Divider } from "@mui/material";
import { Link } from "react-router";
import { useAppSelector } from "../app/hooks";
import { workOrderPriorityLabel, workOrderStageLabel } from "../features/workOrders/WorkOrders.constants";

import type { WorkOrder, WorkOrderStage, WorkOrderPriority } from "../features/workOrders/workOrders.types";

const stages: WorkOrderStage[] = [
    "cam",
    "ready",
    "machining",
    "inspection",
    "complete",
    "blocked",
];

const priorityOrder: Record<WorkOrderPriority, number> = {
    critical: 0,
    high: 1,
    normal: 2,
    low: 3,
};

function needsAttention(workOrder: WorkOrder) {
    return (
        workOrder.stage === "blocked" ||
        workOrder.priority === "critical" ||
        workOrder.priority === "high"
    );
}

export function Dashboard() {
    const workOrders = useAppSelector(
        (state) => state.workOrders.items,
    );

    const metrics = useMemo(() => {
        const total = workOrders.length;

        const inProgress = workOrders.filter((workOrder) =>
            ["cam", "ready", "machining", "inspection"].includes(
                workOrder.stage,
            ),
        ).length;

        const blocked = workOrders.filter(
            (workOrder) => workOrder.stage === "blocked",
        ).length;

        const complete = workOrders.filter(
            (workOrder) => workOrder.stage === "complete",
        ).length;

        return {
            total, inProgress, blocked, complete,
        };
    }, [workOrders]);

    const stageCounts = useMemo(
        () => stages.map((stage) =>({
            stage, count: workOrders.filter(
                (workOrder) => workOrder.stage === stage,
            ).length,
        })), [workOrders],
    );

    const attentionWorkOrders = useMemo(() =>
        workOrders.filter(needsAttention).sort((first, second) => priorityOrder[first.priority] - priorityOrder[second.priority],
        ).slice(0, 5),
        [workOrders],
    );

    return(
        <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={4}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", }}>
            <div>
            <Typography component="h1" variant="h4">
                Dashboard
            </Typography>

            <Typography color="text.secondary">
                 Current Production Overview
            </Typography>
            </div>
            <Button component={Link} to="/work-orders" variant="outlined">
                View All Work Orders
            </Button>
                </Box>
                
                <Box sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, minmax(0, 1fr))",
                            lg: "repeat(4, minmax(0, 1fr))",
                        },
                        gap: 2,
                    }}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography color="text.secondary" variant="body2">
                                Total Work Orders
                            </Typography>
                            <Typography component="p" variant="h4" sx={{ mt:1 }}>
                                {metrics.total}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography color="text.secondary" variant="body2">
                                In Progress
                            </Typography>
                            <Typography component="p" variant="h4" sx={{ mt:1 }}>
                                {metrics.inProgress}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography color="text.secondary" variant="body2">
                                Blocked
                            </Typography>
                            <Typography component="p" variant="h4" sx={{ mt:1 }}>
                                {metrics.blocked}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography color="text.secondary" variant="body2">
                                Complete
                            </Typography>
                            <Typography component="p" variant="h4" sx={{ mt:1 }}>
                                {metrics.complete}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box>
                    <Paper variant="outlined" sx={{ p: 3}}>
                        <Typography component="h2" variant="h6">
                            Work Orders by Stage
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                            Workflow Distribution
                        </Typography>
                        <Stack spacing={2.5}>
                            {stageCounts.map(( {stage, count }) => {
                                const percentage = metrics.total === 0
                                ? 0
                                : (count/metrics.total) * 100;

                                return(
                                    <Box key={stage}>
                                        <Stack direction="row" sx={{ justifyContent:"space-between"}}>
                                            <Typography variant="body2">
                                                {workOrderStageLabel[stage]}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {count}
                                            </Typography>
                                        </Stack>

                                        <LinearProgress variant="determinate" value={percentage}/>

                                    </Box>
                                );
                            })}
                        </Stack>
                    </Paper>

                    <Paper variant="outlined" sx={{ p: 3 }}>
                        <Typography component="h2" variant="h6">
                            High Priority or Blocked
                        </Typography>
                        {attentionWorkOrders.length === 0 ? (
                            <Typography color="text.secondary">
                                No high priority or blocked orders
                            </Typography>
                        ) : (
                            <Stack divider={<Divider flexItem />}>
                                {attentionWorkOrders.map((workOrder) => (
                                    <Box component={Link} to={`/work-orders/${workOrder.id}`} sx={{ textDecoration: "none", py: 2, px: 1, borderRadius: 1, transition: "background-color 0.2s", "&:hover": { backgroundColor: "action.hover", }, }}>
                                        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "flex-start", }}>
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography variant="subtitle2"
                                                    sx={{ color: "text.primary", textDecoration: "none", "&hover": {textDecoration: "underline",}, }}>
                                                    {workOrder.id}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "text.secondary", textDecoration: "none", "&hover": {textDecoration: "underline",}, }}>
                                                    {workOrder.partName}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: "text.secondary", textDecoration: "none", "&hover": {textDecoration: "underline",}, }}>
                                                    {workOrder.dueDate}
                                                </Typography>
                                            </Box>
                                            <Stack spacing={0.75} sx={{ alignItems: "flex-end", flexShrink: 0, }}>
                                                <Chip label={workOrderStageLabel[workOrder.stage]} size="small" variant="outlined" sx={{ textTransform: "lowercase" }}/>
                                                <Chip label={workOrderPriorityLabel[workOrder.priority]} size="small" variant="outlined" sx={{ textTransform: "lowercase" }}/>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </Paper>
                </Box>
            </Stack>
        </Container>
    )
}

