/***
 * ATTENTION SI LA NEW WINDOW S'OUVRE DE FACON ASYNCHRONE 
 * (PAS DIRECTEMENT SUITE A UNE ACTION UTILISATEUR)
 * CHROME LA CONSIDERE COMME UN POPUP ET LA BLOQUE
 */

import { Component } from "react";
import ReactDOM from "react-dom";


const copyRulesTo = (cssRules, doc) => {
    const newStyleEl = doc.createElement('style');
    cssRules.forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(doc.createTextNode(cssRule.cssText));
    });

    doc.head.appendChild(newStyleEl);

}

const getCssRules = (doc) => {
    const allRules = [];

    Array.from(doc.styleSheets).map( (sheet) => {
        try{
            if(sheet.cssRules){
                const rules = Array.from(sheet.cssRules);
                rules.map(rule => {
                    allRules.push(rule);
                    return null;
                });
            }
        }
        catch(e) {
            console.log("ERROR");
            console.log(sheet)
        }
        return null;
        
    });
    return allRules;
}

const copyStylesheet = (sourceDoc, targetDoc) => {

    copyRulesTo(
        getCssRules(sourceDoc),
        targetDoc
    );
}


class NewWindow extends Component {
    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div');
        this.externalWindow = null;

        this.state = {
            open: false
        }

    }

    
    render() {
        return ReactDOM.createPortal(
            this.props.children(this.externalWindow), 
            this.containerEl
        )
        
    }
  
    componentDidMount() {
        this.openWindow();
        
    }

    componentDidUpdate(prevProps) {
        if(this.externalWindow !== null){
            copyStylesheet(
                document, 
                this.externalWindow.document
            );
        }
        
    }
  
    componentWillUnmount() {
        this.externalWindow && this.externalWindow.close();
    }


    openWindow = () => {
        const { closeNewWindow } = this.props;
        
        this.externalWindow = window.open(
            '', 
            '', 
            'width=600,height=400,left=400,top=400'
        );

        if(this.externalWindow !== null){
            copyStylesheet(document, this.externalWindow.document);

            this.externalWindow.document.body.appendChild(this.containerEl);
            this.externalWindow.addEventListener('beforeunload', (event) => {
                event.preventDefault();
                closeNewWindow();   
            });

            this.setState({open: true})
        }
    }
  }


  export default NewWindow;