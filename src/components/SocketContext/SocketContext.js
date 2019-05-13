import React from "react";
import io from "socket.io-client";

import server from "../../config/server";


const SocketSearchContext = React.createContext();


// searchSocket.on("connSearch", (id) => {
//     console.log("id of socket", id);
// });


// searchSocket.on('global search response', (matches) => {
//     context = {
//         ...context,
//         matches
//     }
// })


// const SocketSearchProvider = ({children}) => (
//     <SocketSearchContext.Provider value={context}>
//         {children}
//     </SocketSearchContext.Provider>
// );


class SocketSearchProvider extends React.Component {
    state={
        searchSocket: null,
        matches: [],

    }

    componentDidMount(){
        const sock = io.connect(`${server.url}/search`);

        sock.on("global search response", (matches, fshipStatus) => {
            console.log(fshipStatus);
            this.setState({matches})
        })

        this.setState({searchSocket: sock});

        
    }


    searchUsers = (text) => {
        this.state.searchSocket.emit("global search", text);
    }


    render(){
        const { children } = this.props;
        const context = {
            ...this.state,
            search: this.searchUsers
        }
        
        return (
            <SocketSearchContext.Provider value={context}>
            {children}
            </SocketSearchContext.Provider>
        )
    }
}


const withSocketSearchConsumer = () => ComponentToWrap => {
    class C extends React.Component {
        
        render(){
            return (
                <SocketSearchContext.Consumer>
                    {contextProps => (
                        <ComponentToWrap 
                            {...contextProps} 
                            {...this.props}
                        />
                    )}
                </SocketSearchContext.Consumer>
            )

        }
    }
    return C;
};



export { SocketSearchProvider, withSocketSearchConsumer };