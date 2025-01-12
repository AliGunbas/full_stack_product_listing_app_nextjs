"use client"
import Image from "next/image";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Avatar,
  Rating,
  Stack,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { formatNumber } from "./api/product/helper";
import CircleIcon from '@mui/icons-material/Circle';
import { ProductBox } from "./components/ProductBox";
import { FilterForm } from "./components/filterForm";



export default function Home() {


  const [products, setProducts] = useState([])
  const searchProduct = async (name?:string, minPrice?:number, maxPrice?:number, maxStar?:number, minStar?:number) => {
    let ress = await axios
      .get(`http://localhost:3001/api/product?name=${name}&popularityMin=${minStar}&popularityMax=${maxStar}&priceMin=${minPrice}&priceMax=${maxPrice}`)
    console.log("ress", ress)
    if (ress.status === 200) {
      setProducts(ress.data)
    } else {
      setProducts([])
    }


  }
  useEffect(() => {
    searchProduct("", 0, 0, 0, 0)
  }, [])

  const [name, setName] = useState("")
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [maxStar, setMaxStar] = useState(0)
  const [minStar, setMinStar] = useState(0)




  return (
    <Box sx={{ width: "90%", margin: "auto", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: 1 }}>
      <Typography
        variant="h4"

        sx={{
          fontFamily: "Avenir, sans-serif",
          fontWeight: 400,
          width: "100%",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Product List
      </Typography>
      <FilterForm
        name={name}
        setName={setName}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        maxStar={maxStar}
        setMaxStar={setMaxStar}
        minStar={minStar}
        setMinStar={setMinStar} />
      <Button onClick={() => searchProduct(name, minPrice, maxPrice, maxStar, minStar)} variant="outlined">Search</Button>

      <Stack direction="row" spacing={2} sx={{ overflowX: "auto", maxWidth: "100%" }}>
        {products.map((product, index) => {
          return <ProductBox key={index} product={product} index={index} />
        })}
      </Stack>
    </Box>
  );
}



