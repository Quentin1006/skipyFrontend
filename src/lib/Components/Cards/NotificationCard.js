import React, { memo } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { 
    Card, 
    CardActions, 
    CardMedia, 
    CardContent, 
    IconButton 
} from '@material-ui/core';

import { Delete as DeleteIcon } from "@material-ui/icons";

import { timeDistance } from "../../../utils/date";


const styles = {
    container: {
        width: "400px",
        display: "flex",
        height: "64px",
        padding: "8px 0",
        paddingLeft: "8px",
        borderBottom: "1px solid #eee"
    },
    avatar: {
        flex: "0 0 64px",
        borderRadius: "50%",
        overflow: "hidden"

    },
    content: {
        flex: "1 1 auto",
        paddingBottom: "8px",
        '& > div': {
            width: "224px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden"
        }    
    },
    actions: {
        flex: "0 0 56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "0"
    },
    btn: {
        padding: "6px"
    },
    timeago: {
        color: "lightgrey",
        paddingTop: "10px"
    }
}
const NotificationCard = ({id, date, from, content, seen, toggleSeen, onDelete, classes}) => {
    const handleDelete = (e) => {
        e.preventDefault();

        onDelete(id);
    }

    const handletoggleSeen = (e) => {
        e.preventDefault();
        toggleSeen();
    }

    return (
        <Card square elevation={0} className={classes.container}>
            <CardMedia
                className={classes.avatar}
                image={from.profilpic}
                title="avatar notifier"
            />
            <CardContent className={classes.content}>
                <div>{content}</div>
                <div className={classes.timeago}>
                    <small>{timeDistance(date)}</small>
                </div>
                
            </CardContent>
            <CardActions className={classes.actions}>
                <IconButton onClick={handleDelete} classes={{root: classes.btn }}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={handletoggleSeen} classes={{root: classes.btn }}>
                    <span 
                        style={{
                            width:"28px"
                        }}
                        dangerouslySetInnerHTML={{
                            __html: seen ? "&#9702;" :"&bull;"
                        }}
                    />
                </IconButton>
            </CardActions>
        </Card>
    )
}


NotificationCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    from: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.any,
    seen: PropTypes.bool,
    onDelete: PropTypes.func,
    toggleSeen: PropTypes.func
} 

export default memo(withStyles(styles)(NotificationCard));