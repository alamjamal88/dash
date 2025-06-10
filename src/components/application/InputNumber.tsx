import styled from '@emotion/styled';
import { Link, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

export const CustomInputOnlyNumber = styled(({ ...props }) => (
    <TextField
        {...props}
        type="number"
        onKeyDown={(evt) => ['e', 'E', '+', '-', '.', 'ArrowUp', 'ArrowDown'].includes(evt.key) && evt.preventDefault()}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
            (e.target.value = e.target.value.toString().slice(0, props.maxLength))
        }
    />
))(({ theme }) => ({
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        display: 'none'
    },
    '& input[type=number]': {
        MozAppearance: 'textfield'
    }
}));
