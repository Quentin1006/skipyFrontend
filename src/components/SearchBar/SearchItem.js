import React, { useMemo }  from "react";
import PropTypes from "prop-types"

import { Avatar } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { highlightMatch } from "../../utils"


const styles = {
    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        color: "inherit"
    },
    avatar: {
        marginRight: "15px",
        flex: "0 0 auto"
    },

    actionBtns: {
        flex: "0 0 auto"
    },

    fieldValue: {
        flex: "1 1 auto"
    }
}

const SearchItem = React.memo(({value, query, suggestion, children, classes}) => {

    const parts = useMemo(() => highlightMatch(value, query), [value, query]);
    
    return (
        <div className={classes.container}>
            <div className={classes.avatar}>
                <Avatar alt={suggestion.username} src={suggestion.profilepic}/>
            </div>
            <div className={classes.fieldValue}>
                {parts.map((part, index) => {
                    const txt = part.text.replace(" ", "&nbsp;") // to preserve whitespaces
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}
                            dangerouslySetInnerHTML={{
                                __html: txt
                            }}
                        />
                    ) : (
                        <strong 
                            key={String(index)} 
                            style={{ fontWeight: 300 }}
                            dangerouslySetInnerHTML={{
                                __html: txt
                            }}
                        />
                    );
                })}
            </div>
            <div className={classes.actionBtns}>
                {children}
            </div>
        </div>
    )
   
});


SearchItem.propTypes = {
    suggestion: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    children: PropTypes.object,
    classes: PropTypes.object
}

export default withStyles(styles)(SearchItem);