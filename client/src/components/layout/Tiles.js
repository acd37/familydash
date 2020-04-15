import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Todo from '../pages/Todo';
import Dates from '../dates/Dates';
import MealContainer from '../recipes/MealContainer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

const Tiles = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item md={4} sm={12}>
                    <Card>
                        <div
                            style={{
                                padding: 15,
                                marginTop: -20,
                                borderRadius: 3,
                                background: 'linear-gradient(60deg,#1dd1a1, #10ac84)',
                                boxShadow:
                                    '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)',
                                height: 150,
                                margin: '0 15px',
                                transform: 'translateY(-20px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff'
                            }}>
                            <Typography variant='h5' component='h2'>
                                Tasks
                            </Typography>
                        </div>
                        <CardContent>
                            <Todo />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} sm={12}>
                    <Card className={classes.root}>
                        <div
                            style={{
                                padding: 15,
                                marginTop: -20,
                                borderRadius: 3,
                                background: 'linear-gradient(60deg, #feca57, #ff9f43)',
                                boxShadow:
                                    '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)',
                                height: 150,
                                margin: '0 15px',
                                transform: 'translateY(-20px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff'
                            }}>
                            <Typography variant='h5' component='h2'>
                                Weekly Meals
                            </Typography>
                        </div>
                        <CardContent>
                            <MealContainer />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} sm={12}>
                    <Card className={classes.root}>
                        <div
                            style={{
                                padding: 15,
                                marginTop: -20,
                                borderRadius: 3,
                                background: 'linear-gradient(60deg, #ff6b6b, #ee5253)',
                                boxShadow:
                                    '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)',
                                height: 150,
                                margin: '0 15px',
                                transform: 'translateY(-20px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff'
                            }}>
                            <Typography variant='h5' component='h2'>
                                Important Dates
                            </Typography>
                        </div>
                        <CardContent>
                            <Dates />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Tiles;
