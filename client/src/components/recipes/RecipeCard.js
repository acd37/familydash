import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRecipe, updateRecipe } from '../../actions/recipeActions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        width: 300,
        maxWidth: '90%',
        marginRight: 30,
        marginBottom: 30
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    activeFavorite: {
        color: 'red'
    }
}));

const RecipeCard = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipe } = props;

    const handleDeleteRecipe = recipe => {
        const confirmDelete = window.confirm(
            "Are you sure you'd like to delete this recipe? This action cannot be undone."
        );

        if (confirmDelete) {
            dispatch(deleteRecipe(recipe.id, recipe.familyId));
        }
    };

    const handleMealPlan = recipe => {
        const newStatus = !recipe.calendar;

        const updatedRecipe = { ...recipe, calendar: newStatus };
        updatedRecipe.ingredients = JSON.parse(updatedRecipe.ingredients);
        updatedRecipe.instructions = JSON.parse(updatedRecipe.instructions);

        dispatch(updateRecipe(updatedRecipe, recipe.familyId));
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                style={{ cursor: 'pointer' }}
                subheader={`Cook time: ${(recipe.cookTime / 60).toFixed(1)} hrs.`}
                title={recipe.name}
                onClick={() => history.push(`/dashboard/recipes/recipe/${recipe.id}`)}
            />
            <CardMedia
                className={classes.media}
                image='https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                title='Paella dish'
            />
            <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'>
                    <FavoriteIcon
                        className={recipe.calendar && classes.activeFavorite}
                        onClick={() => handleMealPlan(recipe)}
                    />
                </IconButton>
                <IconButton aria-label='share'>
                    <DeleteIcon onClick={() => handleDeleteRecipe(recipe)} />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default RecipeCard;
