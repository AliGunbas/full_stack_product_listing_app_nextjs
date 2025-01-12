import { FormControl, InputAdornment, InputLabel, OutlinedInput, Rating, Stack, TextField, Typography } from "@mui/material"

export const FilterForm = (props: { name: string, setName: (val: string) => void, minPrice: number, setMinPrice: (val: number) => void, maxPrice: number, setMaxPrice: (val: number) => void, maxStar: number, setMaxStar: (val: number) => void, minStar: number, setMinStar: (val: number) => void }) => {
    const { name, setName, minPrice, setMinPrice, maxPrice, setMaxPrice, maxStar, setMaxStar, minStar, setMinStar } = props;

    return (
        <Stack direction="row" spacing={2} sx={{ width: "100%", overflow: "visible" }}>
            <TextField onChange={(e) => setName(e.target.value)} sx={{ width: "50%" }} id="outlined-basic" label="Name" variant="outlined" />
            <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Minimum Price</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    type="number"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Minimum Price"
                />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Maximum Price</InputLabel>
                <OutlinedInput
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    id="outlined-adornment-amount"
                    type="number"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Maximum Price"
                />
            </FormControl>
            <Stack direction={"column"} justifyContent={"space-around"}>
                <Stack direction={"row"} >
                    <Typography fontSize={12} component="legend">Min</Typography>
                    <Rating
                        size="small"
                        name="simple-controlled"
                        value={minStar}
                        onChange={(_, newValue) => {
                            if (newValue !== null) {
                                setMinStar(newValue)
                            }
                        }}
                    />
                </Stack>
                <Stack direction={"row"}>
                    <Typography fontSize={12} component="legend">Max</Typography>
                    <Rating
                        size="small"
                        name="simple-controlled"
                        value={maxStar}
                        onChange={(_, newValue) => {
                            if (newValue !== null) {
                                setMaxStar(newValue)
                            }
                        }}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}