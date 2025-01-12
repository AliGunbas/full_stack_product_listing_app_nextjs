import { Avatar, Box, Card, CardContent, CardMedia, IconButton, Rating, Stack, Typography } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { formatNumber } from "../api/product/helper";
import { useEffect, useState } from "react";
import { Product } from "../types";

export const ProductBox = (props: { product: Product, index: number }) => {
    const { product, index } = props;


    const [color, setColor] = useState(0)
    const [img, setImg] = useState<string>("")

    useEffect(() => {
        if (product.product.images) {
            const imagesVals: Array<string> = Object.values(product.product.images)
            setImg(imagesVals[color])
        }
    }, [product, color])

    return <Card
        sx={{
            maxWidth: 345,
            minWidth: 300,
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "16px",
        }}
        key={index}
    >
        <CardMedia
            component="img"
            alt={product.product.name}
            height="200"
            image={img}
            sx={{ borderRadius: "16px 16px 0 0" }}
        />
        <CardContent>
            <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
            >
                {product.product.name}
            </Typography>
            <Stack direction="row" spacing={.5}>
                <IconButton onClick={() => setColor(0)} sx={{ border: color == 0 ? "1.5px solid black" : "", padding: 0 }} aria-label="fingerprint">
                    <CircleIcon sx={{ color: "#EDD7A3" }} />
                </IconButton>
                <IconButton onClick={() => setColor(1)} sx={{ border: color == 1 ? "1.5px solid black" : "", padding: 0 }} aria-label="fingerprint">
                    <CircleIcon sx={{ color: "#E6A6B0" }} />
                </IconButton>
                <IconButton onClick={() => setColor(2)} sx={{ border: color == 2 ? "1.5px solid black" : "", padding: 0 }} aria-label="fingerprint">
                    <CircleIcon sx={{ color: "#D3D3D3" }} />
                </IconButton>
            </Stack>
            <Typography variant="body1" color="text.secondary">
                ${formatNumber(product.product.price)}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                }}
            >
                <Typography fontFamily={"avenir_book"} variant="body2">{color === 0 ? "Yellow Gold" : color === 1 ? "Rose Gold" : "White Gold"}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                }}
            >
                <Rating
                    name={`rating-${index}`}
                    value={product.product.popularityScore * 5}
                    precision={0.5}
                    readOnly
                    size="small"
                />
                <Typography
                    variant="body2"
                    sx={{ marginLeft: "8px" }}
                >{`${((product.product.popularityScore * 5).toFixed(2))}/5`}</Typography>
            </Box>
        </CardContent>
    </Card>
} 