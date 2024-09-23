import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardContent } from '@material-ui';

//  create a react pricing page for my app using material ui and same theme as the home page
const useStyles = makeStyles((theme) => ({
    pricingContainer: {
        padding: theme.spacing(4),
    },
    card: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: theme.palette.background.default,
    },
}));

const PricingPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.pricingContainer}>
            <Typography variant="h4" align="center" gutterBottom>
                Pricing
            </Typography>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Basic Plan
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                $9.99/month
                            </Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Pro Plan
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                $19.99/month
                            </Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Premium Plan
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                $29.99/month
                            </Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default PricingPage;