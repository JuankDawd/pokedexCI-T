import { CircularProgress, Grid, OutlinedInput } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import './Component.scss'
import { Search } from '@mui/icons-material'
interface SearchInputProps {
    onChange: (_n) => void
}

const OutlinedInputStyled = styled(OutlinedInput)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        padding: theme.spacing(0.75, 1, 0.75, 1),
    },
    borderRadius: 4,
}))

let timmer = 0

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
    const inputRef = useRef(null)
    const [search, setSearch] = useState('')
    const [adornment, setAdornment] = useState(<Search fontSize="large" color="disabled" />)

    useEffect(() => {
        setAdornment(<CircularProgress size={16} />)

        timmer = setTimeout(() => {
            setAdornment(<Search fontSize="large" color="disabled" />)
            onChange(search)
        }, 500)
        return () => clearTimeout(timmer)
    }, [search])

    const handleChange = (event): void => setSearch(event.target.value)

    return (
        <Grid container justifyContent="flex-start" style={{ width: 'auto' }}>
            <Grid
                item
                style={{
                    display: 'block',
                    flexGrow: 1,
                }}
            >
                <OutlinedInputStyled
                    ref={inputRef}
                    style={{
                        transition: 'width 250ms',
                        width: '100%',
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: 24,
                    }}
                    margin="dense"
                    onChange={handleChange}
                    startAdornment={adornment}
                    placeholder="Buscar"
                />
            </Grid>
        </Grid>
    )
}

export default SearchInput
