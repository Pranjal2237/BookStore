import { NoEncryption } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import React from 'react'

const SliderCard = ({image,Product,price}) => {
  return (
    <div className='sliderCard-main-div'>
        <div className='sliderCard-img-div'>
            <img src={image} alt="" />
        </div>
        <div className='sliderCard-product'>
            <p id='sliderCard-product-name'>{Product}</p>
            <div style={{display:'flex',justifyContent:"center",gap:"0.5em",margin:"0.7em"}}>
            <Box sx={{border:"2px solid #05E6B7",width:"7%"}}></Box>
            <Box sx={{border:"2px solid #F701A8",width:"7%"}}></Box>
            <Box sx={{border:"2px solid #FFEAC1",width:"7%"}}></Box>
            </div>
            <p>Code-Y593201</p>
            <p>{price} Rs.</p>
        </div>
    </div>
  )
}

export default SliderCard