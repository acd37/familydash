import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Todo from '../pages/Todo';
import Dates from '../dates/Dates';
import MealContainer from '../recipes/MealContainer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: 325,
        marginBottom: 30,
        marginRight: 30,
        maxWidth: '90%',
        '@media (max-width: 992px)': {
            marginRight: 0,
            width: '90%'
        }
    },
    grid: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        '@media (max-width: 992px)': {
            justifyContent: 'center'
        }
    }
});

const Tiles = () => {
    const classes = useStyles();

    return (
        <div className={classes.grid}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant='h5' component='h2'>
                        Tasks
                    </Typography>

                    <Todo />
                </CardContent>
            </Card>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant='h5' component='h2'>
                        Weekly Meals
                    </Typography>

                    <MealContainer />
                </CardContent>
            </Card>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant='h5' component='h2'>
                        Important Dates
                    </Typography>
                    <Dates />
                </CardContent>
            </Card>
        </div>
    );
};

export default Tiles;
