import { useState } from 'react';
import { Box, Button, Chip, Container, Divider, Stack, Typography} from '@mui/material'
import { DetailItem } from '../components/DetailItem';
import { Link, useParams } from 'react-router'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { WorkOrderStageDialog } from '../features/workOrders/components/WorkOrderStageDialog';
import { updateWorkOrderStage } from '../features/workOrders/workOrders.slice';

import type { WorkOrderStage } from '../features/workOrders/workOrders.types';

export function WorkOrderDetails() {
    const { id } = useParams<{ id:string }>();
    const dispatch = useAppDispatch();

    const [stageDialogOpen, setStageDialogOpen] = useState(false);

    const workOrder = useAppSelector ((state) => 
        state.workOrders.items.find((item) => item.id === id,
        ),
    );

    if (!workOrder) {
        return (
            <Container component="main" maxWidth= "md" sx= {{ py:4 }} >
                <Stack spacing={3}>
                    <Typography component= "h1" variant="h4">
                        Work order not found
                    </Typography>
                    <Typography color="text.secondary">
                        No work order exists with the ID {id}.
                    </Typography>

                    <Box>
                        <Button component={Link} to="/work-orders">
                            Back to work orders
                        </Button>
                    </Box>
                </Stack>
            </Container>
        );
    }

    const remainingQuantity = workOrder.quantity - workOrder.completedQuantity;

    const workOrderId = workOrder.id;

    function handleStageSave(stage: WorkOrderStage) {
        dispatch(updateWorkOrderStage({ id: workOrderId, stage })),

        setStageDialogOpen(false);
    }

    return(
        <>
            <Container component="main" maxWidth="md" sx={{ py:4 }}>
                <Stack spacing={4}>
                    <Box>
                        <Button component={Link} to="/work-orders">
                            Back to work orders
                        </Button>
                    </Box>

                    <Stack spacing= {2}>
                        <Box>
                            <Typography color= "text.secondary" variant="overline">
                                {workOrder.id}
                            </Typography>
                            <Typography component="h1" variant="h4">
                                {workOrder.partName}
                            </Typography>
                            <Typography color='text.secondary' variant='h6'>
                                {workOrder.partNumber}
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={1} useFlexGap sx={{flexWrap: "wrap"}}>
                            <Chip label={ workOrder.priority } sx={{ textTransform: "lowercase"}} />
                            <Chip label={ workOrder.stage } sx={{ textTransform: "lowercase"}} />
                        </Stack>
                            <Button size="small" variant='outlined'
                            sx={{ alignSelf: "flex-start"}}
                            onClick={() => {setStageDialogOpen(true)}}
                                >Change stage
                            </Button>
                    </Stack>

                    <Divider />

                    <Box component= "dl" sx={{ display: "grid", 
                        gridTemplateColumns: {xs: "1fr", sm: "repeat(2, minmax(0, 1fr))"}, 
                        gap: 3, m: 0, }}>

                        <DetailItem label="Customer Program" value={workOrder.customerProgram} />

                        <DetailItem label="Material" value={workOrder.material}/>

                        <DetailItem label="Machine" value={workOrder.machine}/>

                        <DetailItem label="Due Date" value={workOrder.dueDate}/>

                        <DetailItem label="Total Quantity" value={workOrder.quantity}/>

                        <DetailItem label="Completed Quantity" value={workOrder.completedQuantity}/>

                        <DetailItem label="Remaining Quantity" value={remainingQuantity}/>

                        <DetailItem label="Rejected Quantity" value={workOrder.rejectedQuantity}/>
                    </Box>

                    {workOrder.blockedReason &&(
                        <>
                            <Divider />

                            <Box>
                                <Typography component="h2" variant="h6" gutterBottom>
                                    Blocked Reason
                                </Typography>

                                <Typography color='error.main'>
                                    {workOrder.blockedReason}
                                </Typography>
                            </Box>
                        </>
                    )}
                </Stack>
            </Container>

            <WorkOrderStageDialog currentStage={workOrder.stage} open={stageDialogOpen} onClose={() => 
                {setStageDialogOpen(false);
                }}
                onSave={handleStageSave}
            />
        </>
    )
}
