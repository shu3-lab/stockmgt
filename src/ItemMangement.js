import React from 'react'
import { css } from 'glamor'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Container from './Container'
import Button from './Button'
import Amplify, { API, graphqlOperation } from "@aws-amplify/api";

import { createItem } from "./graphql/mutations";

function ItemManagement (){
    const [value, setValue] = React.useState(10);
    const [message, setMessage] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    const handleSliderChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleInputChange = (event) => {
      setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
  
    const handleBlur = () => {
      if (value < 0) {
        setValue(0);
      } else if (value > 10) {
        setValue(10);
      }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const registerItem = async () => {
        //validation
        if(!name){
            createMessage(false)
            return
        }
        //create input model
        const item = {
            name: name,
            threthold: value,
            description: description
        }
        console.log('Input item : ' + item)
        try {
            let res = await API.graphql(graphqlOperation(createItem, {input : item}))
            console.log(res)
            createMessage(true)
        } catch(err){
            console.log(err)
            createMessage(false)
        }
    };

    const createMessage = (succeed) => {
        if(succeed){
            setMessage('Registration is succeeded.')
        } else {
            setMessage('Registration is failed.')
        }
    };
    
    return (
        <div {...css(styles.root)}>
            <Container>
                <FormControl disabled>
                    <InputBase id="component-disabled" value={message} InputLabelProps={{ 'aria-label': 'naked' }} />
                </FormControl>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <TextField
                        id="item-name"
                        label="Name"
                        style={{ margin: 8 }}
                        placeholder="Entry your item name."
                        helperText="Name of your Item"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        onChange={handleNameChange}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography id="threshold" gutterBottom>  
                            Threshold
                        </Typography>
                        <Grid container spacing={3}>
                        <Grid item xs>
                        <Slider
                            defaultValue={0}
                            value={typeof value === 'number' ? value : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                        />
                        </Grid>
                        <Grid item>
                        <Input
                            {...css(styles.input)}
                            value={value}
                            margin="dense"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                            step: 1,
                            min: 0,
                            max: 10,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                            }}
                        />
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <TextField
                    id="description"
                    label="Description"
                    style={{ margin: 8 }}
                    placeholder="desciption."
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    variant="filled"
                    onChange={handleDescriptionChange}
                />
                <Button title='Register' onClick={registerItem} />
            </Container>
        </div>
    )
        
}


const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 15
    },
    input: {
        width: 42
    }
}

export default ItemManagement
