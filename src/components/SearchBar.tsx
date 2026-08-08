import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
    return (
        <TextField 
            fullWidth 
            label="Search Work Orders" 
            placeholder="Search by part name, part number or ID"
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            slotProps={{
                input: { 
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search aria-hidden={true} />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}

