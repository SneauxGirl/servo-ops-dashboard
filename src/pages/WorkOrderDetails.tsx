import { Box, Button, Chip, Container, Divider, Stack, Typography} from '@mui/material'
import { DetailItem } from '../components/DetailItem';
import { Link, useParams } from 'react-router'
import { useAppSelector } from '../app/hooks'

export function WorkOrderDetails() {
    const { id } = useParams<{ id:string }>();

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
                        <Button component={Link} to="./work-orders">
                            Back to work orders
                        </Button>
                    </Box>
                </Stack>
            </Container>
        );
    }

    const remainingQuantity = workOrder.quantity - workOrder.completedQuantity;

    return(
        <Container component="main" maxWidth="md" sx={{ py:4 }}>
            <Stack spacing={4}>
                <Box>
                    <Button component= {Link} to="/work-orders">
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
                        <Chip label={ workOrder.stage } sx={{ textTransform: "lowercase"}} />
                        <Chip label={ workOrder.priority } sx={{ textTransform: "lowercase"}} />
                    </Stack>
                </Stack>

                <Divider />

                <Box component= "dl" sx={{ display: "grid", 
                    gridTemplateColumns: {xs: "1fr", sm: "repeat(2, minmax(0, 1fr))"}, 
                    gap: 3, m: 0, }}>

                    <DetailItem label="Customer Program" value={workOrder.customerProgram} />

                    <DetailItem label="Material" value={workOrder.material}/>

                    <DetailItem label="Machine" value={workOrder.machine}/>

                    <DetailItem label="Due Date" value={workOrder.dueDate}/>

                    <DetailItem label="Total Quantity" value={workOrder.quantity.toString()}/>

                    <DetailItem label="Completed Quantity" value={workOrder.completedQuantity.toString()}/>

                    <DetailItem label="Remaining Quantity" value={remainingQuantity.toString()}/>

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
    )
}
