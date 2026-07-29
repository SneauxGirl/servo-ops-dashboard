import { Box, Typography} from "@mui/material";

interface DetailItemProps {
    label: string;
    value: string | number;
}

export function DetailItem({ label, value, 
    }: DetailItemProps) {
        return (
            <Box>
                <Typography component="dt" color="text.secondary" variant="caption">
                    {label}
                </Typography>
                <Typography component="dd" sx={{ m: 0 }}>
                    {value}
                </Typography>
            </Box>
        );
    };