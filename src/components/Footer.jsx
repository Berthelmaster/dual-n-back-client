import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    root: {
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        paddingBottom: 10,
        width: '100%'
    },
  });



export default function Footer() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
        <h4>The footer</h4>
    </BottomNavigation>
    )
}
